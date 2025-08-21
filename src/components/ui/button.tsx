import React, { type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
    base: 'text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-50 disabled:pointer-events-none',
    variants: {
        size: {
            default: "px-3 py-2",
            icon: 'p-2',
            'icon-sm': 'p-1'
        }
    },
    defaultVariants: {}
})

const Button = ({ className, size, ...props }: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
    return (
        <button className={buttonVariants({ size, className })} {...props}></button>
    )
}

export default Button