import React from 'react'
import { cn } from '@/libs/helper'

export const inputClassName = ({ invalid, className } = {}) =>
    cn(
        'flex rounded-sm bg-[#F4F4F4] rounded-md file:border-0 file:bg-transparent file:text-sm file:font-medium p-3 text-sm font-medium focus:outline-brand-600 disabled:cursor-not-allowed disabled:bg-gray-100 w-full mt-2',
        invalid
            ? 'shadow-haptic-rose-400 enabled:hover:shadow-haptic-rose-500 focus:outline-rose-600'
            : 'enabled:hover:shadow-haptic-gray-400 shadow-haptic-gray-300',
        className,
    )

export const Input = React.forwardRef(
    ({ invalid, className, readOnly, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={inputClassName({ invalid, className })}
                readOnly={readOnly}
                title={readOnly ? 'Read only' : undefined}
                {...props}
            />
        )
    },
)

Input.displayName = 'Input'
