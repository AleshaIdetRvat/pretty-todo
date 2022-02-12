import { useMemo, useRef } from "react"
import { NavLink } from "react-router-dom"
import avatar from "../../assets/images/dude.png"
import { TasksIcon, ThemesIcon, InfoIcon } from "../UI/Icons"
import "./Menu.css"

interface MenuOption {
    id: number
    pathTo: string
    Icon: () => JSX.Element
    text: string
}

const menuOptions: MenuOption[] = [
    {
        id: 0,
        pathTo: "/",
        Icon: TasksIcon,
        text: "Tasks",
    },
    {
        id: 1,
        pathTo: "/themes",
        Icon: ThemesIcon,
        text: "Themes",
    },
    {
        id: 2,
        pathTo: "/about",
        Icon: InfoIcon,
        text: "About",
    },
]

const Menu = () => {
    const selectPointerRef = useRef<HTMLDivElement>()

    const getNavItemClassNameHandler =
        (id: number) =>
        ({ isActive }: { isActive: boolean }): string => {
            if (selectPointerRef.current && isActive) {
                selectPointerRef.current.style.transform = `translateY(${
                    id * 12
                }vw)`
            }
            return isActive
                ? "options-list__link --active"
                : "options-list__link"
        }

    const mapMenuOptions = ({ id, pathTo, Icon, text }: MenuOption) => {
        return (
            <li className='options-list__item' key={id}>
                <NavLink className={getNavItemClassNameHandler(id)} to={pathTo}>
                    <Icon />
                    <p>{text}</p>
                </NavLink>
            </li>
        )
    }

    const menuOptionsElements = useMemo(
        () => (
            <ul className='options-list'>{menuOptions.map(mapMenuOptions)}</ul>
        ),
        []
    )

    return (
        <aside className='menu'>
            <div className='menu__body'>
                <div className='menu__photo-container'>
                    <img className='menu__photo' src={avatar} alt='avatar' />
                </div>
                <div className='menu__profile-names'>
                    <h3>Some</h3>
                    <h3>Dude</h3>
                </div>
                <div className='menu__options'>
                    <div
                        className='options-list__select-pointer'
                        ref={selectPointerRef}
                    />
                    {menuOptionsElements}
                </div>
            </div>
        </aside>
    )
}

export { Menu }
