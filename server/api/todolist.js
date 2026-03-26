const express = require('express')
const {getDB} = require('../db/db_todolist.js');
const ObjectId = require('mongodb').ObjectId;
const todolist = express.Router(); //페이지 분리

//조회(데이터가져오기)
todolist.get('/', async (req, res) => { //todolist.get(); 클라이언트 요청시 처리할 함수
    const sort = req.query.sort;

    let filter;

    switch(sort){
      case 'false':filter={isdone:false};break;
      case 'true':filter={isdone:true};break;
      default:filter={}
    }

    //실데이터가 들어있는 컬렉션 조회
    const data = await getDB().collection('todos').find(filter).toArray();  

    res.send(data);
})

//저장(api서버)
todolist.post('/', async (req, res) => { 
    try{
      const result = await getDB().collection('todos').insertOne(req.body);
      const data = {...req.body, _id:result.insertedId}
      res.send({success:true, data})
    }
    catch(err){
      res.send({success:false, msg:err.message})
    }  
})

//삭제
todolist.delete('/', async (req, res) => { 
    const {id} = req.query
    
    try{      
      const result = await getDB().collection('todos').deleteOne({_id: new ObjectId(id)});
      res.send({success:true});
    }
    catch(err){
      res.send({success:false});
    }  
})

//수정
todolist.put('/state', async (req, res) => { 
    const {id} = req.query;
    const {isdone} = req.body;
    console.log(id, isdone);    
    
    try{
      const result = await getDB().collection('todos').updateOne({_id: new ObjectId(id)},{$set: req.body});
      res.send({success:true});
    }
    catch(err){
      res.send({success:false});
    }  
})

module.exports = todolist;