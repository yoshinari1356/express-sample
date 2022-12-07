import express from 'express';
console.log("main");
const app = express();

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.send('Hello World! get')
  console.log("get")
  console.log(req)
  console.log(res)
  console.log(req.query)
  console.log(req.params)
  console.log(req.body)
})

app.post('/', (req, res) => {
  res.send('Hello World! post')
  console.log("post")
  console.log(req)
  console.log(res)
  console.log(req.query)
  console.log(req.params)
  console.log(req.body)
  // console.log(req.files)
  // console.log(req.files.photo)
  // console.log(req.files.video)
  // console.log(req.files.audio)
  // console.log(req.files.image)
  // console.log(req.files.document)
  // console.log(req.files.text)
})

app.put('/', (req, res) => {
  res.send('Hello World! put')
  console.log("put")
  console.log(req)
  console.log(res)
  console.log(req.query)
  console.log(req.params)
  console.log(req.body)
  // console.log(req.files)
  // console.log(req.files.photo)
  // console.log(req.files.video)
  // console.log(req.files.audio)
  // console.log(req.files.image)
  // console.log(req.files.document)
  // console.log(req.files.text)
})

app.delete('/', (req, res) => {
  res.send('Hello World! delete')
  console.log("delete")
  console.log(req)
  console.log(res)
  console.log(req.query)
  console.log(req.params)
  console.log(req.body)
  // console.log(req.files)
  // console.log(req.files.photo)
  // console.log(req.files.video)
  // console.log(req.files.audio)
})

app.listen(3030, () => {
  console.log("listening")
  // console.log(app)
  // console.log(app.get)
  // console.log(app.post)
  // console.log(app.put)
  // console.log(app.delete)
  // console.log(app.listen)
  // console.log(app.server)
  // console.log(app.server.listen)
  // console.log(app.server.address())
  // console.log(app.server.address().port)
  // console.log(app.server.address().address)
  // console.log(app.server.address().address)
  // console.log(app.server.address().port)
})

app.listen(3030)
