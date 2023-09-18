const BorderButton = ({ classB, children, handlerClick = ()=>{} }) => {
    return (
        <button className={`py-3 px-8 rounded-full hover:cursor-pointer ${classB}`} onClick={handlerClick}>
            {children}
        </button>
    );
}

export default BorderButton;