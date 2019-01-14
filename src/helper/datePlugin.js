import moment from 'moment'

let yearNow = Number(moment().format('YYYY'))
let lastYear = yearNow - 80
let lastYearMonth // 最小的那个年份的月份
let monthNow = Number(moment().format('M'))
let dayNow = Number(moment().format('D'))
let selectDays = 0 // 选择年月后这个月有多少天
let YING_JIE_SHENG = ''

export default function init(
  defaultModal = 'MMMM-YY-DD',
  defaultVal,
  lastVal = '',
  lastData = []
) {
  let val = []
  YING_JIE_SHENG = lastVal
  defaultModal = defaultModal.split('-') // 已什么样的模式输出默认MMMM-YY-DD
  if (lastData[0]) {
    lastYear = Number(lastData[0])
  }
  if (lastData[1]) {
    lastYearMonth = Number(lastData[1])
  }
  let years = initYears()
  years.map(item => {
    if (item.value !== YING_JIE_SHENG) {
      if (defaultModal[1]) {
        const year = item.value.split('年')[0]
        item.children = initMonths(year, defaultModal)
      }
    }
  })
  if (defaultVal) {
    let arr = defaultVal.split('-')
    let arr2 = ['年', '月', '日']
    arr.map((item, index) => {
      val.push(`${item}${arr2[index]}`)
    })
  } else {
    val = [`${yearNow}年`, `${monthNow}月`, `${dayNow}日`]
  }
  let obj = {
    data: years.reverse(),
    val: val,
  }
  return obj
}

function initYears() {
  let years = []
  for (let i = lastYear; i <= yearNow; i++) {
    let obj = {
      value: `${i}年`,
      label: `${i}年`,
      children: [],
    }
    years.push(obj)
  }
  years.push({
    value: YING_JIE_SHENG,
    label: YING_JIE_SHENG,
    children: [],
  })
  return years
}

function initMonths(year, defaultModal) {
  let months = []
  let nowYear = new Date().getFullYear()
  let nowMonth = new Date().getMonth()

  let len = Number(year) === nowYear ? nowMonth + 1 : 12
  let idefault = 1
  if (Number(year) === lastYear && lastYearMonth) { 
    idefault = lastYearMonth
  }
  for (let i = idefault; i <= len; i++) {
    let days = []
    let obj = {}
    if (defaultModal[2]) {
      days = initDaysByYearMonth(year, i)
      obj = {
        label: `${i}月`,
        value: `${i}月`,
        children: days,
      }
    } else {
      obj = {
        label: `${i}月`,
        value: `${i}月`,
      }
    }
    months.push(obj)
  }
  return months
}

function initDaysByYearMonth(year, month) {
  month = parseInt(month, 10)
  let d = new Date(year, month, 0)
  let days = []
  let day = d.getDate()
  selectDays = day
  for (let i = 1; i <= day; i++) {
    let obj = {
      label: `${i}日`,
      value: `${i}日`,
    }
    days.push(obj)
  }
  return days
}
