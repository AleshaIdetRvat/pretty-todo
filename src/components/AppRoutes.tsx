import { Routes, Route } from "react-router-dom"
import { HeaderContainer } from "./Header/HeaderContainer"
import { ThemesPage } from "./ThemesPage/ThemesPage"
import { TodoPage } from "./TodoPage/TodoPage"

const AppRoutes = () => {
    return (
        <>
            <HeaderContainer />
            <div className='app__content'>
                <Routes>
                    <Route index element={<TodoPage />} />
                    <Route path='themes' element={<ThemesPage />} />
                </Routes>
            </div>
        </>
    )
}

export { AppRoutes }
