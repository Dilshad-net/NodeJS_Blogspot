const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const domPurifier = require('dompurify')
const { JSDOM } = require('jsdom')

const dompurify = domPurifier(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    slugify: {
        type: String,
        required: true,
        unique: true
    },
    Sanitizer: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next){
    if(this.title){
        this.slugify = slugify(this.title, { lower: true, strict: true })
    }

    if(this.markdown){
        this.Sanitizer = dompurify.sanitize(marked(this.markdown))
    }

    next()
})

module.exports = mongoose.model('Article', articleSchema)
