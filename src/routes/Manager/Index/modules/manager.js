import { fetchGet, fetchPost, fetchDelete } from '../../../../modules/apiUtils'
import { openConfirmation, openSingleInput } from '../../../../modules/popups'
import { stepBuildLibraryTreeHandlers } from "../../Import/modules/stepBuildLibraryTree"
import { stepMakeProgressHandlers } from "../../Import/modules/stepMakeProgress"
import { IMPORT_SESSION_TREE_GET_SESSION_REQUEST } from "../../Import/modules/import"

export const GET_LIBRARIES_REQUEST = 'GET_LIBRARIES_REQUEST'
export const GET_LIBRARIES_SUCCESS = 'GET_LIBRARIES_SUCCESS'
export const GET_LIBRARIES_FAILURE = 'GET_LIBRARIES_FAILURE'

export const CREATE_LIBRARIES_REQUEST = 'CREATE_LIBRARIES_REQUEST'
export const CREATE_LIBRARIES_SUCCESS = 'CREATE_LIBRARIES_SUCCESS'
export const CREATE_LIBRARIES_FAILURE = 'CREATE_LIBRARIES_FAILURE'

export const DELETE_LIBRARY_REQUEST = 'DELETE_LIBRARY_REQUEST'
export const DELETE_LIBRARY_SUCCESS = 'DELETE_LIBRARY_SUCCESS'
export const DELETE_LIBRARY_FAILURE = 'DELETE_LIBRARY_FAILURE'

export const MANAGER_MUSIC_DELETE_ALL_REQUEST = 'MANAGER_MUSIC_DELETE_ALL_REQUEST'
export const MANAGER_MUSIC_DELETE_ALL_SUCCESS = 'MANAGER_MUSIC_DELETE_ALL_SUCCESS'
export const MANAGER_MUSIC_DELETE_ALL_FAILURE = 'MANAGER_MUSIC_DELETE_ALL_FAILURE'

export const MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_REQUEST = 'MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_REQUEST'
export const MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_SUCCESS = 'MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_SUCCESS'
export const MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_FAILURE = 'MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_FAILURE'

export function getLibraries () {
  return (dispatch) => {
    dispatch({
      type: GET_LIBRARIES_REQUEST
    })

    return fetchGet('/music/libraries/')
      .then(({ data }) => {
        const { libraries } = data

        dispatch({
          type: GET_LIBRARIES_SUCCESS,
          payload: {
            libraries
          }
        })
      })
  }
}

export function createLibrary (defaultValue) {
  const createLibraryAction = result => dispatch => {
    dispatch({
      type: CREATE_LIBRARIES_REQUEST
    })

    fetchPost(`/music/libraries`, {
      body: JSON.stringify({
        name: result,
      })
    })
      .then(response => {
        dispatch({
          type: CREATE_LIBRARIES_SUCCESS,
        })
      })
  }

  return openSingleInput({
    title: `Library name:`,
    confirmText: 'Create',
    defaultValue,
    action: createLibraryAction
  })
}

export function deleteLibrary (name) {
  const deleteAction = (dispatch) => {
    dispatch({
      type: DELETE_LIBRARY_REQUEST
    })

    fetchDelete(`/music/libraries/${name}`, {})
      .then(response => {
        dispatch({
          type: DELETE_LIBRARY_SUCCESS,
        })
      })
  }

  return openConfirmation({
    title: `Do you really want to delete library '${name}'?`,
    confirmText: 'Delete',
    rejectText: 'Cancel',
    action: deleteAction
  })
}

export function deleteAllMusic (name) {
  const deleteAction = (dispatch) => {
    dispatch({
      type: MANAGER_MUSIC_DELETE_ALL_REQUEST
    })

    fetchDelete(`/manager/music/all`, {})
      .then(response => {
        dispatch({
          type: MANAGER_MUSIC_DELETE_ALL_SUCCESS,
        })
      })
  }

  return openConfirmation({
    title: `Do you really want to delete all music?`,
    confirmText: 'Delete',
    rejectText: 'Cancel',
    action: deleteAction
  })
}

export function reImportAllSessions (name) {
  const action = (dispatch) => {
    dispatch({
      type: MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_REQUEST
    })

    fetchPost(`/manager/music/reimport`, {})
      .then(response => {
        dispatch({
          type: MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_SUCCESS,
        })
      })
  }

  return openConfirmation({
    title: `Do you really want to reimport all sessions?`,
    confirmText: 'Import',
    rejectText: 'Cancel',
    action: action
  })
}

export function deleteImport (name) {
  const action = (dispatch) => {
    dispatch({
      type: MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_REQUEST
    })

    fetchPost(`/manager/music/reimport`, {})
      .then(response => {
        dispatch({
          type: MANAGER_MUSIC_REIMPORT_ALL_COMPLETED_SUCCESS,
        })
      })
  }

  return openConfirmation({
    title: `Do you really want to reimport all sessions?`,
    confirmText: 'Import',
    rejectText: 'Cancel',
    action: action
  })
}

const initialState = {
  fetching: false,
  libraries: [],
}

const ACTION_HANDLERS = {
  [GET_LIBRARIES_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
    }
  },
  [GET_LIBRARIES_SUCCESS]: (state, { libraries }) => {
    return {
      ...state,
      fetching: false,
      libraries: libraries,
    }
  },
  [GET_LIBRARIES_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
  [MANAGER_MUSIC_DELETE_ALL_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
    }
  },
  [MANAGER_MUSIC_DELETE_ALL_SUCCESS]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
  [MANAGER_MUSIC_DELETE_ALL_FAILURE]: (state) => {
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
