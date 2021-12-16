import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"
import { SwipeIcon } from "../UI/Icons/SwipeIcon/SwipeIcon"
import "./App.css"

function App() {
    return (
        <main className='app'>
            <ComponentWithSwipe
                onOpen={() => console.log("open")}
                onClose={() => console.log("close")}
                side='left'
                sideWidth={250}
            >
                <aside className='app__menu'>app menu</aside>

                <div className='app__content'>
                    <SwipeIcon />
                    App content
                </div>
            </ComponentWithSwipe>
        </main>
    )
}

export default App
