import BusinessIcon from '@mui/icons-material/Business';

const CourtContainer = ({title, children})=>{
    return(
        <article className='flex flex-col justify-center items-center font-inter text-center rounded-3xl shadow-rounded-courts-location gap-3 p-8 bg-pure-white md:w-1/2 lg:w-2/5 xl:w-2/6'>
            <BusinessIcon style={{fontSize: "48px"}}/>
            <h3 className='uppercase font-bold text-xl md:text-3xl'>{title}</h3>
            {children}
        </article>
    );
}

export default CourtContainer;