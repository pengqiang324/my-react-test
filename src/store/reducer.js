import { CHNAGE_TITLE, CHNAGE_USER_LIST } from './constants'
const initState = {
    title: '',
    userList: []
}

export default (state = initState, action) => {
    switch(action.type) {
        case CHNAGE_TITLE:
            return {
                ...state,
                title: action.title
            }
        case CHNAGE_USER_LIST: 
            return {
                ...state,
                userList: action.userList
            }
        default:
            return { ...state }
    }
}