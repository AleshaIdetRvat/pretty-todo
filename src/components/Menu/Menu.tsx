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
                                <svg
                                    version='1.1'
                                    viewBox='0 0 700 700'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='m518 197.4v-1.3984l-168-91-168 91-53.48 82.738 53.48 29.262v70l168 91 168-91v-70l53.48-29.051-53.059-81.828zm-168 64.262 7-3.7812v-124.88l130.62 70.77-127.89 69.23-9.7305 5.5312-137.62-74.762 130.62-70.77v124.88zm-156.59-44.238 141.26 76.578-36.891 52.711-139.3-75.531zm9.5898 101.78 101.22 54.949 35-50.398v116.06l-136.22-73.988zm294 46.621-136.5 73.988v-115.99l35 50.398 101.5-55.02zm-94.781-19.039-36.891-52.781 141.19-77 35 53.762z' />
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
                                to='/about'
                            >
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
