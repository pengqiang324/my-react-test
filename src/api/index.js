import { request } from "../api/request"

export const getTitle = function() {
    return function(dispatch) {
        request('/list')
        .then((res) => {
            const { title } = res
            dispatch({ type: 'change_title', title })
        })
    }
}