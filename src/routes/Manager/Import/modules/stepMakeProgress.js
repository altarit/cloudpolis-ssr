import { fetchGet, fetchPost } from '../../../../modules/apiUtils'

export const IMPORT_GET_PROGRESS_REQUEST = 'IMPORT_GET_PROGRESS_REQUEST'
export const IMPORT_GET_PROGRESS_SUCCESS = 'IMPORT_GET_PROGRESS_SUCCESS'
export const IMPORT_GET_PROGRESS_FAILURE = 'IMPORT_GET_PROGRESS_FAILURE'

export const IMPORT_EXTRACT_REQUEST = 'IMPORT_EXTRACT_REQUEST'
export const IMPORT_EXTRACT_SUCCESS = 'IMPORT_EXTRACT_SUCCESS'
export const IMPORT_EXTRACT_FAILURE = 'IMPORT_EXTRACT_FAILURE'

export const IMPORT_START_PROCESSING_METADATA_REQUEST = 'IMPORT_START_PROCESSING_METADATA_REQUEST'
export const IMPORT_START_PROCESSING_METADATA_SUCCESS = 'IMPORT_START_PROCESSING_METADATA_SUCCESS'
export const IMPORT_START_PROCESSING_METADATA_FAILURE = 'IMPORT_START_PROCESSING_METADATA_FAILURE'

export function checkProgress (importSessionId, libraryName) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_GET_PROGRESS_REQUEST,
      payload: {}
    })

    return fetchGet(`/manager/imports/${importSessionId}/metadata/progress`)
      .then(({ data }) => {
        dispatch({
          type: IMPORT_GET_PROGRESS_SUCCESS,
          payload: {
            tracksCompleted: data.tracksCompleted
          }
        })
      })
  }
}

export function saveTracks (importSessionId) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_EXTRACT_REQUEST,
      payload: {}
    })

    let params = {
      body: JSON.stringify({
        //importSessionId: importSessionId,
      })
    }
    return fetchPost(`/manager/imports/${importSessionId}/extract`, params)
      .then(({ data }) => {
        dispatch({
          type: IMPORT_EXTRACT_SUCCESS,
          payload: {
            completedTracks: data.completedTracks
          }
        })
      })
  }
}

export function startProcessingMetadata (importSessionId) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_START_PROCESSING_METADATA_REQUEST,
      payload: {}
    })

    const params = {
      body: JSON.stringify({})
    }
    return fetchPost(`/manager/imports/${importSessionId}/metadata`, params)
      .then(({ data }) => {
        const { status } = data

        dispatch({
          type: IMPORT_START_PROCESSING_METADATA_SUCCESS,
          payload: {
            status
          }
        })
      })
  }
}

export const stepMakeProgressHandlers = {
  [IMPORT_START_PROCESSING_METADATA_REQUEST]: (state ) => {
    return {
      ...state,
      fetching: true,
    }
  },
  [IMPORT_START_PROCESSING_METADATA_SUCCESS]: (state, { status }) => {
    return {
      ...state,
      fetching: false,
      session: {...state.session, status}
    }
  },
  [IMPORT_START_PROCESSING_METADATA_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
  [IMPORT_GET_PROGRESS_REQUEST]: (state, { importSessionId }) => {
    return {
      ...state,
      fetching: true,
    }
  },
  [IMPORT_GET_PROGRESS_SUCCESS]: (state, { tracksCompleted }) => {
    return {
      ...state,
      fetching: false,
      tracksCompleted: tracksCompleted
    }
  },
  [IMPORT_GET_PROGRESS_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  },
  [IMPORT_EXTRACT_REQUEST]: (state, {}) => {
    return {
      ...state,
      fetching: true,
    }
  },
  [IMPORT_EXTRACT_SUCCESS]: (state, {}) => {
    return {
      ...state,
      fetching: false,
    }
  },
  [IMPORT_EXTRACT_FAILURE]: (state) => {
    return {
      ...state,
      fetching: false,
    }
  }
}


