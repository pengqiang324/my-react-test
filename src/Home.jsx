import { request } from './api/request'
function Home() {
    return (
        <div>这是 Home 页面</div>
    )
}

Home.getInitData = async () => {
    const res = await request('/list')
    return res
}

export default Home