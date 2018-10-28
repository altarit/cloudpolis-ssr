import { fetchPost } from '../../../../modules/apiUtils'
import { push } from 'connected-react-router'

export const IMPORT_SET_IMPORT_PATH = 'IMPORT_SET_IMPORT_PATH'
export const IMPORT_SET_NETWORK_PATH = 'IMPORT_SET_NETWORK_PATH'

export const IMPORT_CHECK_AVAILABILITY_REQUEST = 'IMPORT_CHECK_AVAILABILITY_REQUEST'
export const IMPORT_CHECK_AVAILABILITY_SUCCESS = 'IMPORT_CHECK_AVAILABILITY_SUCCESS'
export const IMPORT_CHECK_AVAILABILITY_FAILURE = 'IMPORT_CHECK_AVAILABILITY_FAILURE'

export const IMPORT_PREPARE_IMPORT_REQUEST = 'IMPORT_PREPARE_IMPORT_REQUEST'
export const IMPORT_PREPARE_IMPORT_SUCCESS = 'IMPORT_PREPARE_IMPORT_SUCCESS'
export const IMPORT_PREPARE_IMPORT_FAILURE = 'IMPORT_PREPARE_IMPORT_FAILURE'

export function setImportPath (path) {
  return {
    type: IMPORT_SET_IMPORT_PATH,
    payload: {
      path: path
    }
  }
}

export function changeNetworkPath (path) {
  return {
    type: IMPORT_SET_NETWORK_PATH,
    payload: {
      path: path
    }
  }
}

export function checkAvailability (importPath, networkPath) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_CHECK_AVAILABILITY_REQUEST,
      payload: {
        importPath,
        networkPath,
      }
    })

    let params = {
      body: JSON.stringify({ importPath, networkPath })
    }
    return fetchPost(`/path/availability/`, params)
      .then(({ data }) => {
        const { isReadingAvailable, checkedFiles, isCreationAvailable } = data

        dispatch({
          type: IMPORT_CHECK_AVAILABILITY_SUCCESS,
          payload: {
            isReadingAvailable,
            checkedFiles,
            isCreationAvailable,
          }
        })
      })
  }
}

export function prepareImportSession (libraryName, importPath, networkPath) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_PREPARE_IMPORT_REQUEST,
      payload: {
        libraryName,
        importPath,
        networkPath,
      }
    })

    const params = {
      body: JSON.stringify({
        importPath,
        networkPath,
      })
    }
    return fetchPost(`/manager/libraries/${libraryName}/import/sessions`, params)
      .then(({ data }) => {
        const { importSessionId } = data

        dispatch({
          type: IMPORT_PREPARE_IMPORT_SUCCESS,
          payload: {
            importSessionId
          }
        })
        dispatch(push(`/manager/imports/${importSessionId}`))
      })
  }
}

const initialState = {
  fetching: false,
  // importPath: 'F:\\docs\\music\\mlp\\My Little Pony Ost\\mlpost',
  importPath: 'D:\\Documents\\Music\\MAv16\\Artists',
  // networkPath: 'http://localhost',
  networkPath: 'http://localhost/files/music/mlpfa/',
  isAvailable: false,
}


const ACTION_HANDLERS = {
  [IMPORT_SET_IMPORT_PATH]: (state, { path }) => {
    return {
      ...state,
      importPath: path,
      isCreationAvailable: false,
      isReadingAvailable: false,
      checkedFiles: 0,
    }
  },
  [IMPORT_SET_NETWORK_PATH]: (state, { path }) => {
    return {
      ...state,
      networkPath: path,
      isCreationAvailable: false,
      isReadingAvailable: false,
      checkedFiles: 0,
    }
  },
  [IMPORT_CHECK_AVAILABILITY_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
      isCreationAvailable: false,
      isReadingAvailable: false,
      checkedFiles: 0,
    }
  },
  [IMPORT_CHECK_AVAILABILITY_SUCCESS]: (state, { isReadingAvailable, isCreationAvailable, checkedFiles }) => {
    return {
      ...state,
      fetching: false,
      isCreationAvailable,
      isReadingAvailable,
      checkedFiles,
    }
  },
  [IMPORT_CHECK_AVAILABILITY_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
      isCreationAvailable: false,
      isReadingAvailable: false,
      checkedFiles: 0,
    }
  },
  [IMPORT_PREPARE_IMPORT_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
    }
  },
  [IMPORT_PREPARE_IMPORT_SUCCESS]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
  [IMPORT_PREPARE_IMPORT_FAILURE]: (state) => {
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
