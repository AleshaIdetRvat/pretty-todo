import { Routes, Route } from "react-router-dom"
import { Header } from "./Header"
import TodoHeaderImage from "../../assets/images/TodoPageWall.png"

const HeaderContainer = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <Header
                        imgSrc={TodoHeaderImage}
                        title="What's up, Dude!"
                        backgroundColor='var(--brightPurple)'
                    />
                }
            />
            {/* <Route path='/about' element={<Header />} /> */}
        </Routes>
    )
}

export { HeaderContainer }
