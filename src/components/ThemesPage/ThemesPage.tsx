import { FC } from "react"
import { Theme } from "../../types/Theme"
import "./ThemesPage.css"

const themes: Theme[] = [
    { name: "default", isDark: false },
    { name: "github", isDark: true },
    { name: "fideloper", isDark: true },
    { name: "atomone-light", isDark: false },
    { name: "bright-lights", isDark: false },
]

interface ThemePalletProps {
    themeName: string
}
const ThemePallet: FC<ThemePalletProps> = ({ themeName }) => {
    return (
        <div className={`theme-pallet theme-${themeName}`}>
            <span className='theme-pallet__name'>{themeName}</span>

            <div
                className='theme-pallet__color'
                style={{ backgroundColor: "var(--white)" }}
            />
            <div
                className='theme-pallet__color'
                style={{ backgroundColor: "var(--black)" }}
            />
            <div
                className='theme-pallet__color'
                style={{ backgroundColor: "var(--brightPurple)" }}
            />
            <div
                className='theme-pallet__color'
                style={{ backgroundColor: "var(--brightCyan)" }}
            />
        </div>
    )
}

const ThemesPage: FC = () => {
    return (
        <div className='themes-page'>
            <div className='themes-page__body'>
                <div className='themes-page__item themes-list'>
                    <h3 className='themes-list__title'>
                        <svg
                            className='themes-list__icon'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <path d='M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z' />
                        </svg>
                        Light themes{" "}
                    </h3>
                    <div className='themes-list__column'>
                        {" "}
                        {themes
                            .filter(({ isDark }) => !isDark)
                            .map(({ name }) => (
                                <ThemePallet themeName={name} />
                            ))}
                    </div>
                </div>
                <div className='themes-page__item themes-list'>
                    <h3 className='themes-list__title'>
                        <svg
                            className='themes-list__icon'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <path d='M12.01 12c0-3.57 2.2-6.62 5.31-7.87.89-.36.75-1.69-.19-1.9-1.1-.24-2.27-.3-3.48-.14-4.51.6-8.12 4.31-8.59 8.83C4.44 16.93 9.13 22 15.01 22c.73 0 1.43-.08 2.12-.23.95-.21 1.1-1.53.2-1.9-3.22-1.29-5.33-4.41-5.32-7.87z' />
                        </svg>
                        Dark themes{" "}
                    </h3>
                    <div className='themes-list__column'>
                        {" "}
                        {themes
                            .filter(({ isDark }) => isDark)
                            .map(({ name }) => (
                                <ThemePallet themeName={name} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ThemesPage }
