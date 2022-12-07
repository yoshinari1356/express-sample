const express = require('express')
const app = express()

//POSTできたりするように（おまじない）
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sqlite3関連設定
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./test.db", (err) => {
  if (err) {
    console.error("database error: " + err.message);
  } else {
    db.serialize(() => {
      //都度table削除（あれば）
      db.run("drop table if exists members");
      //table生成（無ければ）
      db.run("create table if not exists members( \
        id integer primary key autoincrement, \
        name nverchar(32), \
        age integer \
      )", (err) => {
        if (err) {
          console.error("table error: " + err.message);
        } else {
          //初期データinsert
          db.run("insert into members(name,age) values(?,?)", "hoge", 11);
          db.run("insert into members(name,age) values(?,?)", "foo", 22);
          db.run("insert into members(name,age) values(?,?)", "bar", 33);
        }
      });
    });
  }
});

//リッスン開始
app.listen(3030, () => {
  console.log("Start server on port 3030.");
});


// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})


//create
app.post("/members", (req, res) => {
  const reqBody = req.body;
  const stmt = db.prepare("insert into members(name,age) values(?,?)"); //lastID取得のため
  stmt.run(reqBody.name, reqBody.age, (err, result) => { //lambda式を使うとthis.lastIDでは取得できない
      if (err) {
          res.status(400).json({
              "status": "error",
              "message": err.message
          });
          return;
      } else {
          res.status(201).json({
              "status": "OK",
              "lastID": stmt.lastID
          });
      }
  });
});

//get members
app.get("/members", (req, res) => {
  db.all("select * from members", [], (err, rows) => {
      if (err) {
          res.status(400).json({
              "status": "error",
              "message": err.message
          });
          return;
      } else {
          res.status(200).json({
              "status": "OK",
              "members": rows
          });
      }
  });
});

//get member
app.get("/members/:id", (req, res) => {
  const id = req.params.id;
  db.get("select * from members where id = ?", id, (err, row) => {
      if (err) {
          res.status(400).json({
              "status": "error",
              "message": err.message
          });
          return;
      } else {
          res.status(200).json({
              "status": "OK",
              "members": row
          });
      }
  })
})

//update member
app.patch("/members", (req, res) => {
  const reqBody = req.body;
  const stmt = db.prepare("update members set name = ?, age = ? where id = ?");
  stmt.run(reqBody.name, reqBody.age, reqBody.id, (err, result) => {
      if (err) {
          res.status(400).json({
              "status": "error",
              "message": err.message
          });
          return;
      } else {
          res.status(200).json({
              "status": "OK",
              "updatedID": stmt.changes
          });
      }
  })
})

//delete member
app.delete("/members/:id", (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare("delete from members where id = ?");
  stmt.run(id, (err, result) => {
      if (err) {
          res.status(400).json({
              "status": "error",
              "message": err.message
          });
          return;
      } else {
          res.status(200).json({
              "status": "OK",
              "deletedID": stmt.changes
          });
      }
  })
})