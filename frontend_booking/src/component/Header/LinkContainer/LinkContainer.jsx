import { Link } from "react-router-dom";

const LinkContainer = ({
    to,
    classLink,
    children
})=>{
    return(
        <Link className={`uppercase hover:cursor-pointer ${classLink}
            md:text-xl px-3 lg:text-xl xl:px-5 xl:text-2xl 2xl:text-3xl`} to={to}>{children}</Link>
    );
}

export default LinkContainer;