const Form = ({className, children, ...props})=>{
    return <form className={`w-full ${className}`} {...props}>{children}</form>
}

export default Form;