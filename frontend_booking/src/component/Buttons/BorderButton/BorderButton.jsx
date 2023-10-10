const BorderButton = ({ className, children, onClick = ()=>{}, ...props }) => {
    return (
        <button className={`rounded-full hover:cursor-pointer ${className}`} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default BorderButton;