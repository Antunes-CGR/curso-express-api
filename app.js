const express = require("express");

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  return res.send('hello world')
})

app.get('/anotherroute', (req, res) => {
  return res.send('this is another route')
})

app.get('/person', (req, res) => {
  console.log(req.query);
  return res.json({
    message: 'hello world',
    name: req.query.name,
    age: req.query.age
  })
})

app.get('/person/:youcanpassanything', (req, res) => {
  console.log(req.params.youcanpassanything)
  return res.json({
    message: 'hello world',
    myparams: req.params.youcanpassanything,
  })
})

app.get('/person/:first/:second/:third', (req, res) => {
  console.log(req.params)
  return res.json({
    message: 'hello world',
  })
})

app.post('/person', (req, res) => {
  console.log(req.body);
  return res.json({
    message: 'this is your data',
    name: req.body.name,
    age: req.body.age
  })
})

app.put('/person/:id', (req, res) => {
  console.log(req.body);
  return res.json({
    message: 'put route',
  })
})

app.delete('/person/:id', (req, res) => {
  console.log(req.params);
  return res.json({
    message: 'delete route',
  })
})

app.get('/download', (req, res) => {
  return res.download('./files/images/pikachu.png')
})

app.get('/download-video', (req, res) => {
  return res.download('./files/videos/samplevideo.mp4')
})

app.get('/redirect-google', (req, res) => {
  return res.redirect('https://google.com')
})

app.get('/redirect-again', (req, res) => {
  return res.redirect('http://localhost:3000/person?name=john&age=300')
})

app.get('/hello', (req, res) => {
  return res.render('hello')
})

app.get('/test-httpresponse', (req, res) => {
  return res.status(400).json({
    message: 'Oops you are not allowed to access this API'
  })
})

const myMiddleware = (req, res, next) => {
  req.customData = 'custom data from middleware'
  console.log('this message is from middleware');
  next()
}

app.get('/test-middleware', myMiddleware, (req, res) => {
  return res.json({
    message: 'middleware is cool',
    data: req.customData
  })
})

app.get('/test-middleware-two', myMiddleware, (req, res) => {
  return res.json({
    message: 'middleware is good',
    data: req.customData
  })
})
app.listen(3000, () => {
  console.log('server is listening on http://localhost:3000');
})