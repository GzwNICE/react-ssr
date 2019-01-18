import store from 'store'
import transport from '../helper/fetching'
import constants from '../helper/constants'
import Standard from '../helper/standard'

export const standard = new Standard()

export const $ = constants('option', [
  'load', // 获取用户信息
])

let load
let option  = store.get('m:option') || {}
let oddTime = option.time || 0, nowTime = new Date().getTime()

  if(nowTime - oddTime > 86400000) { // 确保一天取一次option数据
    load = transport({
      url: ':ve.mobile.interface/data/options',
      type: $.load,
      done(payload, params, getState) {
        // console.log(params)
        // params = Object.assign(params, {appchannel: 'web'})
        const option = {
          ...payload.data,
        };

        (['areas', 'positions', 'opts_arrival_time', 'opts_company_industry', 'opts_company_industry_all', 'opts_edu_major',
          'opts_education', 'opts_gender', 'opts_hot_area', 'opts_id_type', 'opts_industry',
          'opts_job_status', 'opts_language', 'opts_master_degree', 'opts_resume_status', 'opts_room_board',
          'opts_search_salarys', 'opts_star_level', 'opts_update_time', 'opts_work_mode', 'opts_work_years',
          'opts_company_type', 'opts_nation', 'opts_policital', 'opts_topic', 'opts_marital',
        ]).forEach(item => {
          option[`${item}_index`] = optIndex(option[item])
        });
        (['salary_currency', 'salary_mode', 'salary_scope',
        ]).forEach(item => {
          option.opts_salary[`${item}_index`] = optIndex(option.opts_salary[item])
        })

        return {
          params,
          payload: option,
        }
      },
    })
  } else {
    load = () => dispatch => {
      dispatch({
        type: $.load,
        payload: option,
      })
      return Promise.resolve({
        data: option,
      })
    }
  }

export {load}

function optIndex(sublist = [], index = {}) {
  sublist.forEach(item => {
    index[item.code] = item.value
    optIndex(item.sublist, index)
  })
  return index
}
