import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { matchRoutes } from 'react-router-dom'
import { routes } from './Route.jsx'
import createStore from './store/index'
import { Provider } from 'react-redux'
import reactProvider from './Context'
import Helmet from 'react-helmet'
import App from './App'

const store = createStore()

const loadBranchData = async (url) => {
    const branch = matchRoutes(routes, url)
    branch && branch[branch.length-1].route.loadData ? 
      await branch[branch.length-1].route.loadData(store) : null
}
export async function render(url) {
    const context = { css: [] }
    await loadBranchData(url)
    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <Provider store={store}>
                <reactProvider.Provider value={context}>
                    <StaticRouter location={url}>
                        <App/>
                    </StaticRouter>
                </reactProvider.Provider>
            </Provider>
        </React.StrictMode>
    )
    const css = context.css.length ? context.css.join('\n') : ''
    const helmet = Helmet.renderStatic()
    const header = [
                        helmet.title.toString(),
                        helmet.meta.toString()
                   ].join('\n')
    return {
        html,
        css,
        header,
        // title: helmet.title.toString()
        script: `<script>window.INITIAL_STATE=${JSON.stringify(store.getState())}</script>`
    }
}