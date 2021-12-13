import { FC, useCallback, useEffect, useRef } from "react"
import { usePrevious } from "../../../hooks/usePrevious"
import { useThrottle } from "../../../hooks/useThrottle"
import "./ComponentWithSwipe.css"

type Side = "left" | "right"
interface Props {
    ratioWhenSideOpen: number
    sideWidth: number
    children: React.ReactNode
    side?: Side
}

function getMultiplier(side: Side): number {
    if (side === "left") return -1
    else return 1
}

const ComponentWithSwipe: FC<Props> = (props) => {
    console.log("ComponentWithSwipe render")

    const { ratioWhenSideOpen, sideWidth, children, side = "left" } = props

    const bodyRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const prevClientXRef = useRef<number>()
    const translateXRef = useRef<number>()

    // (-) функционал работы с разными сторонами
    // (-) ratioWhenSideOpen
    // (-) добавить параметры

    useEffect(() => {
        if (bodyRef.current && containerRef.current) {
            translateXRef.current = sideWidth

            bodyRef.current.style.transform = `translateX(${
                getMultiplier(side) * sideWidth
            }px)`

            bodyRef.current.style.gridTemplateColumns =
                side === "left" ? "auto 1fr" : "1fr auto"

            containerRef.current.style.width = `${bodyRef.current.offsetWidth}px`

            bodyRef.current.style.width = `${
                bodyRef.current.offsetWidth + sideWidth
            }px`
        }
    }, [sideWidth, side])

    const touchStartHandler: React.TouchEventHandler<HTMLElement> = (e) => {
        prevClientXRef.current = e.targetTouches[0].clientX
    }

    const touchMoveHandler: React.TouchEventHandler<HTMLElement> = useCallback(
        (e) => {
            // console.log(e.targetTouches[0])
            const { clientX } = e.targetTouches[0]

            if (prevClientXRef.current === undefined) {
                prevClientXRef.current = clientX
                return
            }

            const different =
                prevClientXRef.current + getMultiplier(side) * clientX

            if (translateXRef.current && bodyRef.current) {
                if (
                    translateXRef.current + different > sideWidth ||
                    translateXRef.current + different <= 0
                )
                    return

                translateXRef.current += different

                bodyRef.current.style.transform = `translateX(${
                    getMultiplier(side) * translateXRef.current
                }px)`

                prevClientXRef.current = clientX
            }
        },
        [sideWidth]
    )

    const touchEndHandler: React.TouchEventHandler<HTMLElement> = () => {
        if (bodyRef.current) {
            if (
                translateXRef.current &&
                translateXRef.current < sideWidth * ratioWhenSideOpen
            ) {
                bodyRef.current.style.transform = "translateX(0px)"
            } else {
                bodyRef.current.style.transform = `translateX(${-sideWidth}px)`
            }
        }
    }

    return (
        <div ref={containerRef} className='container-with-swipe'>
            <div
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}
                ref={bodyRef}
                className='container-with-swipe__body'
            >
                {children}
            </div>
        </div>
    )
}

export { ComponentWithSwipe }
