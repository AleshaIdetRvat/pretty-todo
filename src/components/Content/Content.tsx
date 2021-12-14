import { useEffect, useRef, useState } from "react"
import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"

const TestChild = () => {
    console.log("TEST CHILD RENDER")

    return (
        <>
            <span
                style={{
                    background: "red",
                }}
            >
                test
            </span>
            <span
                style={{
                    background: "blue",
                }}
            >
                test
            </span>
            <span
                style={{
                    background: "green",
                }}
            >
                test
            </span>
        </>
    )
}

function Content() {
    const asideRef = useRef<HTMLDivElement>(null)
    const [asideWidth, setAsideWidth] = useState<number>(0)
    useEffect(() => {
        if (asideRef.current) {
            setAsideWidth(asideRef.current.offsetWidth)
        }
    }, [])

    return (
        <div className='app__content'>
            <ComponentWithSwipe
                side='left'
                ratioWhenSideOpen={0.3}
                sideWidth={asideWidth}
            >
                <aside
                    ref={asideRef}
                    style={{
                        background: "var(--brightCyan)",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                    }}
                    className='app__menu'
                >
                    <TestChild />
                </aside>
                <div
                    // ref={asideRef}
                    style={{
                        background: "var(--brightBlack)",
                        flex: "1 0 100%",
                    }}
                    className='app__main'
                >
                    App content
                </div>
            </ComponentWithSwipe>
        </div>
    )
}

export { Content }
