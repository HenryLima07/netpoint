const ServicioContainer = ({title, children, ...props})=>{
    return (
        <div className="flex flex-col justify-center items-center gap-2" >
            {props.icon}
            <h3 className="font-semibold text-lg md:text-2xl">{title}</h3>
            {children}
        </div>
    );
}

export default ServicioContainer;