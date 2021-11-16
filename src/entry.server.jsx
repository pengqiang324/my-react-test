import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { matchRoutes } from 'react-router-dom'
import { routes } from './Route.jsx'
import createStore from './store/index'
import { Provider } from 'react-redux'
import App from './App'

const store = createStore()

const loadBranchData = async (url) => {
    const branch = matchRoutes(routes, url)
    branch && branch[branch.length-1].route.loadData ? 
      await branch[branch.length-1].route.loadData(store) : null
}
export async function render(url) {
    await loadBranchData(url)
    return ReactDOMServer.renderToString(
        <React.StrictMode>
            <Provider store={store}>
                <StaticRouter location={url}>
                    <App/>
                </StaticRouter>
            </Provider>
        </React.StrictMode>
    )
}