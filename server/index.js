const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const todolist = require('./api/todolist.js');
const {connectDB} = require('./db/db_todolist.js');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

async function serverStart(){
  await connectDB(); //await 작업이 끝날때까지 아래 명령들이 실행을 못함.
  app.use('/todo',todolist);

  app.listen(4000, () => { //listen 서버실행 
    console.log('Server is running on http://localhost:3000')
  })
}
serverStart();

