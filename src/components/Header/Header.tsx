import { FC } from "react"
import { SwipeIcon } from "../UI/Icons/SwipeIcon/SwipeIcon"
import "./Header.css"

interface Props {
    title: string
    imgElem: React.ReactNode
    backgroundColor: string
}

const Header: FC<Props> = (props) => {
    const { title, imgElem, backgroundColor } = props

    return (
        <header className='header' style={{ backgroundColor: backgroundColor }}>
            <div className='header__body'>
                <div className='header__swipe-icon'>
                    <SwipeIcon />
                </div>
                <div className='header__image-container'>{imgElem}</div>

                <h1 className='header__title'>{title}</h1>
            </div>
        </header>
    )
}

export { Header }
