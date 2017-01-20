var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var _ = require('underscore');
var movie_models = require('./z_mongo_models/movie');
// 静态资源请求路径
var path = require('path');
var bodyParser= require('body-parser');

//设置端口
//process是个全局变量，让他获取环境中的变量
var port = process.env.PORT || 2800;    //若无参数地启动默认端口是3000. 可以"PORT=4000 node app.js"->就在4000端口启动
var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/movie');
mongoose.connection.on('connected', function () {
  console.log('Connection success!');
});

//设置views文件夹的根目录
app.set('views','./views/pages');
//设置默认的模板引擎
app.set('view engine', 'jade');

// 静态资源请求路径
app.use(express.static(path.join(__dirname, 'public/')));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.locals.moment = require('moment');

//监听这个端口
app.listen(port);
console.log("zack's movieSite built on port" + port);


//1. index page
app.get('/', function(req, res) {
    movie_models.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render("index", {title: "Zack's_movie_Site", movies: movies});
    });
});


//2. detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id;
    movie_models.findById(id, function (err, movie) {
        if (err) {
          console.log(err);
        }
        res.render("detail", {title: "Movie: " + movie.title, movie: movie});
    });
});

//3. admin page：后台空白等待录入页
app.get('/admin/movie', function(req, res) {
    res.render("admin", {
        title: "imooc 后台录入液",
        movie: {
            title: "",
            doctor: "",
            country: "",
            year: "",
            poster: "",
            flash: "",
            summary: "",
            language: ""
        }
    });
})

//4. admin update movie： 更新某个已经写好的电影
app.get("/admin/update/:id", function(req, res){
    var id = req.params.id;
    if (id) {
        movie_models.findById(id, function (err, movie) {
            res.render("admin", { title: "imooc后台更新页面", movie: movie});
        })
    }
});

//5. list page：所有电影
app.get('/admin/list', function(req, res) {
    movie_models.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render("list", {title: "Zack'smovie_Site", movies: movies});
    });
})


//逻辑
//admin post movie
app.post("/admin/movie/new", function (req, res) {
    var movieObj = req.body.movie;
    var id = movieObj._id;
    var movie;
    if (id !== 'undefined') {
        movie_models.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            movie = _.extend(movie, movieObj);         //??
            movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/detail/' + movie._id);
            });
        });
    } else {
        movie = new movie_models({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/detail/' + movie._id);
        });
    }
});

//delete
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        movie_models.remove({_id: id}, function (err, movie) {  //一个问题：问什么这边都要传入个movie？
            if (err) {
                console.log(err);
            } else {
                res.json({
                    success: 1
                });
            }
        });
    }
});
