// const functions = require('firebase-functions');
// const express = require ("express");

// // http://localhost:5000/functions-cc13c/us-central1/helloWorld


// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //

// const app = express();

// app.get('/hello',(req,res) => {
//     res.send('Hello Express!');
// });

// const api = functions.https.onRequest(app);
// module.exports = {api};

// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });


// index.js
const functions = require('firebase-functions');
// Expressの読み込み
const express = require("express");
const requestPromise = require('request-promise-native');


const app = express();

// APIにリクエストを送る関数を定義
const getDataFromApi = async keyword => {
    // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
    const requestUrl = 'https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:';
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
  }

// APIにリクエストを送る関数を定義
const getDataFromApi2 = async keyword => {
    // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
    const requestUrl = 'https://connpass.com/api/v1/event/?&callback=jsonData';
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
  }



// ↓↓↓ エンドポイントを追加 ↓↓↓
app.get('/user/:userId', (req, res) => {
    const users = [
      { id: 1, name: 'ジョナサン' },
      { id: 2, name: 'ジョセフ' },
      { id: 3, name: '承太郎' },
      { id: 4, name: '仗助' },
      { id: 5, name: 'ジョルノ' },
    ];
    // req.params.userIdでURLの後ろにつけた値をとれる．
    const targetUser = users.find(user => user.id === Number(req.params.userId));
    res.send(targetUser);
  });

// エンドポイント追加
app.get('/gbooks/:keyword', async (req, res) => {
    // APIリクエストの関数を実行
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
  });  

// エンドポイント追加
app.get('/ivent', async (req, res) => {
    // APIリクエストの関数を実行
    const response = await getDataFromApi2(req.params.keyword);
    res.send(response);
  });  



// 出力
const api = functions.https.onRequest(app);
module.exports = { api };