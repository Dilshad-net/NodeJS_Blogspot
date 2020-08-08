const express = require('express')
const app = express()
const controlRouter = require('./controller/control')
const Article = require('./model/base')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blogpost', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_mthd'))

app.get('/', async (req, res) => {
    const base = await Article.find().sort({ createdDate: 'desc' }) //gets all article
    res.render('index', { base : base })
})

app.use('/articles', controlRouter)

app.listen(5000)
