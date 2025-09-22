import React, { type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot'
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

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}

const Button = ({ className, size, asChild, ...props }: ButtonProps) => {
    const Component = asChild ? Slot : 'button'
    return (
        <Component className={buttonVariants({ size, className })} {...props} />
    )
}

export default Button