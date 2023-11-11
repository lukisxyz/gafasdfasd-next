import { cn } from '@/libs/helper'
import React from 'react'

export const labelClass = 'text-sm font-medium text-gray-700'

export const Label = ({ className, ...props }) => {
    return <label className={cn(labelClass, className)} {...props} />
}
