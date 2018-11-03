import { fetchGet, fetchPost } from '../../../../modules/apiUtils'
import { push } from "connected-react-router"

export const IMPORT_GET_TREE_REQUEST = 'IMPORT_GET_TREE_REQUEST'
export const IMPORT_GET_TREE_SUCCESS = 'IMPORT_GET_TREE_SUCCESS'
export const IMPORT_GET_TREE_FAILURE = 'IMPORT_GET_TREE_FAILURE'

export const IMPORT_CONFIRM_TREE_REQUEST = 'IMPORT_CONFIRM_TREE_REQUEST'
export const IMPORT_CONFIRM_TREE_SUCCESS = 'IMPORT_CONFIRM_TREE_SUCCESS'
export const IMPORT_CONFIRM_TREE_FAILURE = 'IMPORT_CONFIRM_TREE_FAILURE'

export function getTree (libraryName, importPath, networkPath, importSessionId) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_GET_TREE_REQUEST,
      payload: {
        libraryName,
        importPath,
        networkPath,
      }
    })

    const params = {
      body: JSON.stringify({
        libraryName,
        importPath,
        networkPath,
      })
    }
    return fetchPost(`/manager/imports/${importSessionId}/tree`, params)
      .then(({ data }) => {
        const { fileTree } = data

        dispatch({
          type: IMPORT_GET_TREE_SUCCESS,
          payload: {
            fileTree
          }
        })
      })
  }
}

export function confirmTree (importSessionId) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_CONFIRM_TREE_REQUEST,
      payload: {}
    })

    const params = {
      body: JSON.stringify({})
    }
    return fetchPost(`/manager/imports/${importSessionId}/tree/confirm`, params)
      .then(({ data }) => {
        const { tracks, albums, compilations, status } = data

        dispatch({
          type: IMPORT_CONFIRM_TREE_SUCCESS,
          payload: {
            tracks,
            albums,
            compilations,
            status
          }
        })
      })
  }
}

export const stepBuildLibraryTreeHandlers = {
  [IMPORT_GET_TREE_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true
    }
  },
  [IMPORT_GET_TREE_SUCCESS]: (state, { fileTree }) => {
    return {
      ...state,
      fetching: false,
      fileTree: fileTree
    }
  },
  [IMPORT_GET_TREE_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
  [IMPORT_CONFIRM_TREE_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true
    }
  },
  [IMPORT_CONFIRM_TREE_SUCCESS]: (state, { status, tracks, albums, compilations, }) => {
    const nextSession = { ...state.session, status: status }
    return {
      ...state,
      session: nextSession,
      tracks,
      albums,
      compilations,
    }
  },
  [IMPORT_CONFIRM_TREE_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
}
