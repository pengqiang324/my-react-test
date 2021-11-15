import { useRoutes } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import About from './About.jsx'

export const routes = [
  {
      path: '/',
      element: <Layout/>,
      exact: true,
      children: [ 
        { 
          index: true, 
          exact: true,
          element: <Home/>,
          loadData: Home.getInitData
        }, 
        {
          path: 'about/:id',
          exact: true,
          element: <About/>
        } 
      ] 
  }
]

function MyRoute(props) {
    let element = useRoutes(routes)
    return element
}


export default MyRoute