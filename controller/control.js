const express = require('express')
const router = express.Router()
const Article = require('./../model/base')

router.get('/new', (req, res) => {
    res.render('new', { base: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const base = await Article.findById(req.params.id)
    res.render('edit', { base: base })
})

router.get('/:slugify', async (req, res) => {
    //const base = await Article.findById(req.params.id)
    const base = await Article.findOne({ slugify: req.params.slugify })
    //res.send('ok 200')
    if(base == null) res.redirect('new/')
    res.render('show', { base: base })
})

router.post('/', async (req, res) => {
    let base = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        base = await base.save()
        res.redirect(`/articles/${base.slugify}`)
    }
    catch (e){
        //res.render('new')
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router
