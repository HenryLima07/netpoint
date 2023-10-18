import { HashLink } from "react-router-hash-link";

const HashLinkContainer = ({
    to,
    classLink,
    children,
    props
})=>{
    return(
        <HashLink className={`uppercase hover:cursor-pointer ${classLink}
            md:text-xl px-3 lg:text-xl xl:px-5 xl:text-2xl 2xl:text-3xl`} smooth to={to} {...props}>{children}</HashLink>
    );
}

export default HashLinkContainer;