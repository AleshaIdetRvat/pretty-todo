import { FC, useCallback, useEffect, useRef } from "react"
// import { usePrevious } from "../../../hooks/usePrevious"
// import { useThrottle } from "../../../hooks/useThrottle"
import "./ComponentWithSwipe.css"

type Side = "left" | "right"
interface Props {
    ratioWhenSideOpen: number
    sideWidth: number
    children: React.ReactNode
    side: Side
}

function getMultiplier(side: Side): number {
    if (side === "left") return -1
    else return 1
}

const ComponentWithSwipe: FC<Props> = (props) => {
    console.log("ComponentWithSwipe render")

    const { ratioWhenSideOpen, sideWidth, children, side } = props

    const bodyRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const prevClientXRef = useRef<number>()
    const translateXRef = useRef<number>()

    // todo:
    // (+) авто доводка
    // (+) функционал работы с разными сторонами
    // (?) ratioWhenSideOpen
    // (-) добавить параметры

    useEffect(() => {
        if (bodyRef.current && containerRef.current) {
            translateXRef.current = sideWidth
            if (side === "left") {
                translateXRef.current = sideWidth
                bodyRef.current.style.transform = `translateX(${-sideWidth}px)`
            } else {
                translateXRef.current = 0
            }

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
            const { clientX } = e.targetTouches[0]

            if (prevClientXRef.current === undefined) return

            if (side === "left") {
                const different =
                    prevClientXRef.current + getMultiplier(side) * clientX

                if (translateXRef.current !== undefined && bodyRef.current) {
                    let hasIgnoreMove: boolean =
                        translateXRef.current + different > sideWidth ||
                        translateXRef.current + different <= 0

                    if (hasIgnoreMove) return

                    console.log("different", different)

                    translateXRef.current +=
                        getMultiplier(side) * -1 * different

                    bodyRef.current.style.transform = `translateX(${
                        getMultiplier(side) * translateXRef.current
                    }px)`

                    prevClientXRef.current = clientX
                }
            } else {
                const different = prevClientXRef.current - clientX
                console.log("different :>> ", different)

                if (translateXRef.current !== undefined && bodyRef.current) {
                    let hasIgnoreMove: boolean =
                        translateXRef.current + different >= sideWidth ||
                        translateXRef.current + different <= 0
                    console.log("translateXRef.current", translateXRef.current)
                    console.log("sideWidth:>> ", sideWidth)

                    if (hasIgnoreMove) return

                    translateXRef.current += different

                    bodyRef.current.style.transform = `translateX(${-translateXRef.current}px)`

                    prevClientXRef.current = clientX
                }
            }
        },
        [sideWidth, side]
    )

    const automaticCloser = useCallback(() => {
        if (!bodyRef.current) return
        // if (side === "left") {
        if (
            translateXRef.current !== undefined &&
            translateXRef.current < sideWidth * ratioWhenSideOpen
        ) {
            bodyRef.current.style.transform = "translateX(0px)"
            translateXRef.current = 0
        } else {
            bodyRef.current.style.transform = `translateX(${
                -sideWidth
                // getMultiplier(side) * sideWidth
            }px)`
            translateXRef.current = sideWidth
        }
        // } else {
        //     if (
        //         translateXRef.current !== undefined &&
        //         translateXRef.current < sideWidth * ratioWhenSideOpen
        //     ) {
        //         bodyRef.current.style.transform = "translateX(0px)"
        //         translateXRef.current = 0
        //     } else {
        //         bodyRef.current.style.transform = `translateX(${-sideWidth}px)`
        //         translateXRef.current = sideWidth
        //     }
        // }
    }, [sideWidth, side, ratioWhenSideOpen])

    const touchEndHandler: React.TouchEventHandler<HTMLElement> =
        automaticCloser

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
