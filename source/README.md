# 自动更新小说网站

- [ ]1.使用nodejs做一个爬虫

## 爬虫

网上盗版的小说网站很多,选一个自己喜欢看的[笔趣阁](https://m.qu.la)

```JS
const baseURL = 'https://m.qu.la'
const bookid = '3137' // 为书籍的ID 该书为天蚕土豆的《元尊》
// 书籍内容以及最新的8章小说
`${baseURL}/book/${bookid}/` // #chapterlist
// 书籍目录
`${baseURL}/booklist/${bookid}.html`   // #chapterlist
// 该章节内容 /book/${bookid}/${chapterid}.html 可以在目录中找到
`${baseURL}/book/${bookid}/${chapterid}.html` // #chaptercontent
```
