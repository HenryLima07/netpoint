const NoBorderButton = ({classNB, children, handleClick = ()=>{}}) => {
    return(
        <button className={` px-7 py-2 rounded-xl hover:cursor-pointer ${classNB}`} onClick={handleClick}>
            {children}
        </button>
    );
}

export default NoBorderButton;