import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const store = (initState) => {
    return createStore(reducer, initState, applyMiddleware(thunk))
}
export default store