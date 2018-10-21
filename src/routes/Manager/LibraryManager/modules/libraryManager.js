import { fetchGet, fetchPost } from '../../../../modules/apiUtils'

export const GET_COMPILATIONS_REQUEST = 'GET_COMPILATIONS_REQUEST'
export const GET_COMPILATIONS_SUCCESS = 'GET_COMPILATIONS_SUCCESS'
export const GET_COMPILATIONS_FAILURE = 'GET_COMPILATIONS_FAILURE'

export const IMPORT_GET_SESSIONS_REQUEST = 'IMPORT_GET_SESSIONS_REQUEST'
export const IMPORT_GET_SESSIONS_SUCCESS = 'IMPORT_GET_SESSIONS_SUCCESS'
export const IMPORT_GET_SESSIONS_FAILURE = 'IMPORT_GET_SESSIONS_FAILURE'

export function getCompilations (libraryName) {
  return (dispatch) => {
    dispatch({
      type: GET_COMPILATIONS_REQUEST
    })

    return fetchGet(`/music/libraries/${libraryName}`)
      .then(compilations => {
        console.dir(compilations)
        dispatch({
          type: GET_COMPILATIONS_SUCCESS,
          payload: compilations.data
        })
      })
  }
}

export function getImportSessions (libraryName) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_GET_SESSIONS_REQUEST
    })

    return fetchGet(`/manager/libraries/${libraryName}/import/sessions`)
      .then(({ data }) => {


        dispatch({
          type: IMPORT_GET_SESSIONS_SUCCESS,
          payload: data
        })
      })
  }
}

const initialState = {
  fetching: false,
  compilations: [],
  importSessions: [],
}


const ACTION_HANDLERS = {
  [IMPORT_GET_SESSIONS_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
      importSessions: [],
    }
  },
  [IMPORT_GET_SESSIONS_SUCCESS]: (state, { sessions }) => {
    return {
      ...state,
      fetching: false,
      importSessions: sessions,
    }
  },
  [IMPORT_GET_SESSIONS_FAILURE]: (state, { err }) => {
    return {
      ...state,
      fetching: false,
      importSessions: [],
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
