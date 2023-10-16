const NoBorderButton = ({className, children, handleClick = ()=>{}}) => {
    return(
        <button className={`rounded-xl hover:cursor-pointer ${className}`} onClick={handleClick}>
            {children}
        </button>
    );
}

export default NoBorderButton;