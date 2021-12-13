import { useCallback, useRef } from "react"

export function useThrottle(callback: any, delay: number) {
    const isThrottled = useRef<boolean>(false)

    const throttledCallback = useCallback<(...args: any[]) => any>(
        (...args) => {
            if (isThrottled.current) return

            callback(...args)
            isThrottled.current = true
            setTimeout(() => {
                isThrottled.current = false
            }, delay)
        },
        [callback, delay]
    )

    return throttledCallback
}
