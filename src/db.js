// const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const { v1 : uuid} =  require('uuid');

// sqlites数据库地址
let sqliteDbPath = "D:\\01_Software\\Program File\\sqlite3\\DB\\test.db"
// 打开sqlites数据库
const db = new sqlite3.Database(sqliteDbPath)


//查询全部数据
const getAll = function(res){
    db.all(`select * from user order by create_time desc  `,function (err,row) {
        if(err){
            res.send({
                msg:'查询失败',
                ret:false
            })
        }

        const data = {
                code:200,
                data:row,
                ret:true,
                msg:'查询成功'
            }

        // console.log(data)
        res.send(data)
    })
}

//根据id 查询单个数据
const getById = function(req,res){

    const param = req.query || req.params;
    const id = param.id
    db.each(`select * from user where id=?`,id,function (err,row) {
        if(err){
            res.send({
                msg:'查询失败',
                ret:false
            })
        }

        const data = {
            code:200,
            data:row,
            ret:true,
            msg:'查询成功'
        }
        console.log(data)

        res.send(data)
    })
}


//登录接口
const login = function(req,res){
    const param =  req.body;
    const name = param.name;
    const password = param.password
    console.log(name);
    console.log(password);
    db.all(`select * from user`,function (err,row) {
        if(err){
            res.send({
                msg:'登录失败',
                ret:false
            })
        }

        // console.log(row)
        let isLogin = false
        let data = {}
        for(let i = 0;i<row.length;i++){
            if(row[i].name === name && row[i].password === password){
                isLogin = true
                data.data = row[i]
            }
        }

        if(isLogin){
            data.code = 200
            data.msg = '登录成功'
            data.ret = true
        }
        else{
            data.code = 200
            data.msg = '登录失败，账号或密码错误'
            data.ret = false
        }

        res.send(data)
})
}


//新增接口
const addUser = function(req,res){
    const param =  req.body;
    const name = param.name;
    const password = param.password;

    const uid = uuid()

    const add_sql = `insert into user (id , name ,password ) values(?,?,?)`
    db.run(add_sql,[uid,name,password],function (err) {
        if(err){
            res.send({
                msg:'插入失败',
                ret:false
            })
        }

        res.send({
            code:200,
            msg:'插入成功',
            ret:true
        })
    })

}

//更新
const updateUser = function(req,res){
    const param =  req.body;
    const password = param.password;
    const name = param.name;
    const id = param.id;

    const update_sql = `update user set name=?, password = ? where id = ?`;
    db.run(update_sql,[name,password,id],function (err) {
        if(err){
            res.send({
                msg:'更新失败',
                ret:false
            })
        }

        const  data = {
            code:200,
            ret:true,
            msg:'更新成功'
        } ;

        res.send(data)

    })
}


//删除
const delUser = function(req,res){
    const param = req.query || req.params ;
    console.log(param);
    const id = param.id;
    console.log(id)
    const del_sql =    `delete from user where id = ?`;
    db.run(del_sql,[id],function (err) {
        if(err){
            res.send({
                msg:'删除失败',
                ret:false
            })
        }

        res.send({
            code:200,
            ret:true,
            msg:'删除成功'
        })
    })
}

module.exports = {
    getAll,
    getById,
    login,
    addUser,
    updateUser,
    delUser
}
