const api = require('../service/index.js')
const { JSDOM } = require('jsdom')
const fs = require('fs')
const { mkdirs, dateFormat } = require('../utils')
/**
 * 获取目前正本小说信息
 * @param {id, label} book 
 */
function getBook (book) {
  api.get(`/booklist/${book.id}.html`).then(res => {
    const { document } = (new JSDOM(`${res}`, {contentType: "text/html"})).window
    let chapterlist = Array.prototype.slice.call(document.querySelectorAll('#chapterlist > p'), 1)
    let chapters = []
    for (let item of chapterlist) {
      let chapter = {
        url: item.querySelector('a').href,
        label: item.textContent
      }
      chapters.push(chapter)
      // if (chapters.length > 20) break
    }
    getContentByChapters(book, chapters)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 
 * @param {*} book 
 * @param {*} chapters 
 */
function getContentByChapters (book, chapters) {
  let chapter = chapters.shift()
  if (chapter) {
    getContent(book, chapter).then(() => {
      getContentByChapters(book, chapters)
    })
  }
}

/**
 * 获取章节内容
 * @param {url, label} chapter 
 */
function getContent (book, chapter) {
  return api.get(chapter.url).then(res => {
    const { document } = (new JSDOM(`${res}`, {contentType: "text/html"})).window
    let content = document.querySelector('#chaptercontent').outerHTML
    content = content.substring(content.indexOf('</p>')+4, content.indexOf('<script>app2()</script>')).replace(/<br>/g, '\n').replace(/&nbsp;/g, '').replace('<!--divstyle="color:#f00">热门推荐：', '')
    // console.log(content)
    let dirname = `./source/_posts/${book.label}`
    let filename = `${dirname}/${chapter.label}.md`
    mkdirs(dirname, () => {
      fs.writeFile(filename,
`---
title: ${chapter.label}
date: ${dateFormat('yyyy-MM-dd hh:mm:ss')}
tags: [Duke]
categories: ${book.label}
---
${content}`,function(err){
            if(err) console.log(`写文件${filename}操作失败`)
            else console.log(`写文件${filename}操作成功`)
          })
        })
    })
}

module.exports = {
  getBook
}