import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { getAppThemeClassName } from "../../localStorage"
import { AppRoutes } from "../AppRoutes"
import { Menu } from "../Menu/Menu"
import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"
import "./App.css"

function App() {
    useEffect(() => {
        const savedThemeClass = getAppThemeClassName()
        document.body.classList.add(savedThemeClass)
    }, [])

    return (
        <BrowserRouter>
            <main className='app'>
                <ComponentWithSwipe
                    side='left'
                    sideWidth={250}
                    withDelay={true}
                    transition={0.3}
                    autoTransition={0.3}
                >
                    <Menu />
                    <div className='app__body'>
                        <AppRoutes />
                    </div>
                </ComponentWithSwipe>
            </main>
        </BrowserRouter>
    )
}

export default App
