import { FC, useCallback, useEffect, useRef, useState } from "react"
import { usePrevious } from "../../../hooks/usePrevious"
import { useThrottle } from "../../../hooks/useThrottle"
import "./ComponentWithSwipe.css"

interface Props {
    ratioWhenSideOpen: number
    sideWidth: number
    children: React.ReactNode
}

const ComponentWithSwipe: FC<Props> = (props) => {
    const { ratioWhenSideOpen, sideWidth, children } = props

    const bodyRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const prevClientXRef = useRef<number>()
    const translateXRef = useRef<number>()

    useEffect(() => {
        if (bodyRef.current && containerRef.current) {
            translateXRef.current = sideWidth
            bodyRef.current.style.transform = `translateX(-${sideWidth}px)`

            containerRef.current.style.width = `${
                bodyRef.current.offsetWidth - 1
            }px`
            bodyRef.current.style.width = `${
                bodyRef.current.offsetWidth + sideWidth
            }px`
        }
    }, [sideWidth])

    const touchStartHandler: React.TouchEventHandler<HTMLElement> = (e) => {
        console.log("start clientX", e.targetTouches[0].clientX)

        prevClientXRef.current = e.targetTouches[0].clientX
    }

    const touchMoveHandler: React.TouchEventHandler<HTMLElement> = useCallback(
        (e) => {
            // console.log(e.targetTouches[0])
            let prevClientX = prevClientXRef.current
            let translateX = translateXRef.current

            const { clientX } = e.targetTouches[0]

            if (prevClientX === undefined) {
                prevClientX = clientX
                return
            }

            const different = prevClientX - clientX

            if (translateX && translateXRef.current) {
                console.log("translateX + different", translateX + different)
                console.log("sideWidth", sideWidth)

                if (translateX + different > sideWidth) return

                translateXRef.current += different

                if (bodyRef.current) {
                    bodyRef.current.style.transform = `translateX(-${translateXRef.current}px)`
                    // bodyRef.current.style.transform = `translateX(-${translateX}px)`
                }

                prevClientXRef.current = clientX
            }
        },
        [sideWidth]
    )
    // todo: сделать контейнер ограничитель
    const touchEndHandler: React.TouchEventHandler<HTMLElement> = (e) => {
        console.log("touchEnd")

        if (bodyRef.current) {
            if (
                translateXRef.current &&
                translateXRef.current < sideWidth * ratioWhenSideOpen
            ) {
                bodyRef.current.style.transform = "translateX(0px)"
            } else {
                bodyRef.current.style.transform = `translateX(-${sideWidth}px)`
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
