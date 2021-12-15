import { useEffect, useRef, useState } from "react"
import { useSwipeable } from "../../hooks/useSwipeable/useSwipeable"

function Content() {
    const [ComponentWithSwipe, isMenuOpen, setIsMenuOpen] = useSwipeable()

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
                sideWidth={asideWidth}
                // ratioWhenSideOpen={0.5}
            >
                <aside
                    className='app__menu'
                    ref={asideRef}
                    style={{
                        background: "var(--brightCyan)",
                    }}
                >
                    app menu
                </aside>
                <div
                    className='app__main'
                    style={{
                        background: "var(--brightBlack)",
                        flex: "1 0 100%",
                    }}
                >
                    App content
                </div>
            </ComponentWithSwipe>
        </div>
    )
}

export { Content }
