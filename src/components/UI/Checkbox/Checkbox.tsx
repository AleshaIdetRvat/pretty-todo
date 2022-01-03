import { FC, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import "./Checkbox.css"

interface CheckboxProps {
    checked: boolean
    onChange: Function
    className?: string
}

export const Checkbox: FC<CheckboxProps> = (props) => {
    const { className = "", checked, onChange } = props
    const pathLength = useMotionValue(0)
    const opacity = useTransform(pathLength, [0.05, 0.3], [0, 1])

    return (
        <label className={"custom-checkbox " + className}>
            <input
                type='checkbox'
                style={{ display: "none" }}
                checked={checked}
                onChange={
                    onChange as React.ChangeEventHandler<HTMLInputElement>
                }
            />

            <motion.div
                className={"custom-checkbox__body"}
                animate={{
                    scale: checked ? 1 : 0.9,
                }}
                transition={{
                    scale: {
                        type: "spring",
                        stiffness: 300,
                        duration: 0.7,
                    },
                }}
            >
                <svg
                    style={{ width: "100%", height: "100%" }}
                    viewBox='0 0 128 116'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <motion.rect
                        x='2'
                        y='3'
                        width='110.375'
                        height='110.375'
                        rx='26'
                        fill='var(--brightCyan)'
                        stroke='var(--brightCyan)'
                        strokeWidth='4'
                        animate={{
                            opacity: checked ? 1 : 0,
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                        }}
                    />
                    <motion.path
                        d='M120 8.5C115.318 10.7703 108.382 15.2768 104 18'
                        stroke='var(--brightCyan)'
                        strokeWidth='17'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        animate={{
                            opacity: checked ? 1 : 0,
                        }}
                        style={{
                            // transform: "translateX(110px)",
                            pathLength: pathLength,
                        }}
                        transition={{
                            opacity: {
                                type: "spring",
                                duration: 0.6,
                            },
                            pathLength: {
                                type: "spring",
                                stiffness: 300,
                                duration: 0.3,
                            },
                        }}
                    />
                    <motion.path
                        d='M28 70.5C42 78 49.5 86 49.5 86C61.625 60.6875 82.5 34.5 104 18'
                        stroke='var(--white)'
                        strokeWidth='16'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        animate={{ pathLength: checked ? 1 : 0 }}
                        style={{
                            pathLength: pathLength,
                            opacity: opacity,
                        }}
                        transition={{
                            type: "spring",
                            // stiffness: 300,
                            // damping: 20,
                            duration: 0.6,
                        }}
                    />
                    <motion.rect
                        x='3.5'
                        y='4.5'
                        width='107.375'
                        height='107.375'
                        rx='24.5'
                        stroke='var(--brightCyan)'
                        strokeWidth='10'
                        animate={{
                            stroke: checked
                                ? "var(--brightCyan)"
                                : "var(--black)",
                            opacity: checked ? 1 : 0.5,
                        }}
                        transition={{
                            stroke: {
                                type: "spring",
                                duration: 0.5,
                            },
                            opacity: {
                                duration: 0,
                            },
                        }}
                    />
                </svg>
            </motion.div>
        </label>
    )
}
