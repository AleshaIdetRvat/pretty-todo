import { FC, useCallback, useEffect, useRef } from "react"
import "./ComponentWithSwipe.css"

type Side = "left" | "right"
interface Style {
    [key: string]: number | string
}
interface Props {
    children: React.ReactNode
    ratioWhenSideOpen?: number
    sideWidth: number
    side: Side
    withDelay?: boolean
    transition?: number
    autoTransition?: number

    onOpen?: Function
    onClose?: Function
    onTouchStart?: Function
    onTouchEnd?: Function
    style?: Style
}

function getMultiplier(side: Side): number {
    if (side === "left") return -1
    else return 1
}

const ComponentWithSwipe: FC<Props> = (props) => {
    const {
        ratioWhenSideOpen = 0.5,
        sideWidth,
        children,
        side,
        withDelay = false,
        transition = 0.1,
        autoTransition = 0.5,
        onClose,
        onOpen,
        onTouchStart,
        onTouchEnd,
        style = {},
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
            // bodyRef.current.style.transition = `${autoTransition}s`

            containerRef.current.style.width = `${bodyRef.current.offsetWidth}px`

            bodyRef.current.style.width = `${
                bodyRef.current.offsetWidth + sideWidth
            }px`
        }
    }, [sideWidth, autoTransition, side])

    const touchStartHandler: React.TouchEventHandler<HTMLElement> = (e) => {
        bodyRef.current.style.transition = `${transition}s`
        prevClientXRef.current = e.targetTouches[0].clientX
        onTouchStart && onTouchStart()
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

                    if (!withDelay || sideWidth - translateXRef.current > 40) {
                        bodyRef.current.style.transform = `translateX(${
                            getMultiplier(side) * translateXRef.current
                        }px)`
                    }

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

                    if (!withDelay || sideWidth - translateXRef.current > 40) {
                        bodyRef.current.style.transform = `translateX(${-translateXRef.current}px)`
                    }

                    prevClientXRef.current = clientX
                }
            }
        },
        [sideWidth, side, withDelay]
    )

    const automaticCloser = useCallback(() => {
        onTouchEnd && onTouchEnd()
        if (!bodyRef.current || !(translateXRef.current !== undefined)) return
        bodyRef.current.style.transition = `${autoTransition}s`

        if (translateXRef.current < sideWidth - sideWidth * ratioWhenSideOpen) {
            bodyRef.current.style.transform = "translateX(0px)"

            if (Math.abs(translateXRef.current) > 5) {
                if (side === "left") {
                    onOpen && onOpen()
                } else {
                    onClose && onClose()
                }
            }

            translateXRef.current = 0
        } else {
            bodyRef.current.style.transform = `translateX(${-sideWidth}px)`

            if (Math.abs(translateXRef.current - sideWidth) > 5) {
                if (side === "left") {
                    onClose && onClose()
                } else {
                    onOpen && onOpen()
                }
            }

            translateXRef.current = sideWidth
        }
    }, [
        sideWidth,
        ratioWhenSideOpen,
        onClose,
        onOpen,
        side,
        autoTransition,
        onTouchEnd,
    ])

    const touchEndHandler: React.TouchEventHandler<HTMLElement> =
        automaticCloser

    return (
        <div className='container-with-swipe' style={style} ref={containerRef}>
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
