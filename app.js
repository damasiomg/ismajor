const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const isAge = (req, res, next) => {
  if (!req.query.age) {
    res.redirect('/')
  } else {
    next()
  }
}

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) res.redirect(`/major?age=${req.body.age}`)
  else res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/major', isAge, (req, res) => {
  res.render('result', {
    msg: `Você é maior de idade e possuiu ${req.query.age} anos`
  })
})

app.get('/minor', isAge, (req, res) => {
  res.render('result', {
    msg: `Você não é maior de idade e possuiu ${req.query.age} anos`
  })
})

app.listen(3000)
