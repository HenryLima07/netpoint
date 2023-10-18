import BorderButton from '../../../Buttons/BorderButton/BorderButton';

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const PromoContainer = ({className, price, name, onClick=()=>{}, children, ...props})=>{
    return(
        <article className={`flex flex-col items-center gap-4 border-2 p-4 md:p-8 m-4 border-black rounded-xl text-inter text-dark-gray ${className}`} {...props}>
            <div className='flex flex-row items-end gap-1 font-bebas'>
                <h2 className='text-3xl md:text-5xl'>${ price ? Number(price).toFixed(2).toString() : ""}</h2>
                <h6 className="uppercase font-semibold text-xl md:text-2xl">usd</h6>
            </div>
            <h3 className='font-semibold text-xl md:text-2xl'>{name}</h3>
            {children}
            <BorderButton onClick={onClick} className={`flex flex-row items-center justify-around gap-6 font-bold text-black border border-black bg-pure-white shadow-rounded-button-yellow
                my-5 mb-0
                px-2 text-xs py-2
                sm:text-base sm:p-2 sm:px-4
                lg:px-8 lg:text-lg`}> 
                <p>Comprar ahora</p>
                <EmojiPeopleIcon />
            </BorderButton>
        </article>
    );
}

export default PromoContainer;