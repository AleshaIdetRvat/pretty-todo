import { BrowserRouter, Routes, Route } from "react-router-dom"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route index element={<TodoList />} /> */}
                {/* <Route path='teams' element={<Teams />}/> */}
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
