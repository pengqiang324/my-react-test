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
            publicDir: false,
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

        if(url.indexOf('.')>-1) { 
            // if (url.endsWith('.jsx')) {
            //     // js需要做额外的处理，所以不是简单的静态资源
            //     const  p = resolve(url.slice(1))
            //     const ret = await fsp.readFile(p, 'utf8')
            //     console.log(ret)
            //     // ctx.body = rewriteImport(ret)
            //     // res.setHeader('Content-Type', 'application/javascript')
            //     // res.end('')
            // } else {
            //     res.end(''); 
            // }
            res.end(''); 
            return false;
        }
        
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
            
            const renderContent = await render(url)
            let html = template.replace('<!--app-html-->', renderContent.html)
                               .replace('<!--inject-store-->', renderContent.script)
                               .replace('/*app-css*/', renderContent.css)
                               .replace('<!--app-header-->', renderContent.header)
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