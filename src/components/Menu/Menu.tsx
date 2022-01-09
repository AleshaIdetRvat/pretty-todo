import "./Menu.css"
import { NavLink } from "react-router-dom"
import avatar from "../../assets/images/dude.png"
const Menu = () => {
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
                    <ul className='options-list'>
                        <li className='options-list__item'>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "options-list__link --active"
                                        : "options-list__link"
                                }
                                to='/'
                            >
                                <svg viewBox='0 0 24 24'>
                                    <path d='M4 3C2.89 3 2 3.89 2 5V9C2 10.11 2.89 11 4 11H8C9.11 11 10 10.11 10 9V5C10 3.89 9.11 3 8 3M8.2 4.5L9.26 5.55L5.27 9.5L2.74 6.95L3.81 5.9L5.28 7.39M4 13C2.89 13 2 13.89 2 15V19C2 20.11 2.89 21 4 21H8C9.11 21 10 20.11 10 19V15C10 13.89 9.11 13 8 13M4 15H8V19H4M12 5H22V7H12M12 19V17H22V19M12 11H22V13H12Z' />
                                </svg>

                                <p>Tasks</p>
                            </NavLink>
                        </li>
                        <li className='options-list__item'>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "options-list__link --active"
                                        : "options-list__link"
                                }
                                to='/themes'
                            >
                                <svg viewBox='0 0 24 24'>
                                    <path d='M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z' />
                                </svg>

                                <p>Themes</p>
                            </NavLink>
                        </li>
                        <li className='options-list__item'>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "options-list__link --active"
                                        : "options-list__link"
                                }
                                to='/about'
                            >
                                <svg viewBox='0 0 24 24'>
                                    <path d='M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z' />
                                </svg>
                                <p>About</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export { Menu }
