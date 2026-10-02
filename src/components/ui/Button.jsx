const base = 
'inline-flex items-center justify-center gap-2 rounded-full ' +
'font-body text-sm font-semibold py-2.5 px-4.5 ' +
'transition duration-150 active:scale-[0.98] cursor-pointer'

const variants = {
    primary: 'bg-lime text-on-lime hover:bg-lime-hover',
}

function Button({ variant = 'primary', icon: Icon, children, ...props }) {
    return (
        <button className={`${base} ${variants[variant]}`} {...props}>
            {Icon && <Icon size={16} strokeWidth={2} />}
            {children}
        </button>
    )
}

export default Button