import { fetchGet } from '../../../../modules/apiUtils'

import { stepBuildLibraryTreeHandlers } from './stepBuildLibraryTree'
import { stepMakeProgressHandlers } from './stepMakeProgress'

export const IMPORT_SESSION_TREE_GET_SESSION_REQUEST = 'IMPORT_SESSION_TREE_GET_SESSION_REQUEST'
export const IMPORT_SESSION_TREE_GET_SESSION_SUCCESS = 'IMPORT_SESSION_TREE_GET_SESSION_SUCCESS'
export const IMPORT_SESSION_TREE_GET_SESSION_FAILURE = 'IMPORT_SESSION_TREE_GET_SESSION_FAILURE'

export const IMPORT_CANCEL_STEP = 'IMPORT_CANCEL_STEP'

export function cancelStep (step) {
  return {
    type: IMPORT_CANCEL_STEP,
    payload: {
      step
    }
  }
}

export function getImportSession (importSessionId) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_SESSION_TREE_GET_SESSION_REQUEST
    })

    return fetchGet(`/manager/imports/${importSessionId}`)
      .then(({ data }) => {
        dispatch({
          type: IMPORT_SESSION_TREE_GET_SESSION_SUCCESS,
          payload: {
            session: data.session
          }
        })
      })
  }
}


const initialState = {
  fetching: false,
  // importPath: 'F:\\docs\\music\\mlp\\My Little Pony Ost\\mlpost',
  // networkPath: 'http://localhost',
  session: {},
  fileTree: {},
  importType: 'library',
}


const ACTION_HANDLERS = {
  ...stepBuildLibraryTreeHandlers,
  ...stepMakeProgressHandlers,
  [IMPORT_SESSION_TREE_GET_SESSION_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
    }
  },
  [IMPORT_SESSION_TREE_GET_SESSION_SUCCESS]: (state, { session }) => {
    return {
      ...state,
      fetching: false,
      session: session || {},
    }
  },
  [IMPORT_SESSION_TREE_GET_SESSION_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
}

export default function librariesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  if (handler) {
    return handler(state, action.payload)
  }

  return state
}
