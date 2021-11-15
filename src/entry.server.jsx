import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { matchRoutes } from 'react-router-dom'
import { routes } from './Route.jsx'
import App from './App'

const loadBranchData = async (url) => {
    // const branch = matchRoutes(routes, url)
    // const data = branch[1]?.route.loadData ? await branch[1].route.loadData() : null
    // // console.log(data)
    // return data
}
export function render(url) {
    // const data = loadBranchData(url)
    return ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                <App/>
            </StaticRouter>
        </React.StrictMode>
    )
}