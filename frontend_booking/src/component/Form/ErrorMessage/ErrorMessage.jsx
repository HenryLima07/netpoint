
const ErrorMessage = ({className, children, ...props})=>{
    return <span className={` font-inter text-azure ${className}`} {...props}>{children}</span>
}

export default ErrorMessage;