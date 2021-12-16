import { FC, useCallback, useEffect, useRef } from "react"
import "./ComponentWithSwipe.css"

type Side = "left" | "right"

interface Props {
    ratioWhenSideOpen?: number
    sideWidth: number
    children: React.ReactNode
    side: Side
    onOpen?: Function
    onClose?: Function
}

function getMultiplier(side: Side): number {
    if (side === "left") return -1
    else return 1
}

const ComponentWithSwipe: FC<Props> = (props) => {
    console.log("ComponentWithSwipe render")
    const {
        ratioWhenSideOpen = 0.5,
        sideWidth,
        children,
        side,
        onClose,
        onOpen,
    } = props

    const bodyRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const prevClientXRef = useRef<number>()
    const translateXRef = useRef<number>()

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

                    translateXRef.current +=
                        getMultiplier(side) * -1 * different

                    bodyRef.current.style.transform = `translateX(${
                        getMultiplier(side) * translateXRef.current
                    }px)`

                    prevClientXRef.current = clientX
                }
            } else {
                const different = prevClientXRef.current - clientX

                if (translateXRef.current !== undefined && bodyRef.current) {
                    let hasIgnoreMove: boolean =
                        translateXRef.current + different >= sideWidth ||
                        translateXRef.current + different <= 0

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
        if (!bodyRef.current || !(translateXRef.current !== undefined)) return

        if (translateXRef.current < sideWidth - sideWidth * ratioWhenSideOpen) {
            bodyRef.current.style.transform = "translateX(0px)"

            if (Math.abs(translateXRef.current) > 5) {
                if (side === "left") {
                    onOpen()
                } else {
                    onClose()
                }
            }

            translateXRef.current = 0
        } else {
            bodyRef.current.style.transform = `translateX(${-sideWidth}px)`

            if (Math.abs(translateXRef.current - sideWidth) > 5) {
                if (side === "left") {
                    onClose()
                } else {
                    onOpen()
                }
            }

            translateXRef.current = sideWidth
        }
    }, [sideWidth, ratioWhenSideOpen])

    const touchEndHandler: React.TouchEventHandler<HTMLElement> =
        automaticCloser

    return (
        <div className='container-with-swipe' ref={containerRef}>
            <div
                className='container-with-swipe__body'
                ref={bodyRef}
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}
            >
                {children}
            </div>
        </div>
    )
}

export { ComponentWithSwipe }
