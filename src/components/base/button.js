import { cva } from 'class-variance-authority'
import { cn } from '@/libs/helper'
import { forwardRefWithAs } from '@/libs/helper'
import { Spinner } from './spinner'

function ButtonComponent(
    {
        as: Component = 'button',
        size = 'md',
        variant = 'purple',
        leading,
        trailing,
        loading,
        success,
        disabled,
        className,
        children,
        ...props
    },
    ref,
) {
    return (
        <Component
            ref={ref}
            aria-label={typeof children === 'string' ? children : undefined}
            disabled={disabled ?? (loading || success)}
            className={cn(
                buttonClass({
                    size,
                    variant,
                    loading,
                    className,
                }),
            )}
            {...props}>
            {leading &&
                leading({
                    className: cn(iconClass({ size, leading: size }), {
                        invisible: loading || success,
                    }),
                })}
            {loading && (
                <span className="animate-in fade-in inline-flex items-center gap-x-0.5 h-5 absolute left-1/2 -translate-x-1/2">
                    <span className="animate-blink mx-px h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="animate-blink animation-delay-150 mx-px h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="animate-blink animation-delay-300 mx-px h-1.5 w-1.5 rounded-full bg-white" />
                </span>
            )}
            <div
                className={`w-full flex ${cn({
                    invisible: loading || success,
                })}`}>
                {children}
            </div>
            {trailing &&
                trailing({
                    className: cn(iconClass({ size, trailing: size }), {
                        invisible: loading || success,
                    }),
                })}
        </Component>
    )
}

export const Button = forwardRefWithAs(ButtonComponent)

const buttonClass = cva(
    'leading-none relative disabled:opacity-70 rounded-full inline-flex tracking-wide transition focus:outline-2 focus:outline-offset-4 items-center active:scale-95',
    {
        variants: {
            variant: {
                purple:
                    'text-white bg-purple-normal hover:bg-purple-darker shadow-purple-900 hover:shadow-purple-800',
                red:
                    'text-white bg-red-normal hover:bg-red-darker shadow-red-900 hover:shadow-red-800',
                green:
                    'text-white bg-green-normal hover:bg-green-darker shadow-green-900 hover:shadow-green-800',
                blue:
                    'text-white bg-blue-normal hover:bg-blue-darker shadow-blue-900 hover:shadow-blue-800',
                inactive:
                    'text-slate-dark bg-slate-normal hover:bg-slate-darker shadow-slate-200 hover:shadow-slate-300',
            },
            size: {
                sm: 'py-2 px-4',
                md: 'py-3 px-4 font-semibold',
            },
            loading: {
                true: 'cursor-wait',
                false: 'disabled:cursor-not-allowed',
            },
        },
        compoundVariants: [
            {
                variant: ['purple', 'red'],
                className: 'text-white',
            },
            {
                variant: ['purple', 'purple'],
                className: 'shadow-sm',
            },
            {
                size: ['sm', 'md'],
                className: 'text-base',
            },
        ],
    },
)

const iconClass = cva('', {
    variants: {
        size: {
            sm: 'h-4 w-4',
            md: 'h-4 w-4',
            lg: 'h-5 w-5',
        },
        leading: {
            sm: 'mr-2',
            md: 'mr-2',
            lg: 'mr-3',
        },
        trailing: {
            sm: 'ml-2',
            md: 'ml-2',
            lg: 'ml-3',
        },
    },
})

function IconButtonComponent(
    {
        icon,
        label,
        as: Component = 'button',
        size = 'md',
        variant = 'purple',
        loading,
        disabled,
        className,
        ...props
    },
    ref,
) {
    return (
        <div className="inline-flex">
            <Component
                ref={ref}
                disabled={disabled || loading}
                aria-disabled={disabled || loading}
                className={`${iconButtonClass({
                    size,
                    variant,
                    loading,
                    className,
                })} rounded-md`}
                {...props}>
                {!loading &&
                    icon &&
                    icon({
                        className: iconButtonIconClass({ size }),
                    })}
                {loading && (
                    <Spinner className={iconButtonIconClass({ size })} />
                )}
                <span className="sr-only">{label}</span>
            </Component>
        </div>
    )
}

export const IconButton = forwardRefWithAs(IconButtonComponent)

const baseIconButtonClass = cva('', {
    variants: {
        size: {
            sm: 'p-2 sm:p-1',
            md: 'p-3 sm:p-2',
            lg: 'p-4 sm:p-3',
        },
    },
})

function iconButtonClass({ size, variant, loading, className }) {
    return cn(
        buttonClass({ variant, loading }),
        baseIconButtonClass({ size }),
        className,
    )
}

const iconButtonIconClass = cva('', {
    variants: {
        size: {
            sm: 'h-4 w-4',
            md: 'h-4 w-4',
            lg: 'h-5 w-5',
        },
    },
})
