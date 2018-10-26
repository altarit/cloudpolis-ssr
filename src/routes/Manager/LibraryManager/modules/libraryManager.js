import { fetchDelete, fetchGet, fetchPost } from '../../../../modules/apiUtils'
import {
  DELETE_SONGS_REQUEST,
  DELETE_SONGS_SUCCESS,
  EXTRACT_SONGS_REQUEST, EXTRACT_SONGS_SUCCESS
} from "../../../Libraries/modules/librariesManager"

export const GET_COMPILATIONS_REQUEST = 'GET_COMPILATIONS_REQUEST'
export const GET_COMPILATIONS_SUCCESS = 'GET_COMPILATIONS_SUCCESS'
export const GET_COMPILATIONS_FAILURE = 'GET_COMPILATIONS_FAILURE'

export const IMPORT_GET_SESSIONS_REQUEST = 'IMPORT_GET_SESSIONS_REQUEST'
export const IMPORT_GET_SESSIONS_SUCCESS = 'IMPORT_GET_SESSIONS_SUCCESS'
export const IMPORT_GET_SESSIONS_FAILURE = 'IMPORT_GET_SESSIONS_FAILURE'

export const LIBRARY_MANAGER_DELETE_TRACKS_REQUEST = 'LIBRARY_MANAGER_DELETE_TRACKS_REQUEST'
export const LIBRARY_MANAGER_DELETE_TRACKS_SUCCESS = 'LIBRARY_MANAGER_DELETE_TRACKS_SUCCESS'
export const LIBRARY_MANAGER_DELETE_TRACKS_FAILURE = 'LIBRARY_MANAGER_DELETE_TRACKS_FAILURE'

export const LIBRARY_MANAGER_EXTRACT_TRACKS_REQUEST = 'LIBRARY_MANAGER_EXTRACT_TRACKS_REQUEST'
export const LIBRARY_MANAGER_EXTRACT_TRACKS_SUCCESS = 'LIBRARY_MANAGER_EXTRACT_TRACKS_SUCCESS'
export const LIBRARY_MANAGER_EXTRACT_TRACKS_FAILURE = 'LIBRARY_MANAGER_EXTRACT_TRACKS_FAILURE'

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

export function deleteLibraryTracks() {
  return (dispatch) => {
    dispatch({
      type: DELETE_SONGS_REQUEST
    })

    fetchDelete(`/music/songs`)
      .then(response => {
        dispatch({
          type: DELETE_SONGS_SUCCESS
        })
      })
  }
}

export function extractLibraryTracks() {
  return (dispatch) => {
    dispatch({
      type: EXTRACT_SONGS_REQUEST
    })

    fetchPost(`/music/extract`)
      .then(response => {
        dispatch({
          type: EXTRACT_SONGS_SUCCESS
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
