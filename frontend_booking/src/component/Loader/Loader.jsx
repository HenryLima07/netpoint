import  XlviLoader  from "./XlviLoader";

import { UseConfiguration } from "../../context/configContext";

import gif from "../../assets/video/loader.gif"

const   Loader = ()=>{
  const { loading } = UseConfiguration();
  return(
    loading &&
    <div className="fixed top-0 inset-0 flex select-none items-center justify-center bg-pure-white bg-opacity-40 z-30 min-h-screen w-full">
      <XlviLoader
        boxColors={["#FFDE59", "#2E3646", "#638FF5"]}
        desktopSize={"90px"}
        mobileSize={"70px"}
       />
        {/* second option: <img src={gif} alt="Loader application" /> */}
    </div>
  );
}

export default Loader;