import { useEffect, useRef, useState } from "react"
import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"

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
            <ComponentWithSwipe ratioWhenSideOpen={0.5} sideWidth={asideWidth}>
                <aside
                    ref={asideRef}
                    style={{ background: "var(--brightCyan)" }}
                    className='app__menu'
                >
                    asideasideasideaside
                </aside>
                <div
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
