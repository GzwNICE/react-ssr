const express = require('express')
const router = express.Router()
const request = require('request')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`<pre>${JSON.stringify(config, null, 2)}</pre>`)
})

router.all('/:id/*', function(req, res, next) {
  const id = req.params.id
  const opt = config[id]
  const api = req.url.replace(`/${id}`, '')
  const url = `${opt.url}${api}`
  const origin = req.headers.origin && req.headers.origin.match(/https?:\/\/([^\/]+)/)[1]

  if (
    process.env.NODE_ENV !== 'production' ||
    /(\d{1,3}\.){3}\.\d{1,3}/.test(origin) ||
    opt.filter.indexOf(origin) >= 0 ||
    opt.filter.filter(item => item instanceof RegExp && item.test(origin)).length
  ) {
    res.header("Access-Control-Allow-Origin", "*")
  }

  req.pipe(request(url)).pipe(res)
})

module.exports = router

var config = {
  've.sso': {
    url: 'https://sso.veryeast.cn',
    filter: [
      $regexp(/.*\.veryeast\.cn$/),
    ],
  },
  've.mobile.interface': {
    url: 'https://mobile-interface.veryeast.cn',
    filter: [
      'localhost',
      'm.veryeast.cn',
    ],
  },
}

function $regexp(regexp) {
  regexp.toJSON = regexp.toString
  return regexp
}