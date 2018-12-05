/**
 * Created by huangchao on 2017/10/20.
 */

const ArrayDelRepetition = function(data) {
  let tmp = {},
    arr = []
  for (let i = 0; i < data.length; i++) {
    if (!tmp[data[i]]) {
      arr.push(data[i])
      tmp[data[i]] = data[i]
    }
  }
  return arr
}

const procesTime = function(time = '') {
  if (!time) {
    return null
  }
  const T1 = time.split(' ')[0]
  const timeArr = T1.split('-')
  return (time = timeArr[1] + '-' + timeArr[2])
}

const changeEmail = function(email) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(email)
}

const changePhoneNumber = function(num) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(num)
}

const filterUndefind = function(obj) {
  const o = {}
  Object.keys(obj).forEach(data => {
    if (obj[data] !== undefined && obj[data] !== '') {
      o[data] = obj[data]
    }
  })
  return o
}

const filterUndefindToString = function(obj) {
  const o = {}
  Object.keys(obj).forEach(data => {
    o[data] = obj[data] || ''
  })
  return o
}

const dataSource = (start = 100, last = 7) => {
  // start 是多少年以前， last是多少年以后
  const nowYear = new Date().getFullYear()
  const stareYear = nowYear - start
  const endYear = nowYear + last
  const data = [[], []]
  for (let i = stareYear; i <= endYear; i++) {
    let year = {}
    year.label = `${i}年`
    year.value = `${i}`
    data[0].push(year)
  }
  for (let i = 1; i <= 12; i++) {
    let mouth = {}
    mouth.label = `${`${i}`.length === 1 ? `0${i}` : i}月`
    mouth.value = `${`${i}`.length === 1 ? `0${i}` : i}`
    data[1].push(mouth)
  }
  return data
}

const hidden_mobile = (mobile = '') => {
  if(mobile) {
    const len = mobile.length
    const hidden = mobile.substr(Math.floor((len - 4) / 2), 4)
    return mobile.replace(hidden, '****')
  }
}

const hidden_email = email => {
  let new_email = email
  if (email) {
    if (String(email).indexOf('@') > 0) {
      let str = email.split('@'),
        _s = ''
      if (str[0].length > 3) {
        for (let i = 0; i < str[0].length - 4; i++) {
          _s += '*'
        }
      }
      new_email =
        str[0].substr(0, 3) + _s + email[str[0].length - 1] + '@' + str[1]
    }
  }
  return new_email
}

const sortObj = obj => {
  const arr = []
  for (let i in obj) {
    arr.push([obj[i], i])
  }
  arr.reverse()
  const len = arr.length
  const newobj = {}
  for (let i = 0; i < len; i++) {
    newobj[arr[i][1]] = arr[i][0]
  }
  return newobj
}

export default {
  ArrayDelRepetition,
  procesTime,
  changeEmail,
  changePhoneNumber,
  filterUndefind,
  filterUndefindToString,
  dataSource,
  hidden_mobile,
  hidden_email,
  sortObj,
}
