import { motion } from "framer-motion"
import "./SwipeIcon.css"

const transition = { duration: 0.8, ease: "easeInOut" }

const SwipeIcon = () => {
    return (
        <motion.svg
            width='60'
            height='30'
            viewBox='0 0 100 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='swipe-icon'
            // initial={{ translateX: "10%" }}
            // animate={{ translateX: "0%" }}
            // transition={svgTransition}
        >
            <motion.path
                initial={{ pathLength: 0.2, opacity: 0.5 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={transition}
                d='M31 6.97918C28.6242 4.60169 25.5973 2.9826 22.302 2.32665C19.0066 1.6707 15.591 2.00736 12.4869 3.29405C9.38274 4.58074 6.7296 6.75967 4.86296 9.55531C2.99632 12.3509 2 15.6377 2 19C2 22.3623 2.99632 25.6491 4.86296 28.4447C6.72961 31.2403 9.38274 33.4192 12.4869 34.7059C15.591 35.9926 19.0067 36.3293 22.302 35.6733C25.5973 35.0174 28.6242 33.3983 31 31.0208'
                stroke='var(--black)'
                strokeWidth='4'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <motion.path
                initial={{ opacity: 0, translateX: "20%" }}
                animate={{ opacity: 1, translateX: "0%" }}
                transition={transition}
                d='M16 17C14.8954 17 14 17.8954 14 19C14 20.1046 14.8954 21 16 21V17ZM70.4142 20.4142C71.1953 19.6332 71.1953 18.3668 70.4142 17.5858L57.6863 4.85786C56.9052 4.07682 55.6389 4.07682 54.8579 4.85786C54.0768 5.63891 54.0768 6.90524 54.8579 7.68629L66.1716 19L54.8579 30.3137C54.0768 31.0948 54.0768 32.3611 54.8579 33.1421C55.6389 33.9232 56.9052 33.9232 57.6863 33.1421L70.4142 20.4142ZM16 21H69V17H16V21Z'
                fill='var(--black)'
            />
        </motion.svg>
    )
}

export { SwipeIcon }
