const NoBorderButton = ({classNB, children, handleClick = ()=>{}}) => {
    return(
        <button className={` pl-5 pr-2 py-2 rounded-xl hover:cursor-pointer ${classNB}`} onClick={handleClick}>
            {children}
        </button>
    );
}

export default NoBorderButton;