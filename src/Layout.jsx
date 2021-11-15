import { Outlet, NavLink } from 'react-router-dom'

function Layout() {
    return (
      <>
        <ul>
          <li><NavLink to="/">首页</NavLink></li>
          <li><NavLink to="/about/2">关于我们</NavLink></li>
        </ul>
        <Outlet/>
      </>
    )
}

export default Layout