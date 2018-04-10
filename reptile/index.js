const { getBook } = require('./reptile.js')
const { mkdirs } = require('../utils')
const books = [
  {
    id: '3137',
    label: '元尊'
  }, {
    id: '3952',
    label: '我是至尊'
  }
]

getBook(books[1])