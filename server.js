let path = require('path')
let fsp = require("fs/promises");
let express = require("express");

let root = process.cwd();
let isProduction = process.env.NODE_ENV === "production";

function resolve(p) {
    return path.resolve(__dirname, p);
}

async function createServer() {
    let app = express()
    let vite

    if (!isProduction) {
        vite = await require('vite').createServer({
            root,
            server: { middlewareMode: 'ssr' }
        })
        app.use(vite.middlewares)
    } else {
        app.use(require('compression')())
        app.use(express.static(resolve('dist/client')))
    }

    app.use('*', async (req, res) => {
        let url = req.originalUrl

        if(url.indexOf('.')>-1) { res.end(''); return false;}
        
        try {
            let template
            let render

            if (!isProduction) {
                template = await fsp.readFile(resolve('public/index.html'), 'utf8')
                template = await vite.transformIndexHtml(url, template)
                render = await vite.ssrLoadModule('src/entry.server.jsx')
                                .then(m => m.render)
            } else {
                template = await fsp.readFile(
                    resolve('dist/client/index.html'),
                    'utf8'
                    )
                render = require(resolve('dist/server/entry.server.jsx')).render
            }
            
            let html = template.replace('<!--app-html-->', render(url))
            console.log(html, 11)
            res.setHeader('Content-Type', 'text/html')
            return res.status(200).end(html)
        } catch(err) {
            if (!isProduction) {
                vite.ssrFixStacktrace(err)
            }
            console.log(err.stack)
            res.status(500).end(err.stack)
        }
    })

    return app
}

createServer().then(app => {
    app.listen(8088, () => {
        console.log("HTTP server is running at http://localhost:8088")
    })
})