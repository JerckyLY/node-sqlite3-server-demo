const express = require('express')

// 创建 express 应用
const app = express()
//post 请求

app.use(express.urlencoded({extended:false}));//添加通用的JSON和URL编码的解析器作为顶级中间件，该中间件将解析所有传入请求的主体。
app.use(express.json());

const db  = require('./db.js')

// 监听 / 路径的 get 请求
app.get('/all', function(req, res) {
    db.getAll(res)
})

//
app.get('/one/:id',function (req,res) {
    db.getById(req,res)
})

app.post('/login',function (req,res) {
    db.login(req,res)
})

app.post('/add',function (req,res) {
    db.addUser(req,res)
})

app.post('/update',function (req,res) {
    db.updateUser(req,res)
})

app.delete('/delete',function (req,res) {
    db.delUser(req,res)
})

// 使 express 监听 5002 端口号发起的 http 请求
const server = app.listen(5002, function() {
    console.log("服务器已启动，监听5002端口");
})
