import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HeaderContainer } from "./Header/HeaderContainer"
import { TodoPage } from "./TodoPage/TodoPage"

const AppRoutes = () => {
    console.log("App routes render")

    return (
        <BrowserRouter>
            <HeaderContainer />
            <div className='app__content'>
                <Routes>
                    <Route index element={<TodoPage />} />
                    {/* <Route path='teams' element={<Teams />}/> */}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export { AppRoutes }
