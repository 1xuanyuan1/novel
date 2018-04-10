const fs = require("fs")
const path = require("path")
  
// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback()
        } else {  
            console.log(path.dirname(dirname));
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback)
                console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录')
            })
        }  
    })
}  
// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 时间格式转化
 * @param  {[type]} date [description]
 * @param  {[type]} fmt  [description]
 * @return {[type]}      [description]
 */
const dateFormat = (fmt, date = new Date()) => {
  let o = {
    'M+': date.getMonth() + 1,                 // 月份
    'd+': date.getDate(),                    // 日
    'h+': date.getHours(),                   // 小时
    'm+': date.getMinutes(),                 // 分
    's+': date.getSeconds(),                 // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds()             // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

module.exports = {
  dateFormat,
  mkdirs,
  mkdirsSync
}