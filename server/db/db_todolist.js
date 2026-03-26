const { MongoClient } = require('mongodb');

//const uri = "mongodb+srv://nahawon2ya:W2917lee!@cluster0.g2hi2ti.mongodb.net/?appName=Cluster0"; //srv 요즘방식
const uri = "mongodb://nahawon2ya:W2917lee!@ac-jo9wsju-shard-00-00.g2hi2ti.mongodb.net:27017,ac-jo9wsju-shard-00-01.g2hi2ti.mongodb.net:27017,ac-jo9wsju-shard-00-02.g2hi2ti.mongodb.net:27017/?ssl=true&replicaSet=atlas-qc9dl1-shard-0&authSource=admin&appName=Cluster0"; //옛날방식

const client = new MongoClient(uri);

let db;
async function connectDB(){
    try{
        await client.connect(); //몽고접속
        db = client.db('todolist'); //프로젝트db 활성화
        console.log('접속완료');    
    }
    catch(err){
        console.error(err);        
    }
}

function getDB(){
    return db;
}

module.exports = {connectDB, getDB};