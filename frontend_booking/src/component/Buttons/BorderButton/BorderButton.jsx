const BorderButton = ({ className, children, onClick = ()=>{} }) => {
    return (
        <button className={`rounded-full hover:cursor-pointer ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default BorderButton;