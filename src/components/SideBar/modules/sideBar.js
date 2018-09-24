export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const TOGGLE_DETAILS = 'TOGGLE_DETAILS'
export const RESIZED_WINDOW = 'RESIZED_WINDOW'
export const SIDEBAR_WIDTH = 360
export const MOBILE_WIDTH = 576

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  }
}

export function toggleAudioDetails() {
  return {
    type: TOGGLE_DETAILS
  }
}

export function resizedWindow() {
  return {
    type: RESIZED_WINDOW
  }
}

const initialState = {
  isOpen: true,
  mobile: ((typeof window === 'undefined' ? 1200 : window.innerWidth) - SIDEBAR_WIDTH) <= MOBILE_WIDTH,
  isDetailsOpen: true
}

// TODO: replace window.width hack with something normal
export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      let contentWidth = (typeof window === 'undefined' ? 1200 : window.innerWidth) - (!state.isOpen ? SIDEBAR_WIDTH : 0)
      return {...state, isOpen: !state.isOpen, mobile: contentWidth <= MOBILE_WIDTH}
    case TOGGLE_DETAILS:
      //let contentWidth = window.innerWidth - (!state.isOpen ? SIDEBAR_WIDTH : 0)
      return {...state, isDetailsOpen: !state.isDetailsOpen}
    case RESIZED_WINDOW:
      let contentInnerWidth = (typeof window === 'undefined' ? 1200 : window.innerWidth) - (state.isOpen ? SIDEBAR_WIDTH : 0)
      return {...state, mobile: contentInnerWidth <= MOBILE_WIDTH}
  }
  return state
}
