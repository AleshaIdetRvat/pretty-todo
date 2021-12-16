import { FC } from "react"
import TodoHeaderImage from "../../assets/images/TodoPageWall.png"
import { SwipeIcon } from "../UI/Icons/SwipeIcon/SwipeIcon"
import "./Header.css"

interface Props {
    title: string //  (!)
    imgSrc: string // (!)
    backgroundColor: string
}

const Header: FC<Props> = (props) => {
    const { title, imgSrc, backgroundColor } = props

    return (
        <header className='header' style={{ backgroundColor: backgroundColor }}>
            <div className='header__body'>
                <div className='header__swipe-icon'>
                    <SwipeIcon />
                </div>
                <div className='header__image-container'>
                    <img className='header__image' src={imgSrc} />
                </div>

                <h1 className='header__title'>{title}</h1>
            </div>
        </header>
    )
}

export { Header }
