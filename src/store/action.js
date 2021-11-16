import { CHNAGE_TITLE, CHNAGE_USER_LIST  } from './constants'
import { request } from '../api/request'

export const changeTitle = (title) => {
    return { type: CHNAGE_TITLE, title }
}

export const changeUserList = (userList) => {
    return { type: CHNAGE_USER_LIST, userList }
}

export const getTitle = () => {
    return async (dispatch) => {
        const res = await request('/list')
        dispatch(changeTitle(res.title))
    }
}

export const getUserList = () => {
    return async (dispatch) => {
        const res = await request('/userList')
        dispatch(changeUserList(res.list))
    }
}