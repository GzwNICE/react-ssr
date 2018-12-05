/**
 * Created by huangchao on 2017/10/19.
 */
import {
  singleFetch,
  multiFetch,
} from './autoFetch'

export function singleApi(...args) {
  const { url, action,cache, prelude, should } = getArgs(args)
  // console.log(cache)
  return (args = {}) => (dispatch, getState) => {
    const storage = getState()

    if(cache && cache().state !== 'jobpage') { // 读取缓存
      let s = cache().state
      let localState = storage[s]
      if(localState.list.length > 0) {
        let json = getCatchData(s, localState)
        return Promise.resolve(dispatch(action(args, json)))
      }
    }

    if (!should || should(args, storage)) {
      prelude && dispatch(prelude())
      return singleFetch(url, args)
        .then(json => dispatch(action(args, json)))
        .catch(err => {return err})
    }
  }
}

// const LISTARRY = ['HOME_POST_INIT']

export function multiApi(...args) {
  const { url, action, prelude, should } = getArgs(args)

  return (args = {}) => (dispatch, getState) => {
    const state = getState()
    if (!should || should(args, state)) {
      prelude && dispatch(prelude())
      return multiFetch(url, args)
        .then(json => {
          dispatch(action(args, json))
          return json
        })
        .catch(err => {
          if (err.errCode === 5004) {
            state.history.replace('/login')
          }
          throw err
        })
    }
  }
}

function getArgs(args) {
  if (args[0] instanceof Object) {
    return args[0]
  } else {
    return {
      url: args[0],
      action: args[1],
    }
  }
}

/*处理后端数据结构不统一问题*/
function getCatchData(type,localState) {
  let json = {}
  if(type === 'home') {
    return json = {
      data:{
        list:{
          data: localState.list,
          pager:localState.pager,
        },
      },
    }
  } else if(type === 'visity' || type === 'CollectCompany' || type === 'CollectPost' || type === 'SystemMessage'){
    return json = {
      data: {
        list: localState.list,
      },
    }
  } else if(type === 'DeliveryAll' || type === 'DeliveryLook' || type === 'DeliveryInvite' || type === 'DeliveryNo') {
    json = {
      data: localState.list,
    }
    return json
  } else {
    return json = {
      data: {
        list: localState.list,
        count: localState.pager.count,
        company: localState.company,
        size: 20,
      },
    }
  }
}