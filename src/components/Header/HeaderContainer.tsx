import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import { Header } from "./Header"
import TodoHeaderImage from "../../assets/images/TodoPageWall.png"
import ThemesHeaderImage from "../../assets/images/ThemesPageWall.png"

const HeaderContainer: FC = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <Header
                        imgElem={
                            <img
                                className='header__image'
                                src={TodoHeaderImage}
                                alt='header'
                            />
                        }
                        title="What's up, Dude!"
                        backgroundColor='var(--brightPurple)'
                    />
                }
            />
            <Route
                path='/themes'
                element={
                    <Header
                        imgElem={
                            <img
                                style={{ padding: "30px 20px 10px" }}
                                className='header__image'
                                src={ThemesHeaderImage}
                                alt='header'
                            />
                        }
                        title='For every taste'
                        backgroundColor='var(--green)'
                    />
                }
            />
        </Routes>
    )
}

export { HeaderContainer }
