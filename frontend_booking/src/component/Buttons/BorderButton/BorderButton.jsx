const BorderButton = ({ classB, children, handlerClick = ()=>{} }) => {
    return (
        <button className={`rounded-full hover:cursor-pointer ${classB}`} onClick={handlerClick}>
            {children}
        </button>
    );
}

export default BorderButton;