import React from "react"
import { FC, useState } from "react"
import { ComponentWithSwipe } from "./ComponentWithSwipe/ComponentWithSwipe"

type Side = "left" | "right"

interface Props {
    ratioWhenSideOpen?: number
    sideWidth: number
    children: React.ReactNode
    side: Side
}

export const useSwipeable = (isSideOpenInit: boolean = false) => {
    const [isSideOpen, setIsSideOpen] = useState(isSideOpenInit)

    const withSetIsSide: FC<Props> = (props) => (
        <ComponentWithSwipe
            {...props}
            setIsSideOpen={setIsSideOpen}
            isSideOpen={isSideOpen}
        />
    )

    return [withSetIsSide, isSideOpen, setIsSideOpen] as [
        FC<Props>,
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
    ]
}
