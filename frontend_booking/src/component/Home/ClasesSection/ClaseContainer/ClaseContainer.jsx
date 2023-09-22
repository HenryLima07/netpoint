const ClaseContainer = ({className, children})=>{
    return (
        <div className={`flex flex-col md:flex-row gap-2 sm:gap-6 md:gap-14 justify-between items-center ${className}`}>
            {children}
        </div>
    );
}

export default ClaseContainer;