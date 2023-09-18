import { Link } from "react-router-dom";

const LinkContainer = ({
    to,
    classLink,
    children
})=>{
    return(
        <Link className={`px-5 uppercase hover:cursor-pointer ${classLink}`} to={to}>{children}</Link>
    );
}

export default LinkContainer;