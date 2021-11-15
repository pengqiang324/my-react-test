import * as React from 'react'
import MyRoute from './Route.jsx'

function App(props) {
  return (
    // <Routes>
    //   <Route exact path="/" element={<Layout/>}>
    //     <Route index element={<Home/>}></Route>
    //     <Route path="about" element={<About/>}></Route>
    //   </Route>
    // </Routes>
    <MyRoute {...props}/>
  )
}

export default App;
