import { fetchGet, fetchPost } from '../../../modules/apiUtils'

export const FILE_MANAGER_GET_DIRS_REUQEST = 'FILE_MANAGER_GET_DIRS_REUQEST'
export const FILE_MANAGER_GET_DIRS_SUCCESS = 'FILE_MANAGER_GET_DIRS_SUCCESS'
export const FILE_MANAGER_GET_DIRS_FAILURE = 'FILE_MANAGER_GET_DIRS_FAILURE'

export const getDirContent = owner => (mainPath, additionalPath) => dispatch => {
  dispatch({
    type: FILE_MANAGER_GET_DIRS_REUQEST,
    payload: {
      owner
    }
  })

  const params = {
    body: JSON.stringify({ mainPath: mainPath, additionalPath: additionalPath })
  }

  return fetchPost(`/path/dir/`, params)
    .then(({ data }) => {
      dispatch({
        type: FILE_MANAGER_GET_DIRS_SUCCESS,
        payload: {
          owner,
          path: data.path,
          files: data.files,
          drives: data.drives
        }
      })
    })
}

const initialState = {
  fetching: false,
}

const initialOwnerState = {
  path: '',
  files: [],
  drives: [],
}

const ACTION_HANDLERS = {
  [FILE_MANAGER_GET_DIRS_REUQEST]: (state, { owner }) => {
    const ownerState = state[owner] || initialOwnerState

    return {
      ...state,
      [owner]: {
        ...ownerState,
        fetching: true,
        path: '',
        files: [],
        drives: [],
      }
    }
  },
  [FILE_MANAGER_GET_DIRS_SUCCESS]: (state, { owner, path, files, drives }) => {
    const ownerState = state[owner] || initialOwnerState

    return {
      ...state,
      [owner]: {
        ...ownerState,
        fetching: false,
        path,
        files,
        drives,
      }
    }
  },
  [FILE_MANAGER_GET_DIRS_FAILURE]: (state, { owner, path, files }) => {
    const ownerState = state[owner] || initialOwnerState

    return {
      ...state,
      [owner]: {
        ...ownerState,
        fetching: false,
        path: '',
        files: [],
        drives: [],
      }
    }
  }
}


export default function librariesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  if (handler) {
    return handler(state, action.payload)
  }

  return state
}
