import { AppRoutes } from "../AppRoutes"
import { Menu } from "../Menu/Menu"
import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"
import "./App.css"

function App() {
    console.log("App component render")

    return (
        <main className='app'>
            <ComponentWithSwipe
                onOpen={() => console.log("open")}
                onClose={() => console.log("close")}
                side='left'
                sideWidth={250}
                withDelay={true}
                transition={0.4}
            >
                <Menu />
                <div className='app__body'>
                    <AppRoutes />
                </div>
            </ComponentWithSwipe>
        </main>
    )
}

export default App
