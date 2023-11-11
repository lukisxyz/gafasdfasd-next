import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...args) {
    return twMerge(clsx(...args))
}

function base64ToJson(base64String) {
    try {
        const decoded = decodeURIComponent(base64String)
        const json = atob(decoded)
        return JSON.parse(json)
    } catch (error) {
        /* empty */
    }
}

function jsonToBase64(object) {
    const json = JSON.stringify(object)
    return btoa(json)
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function forwardRefWithAs(component) {
    return React.forwardRef(component)
}

export {
    cn,
    forwardRefWithAs,
    base64ToJson,
    jsonToBase64,
    capitalizeFirstLetter,
}
