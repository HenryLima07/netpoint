import React from "react";
import styled, { keyframes } from "styled-components";
import { useMediaQuery } from "react-responsive";

//using $on props elements to avoid DOM rendering problems on REACT

const Anim = (animparams) => keyframes`
0% {
    width: ${animparams.w[0]}px;
    height: ${animparams.h[0]}px;
    margin-top: ${animparams.mt[0]}px;
    margin-left: ${animparams.ml[0]}px;
}

12.5% {
    width: ${animparams.w[1]}px;
    height: ${animparams.h[1]}px;
    margin-top: ${animparams.mt[1]}px;
    margin-left: ${animparams.ml[1]}px;
}

25% {
    width: ${animparams.w[2]}px;
    height: ${animparams.h[2]}px;
    margin-top: ${animparams.mt[2]}px;
    margin-left: ${animparams.ml[2]}px;
}

37.5% {
    width: ${animparams.w[3]}px;
    height: ${animparams.h[3]}px;
    margin-top: ${animparams.mt[3]}px;
    margin-left: ${animparams.ml[3]}px;
}

50% {
    width: ${animparams.w[4]}px;
    height: ${animparams.h[4]}px;
    margin-top: ${animparams.mt[4]}px;
    margin-left: ${animparams.ml[4]}px;
}

62.5% {
    width: ${animparams.w[5]}px;
    height: ${animparams.h[5]}px;
    margin-top: ${animparams.mt[5]}px;
    margin-left: ${animparams.ml[5]}px;
}

75% {
    width: ${animparams.w[6]}px;
    height: ${animparams.h[6]}px;
    margin-top: ${animparams.mt[6]}px;
    margin-left: ${animparams.ml[6]}px;
}

87.5% {
    width: ${animparams.w[7]}px;
    height: ${animparams.h[7]}px;
    margin-top: ${animparams.mt[7]}px;
    margin-left: ${animparams.ml[7]}px;
}

100% {
    width: ${animparams.w[8]}px;
    height: ${animparams.h[8]}px;
    margin-top: ${animparams.mt[8]}px;
    margin-left: ${animparams.ml[8]}px;
}
`;

const StyledContainer = styled.div`
  background: ${(props) => props.$background};
  width: ${(props) => props.$sizecontainer}px;
  height: ${(props) => props.$sizecontainer}px;
  padding: 20px;
`;

const StyledBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: block;
  border-radius: ${(props) => props.$sizeborderradius}px;
  border: ${(props) => props.$sizeborderthickness}px solid
    ${(props) => props.$bordercolor};
  width: ${(props) => props.$boxparams.w}px;
  height: ${(props) => props.$boxparams.h}px;
  margin-top: ${(props) => props.$boxparams.mt}px;
  margin-left: ${(props) => props.$boxparams.ml}px;
  animation: ${(props) => Anim(props.$animparams)} 3s 0s forwards
    cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
`;

const XlviLoader = ({
  className = `xlviloader`,
  background = `transparent`,
  boxColors = [`#333`],
  size = `64px`,
  desktopSize = ``,
  mobileSize = ``,
}) => {
  let colorsToFill = [];
  if (boxColors.constructor === String) {
    if (boxColors === ``) {
      boxColors = "#333";
    }
    colorsToFill.push(boxColors);
  }
  if (boxColors.constructor === Array) {
    let asize = boxColors.length;
    if (asize === 0) {
      boxColors.push("#333");
      asize = boxColors.length;
    }
    for (let i = 0; i < 3; i += 1) {
      if (i < asize) colorsToFill.push(boxColors[i]);
      else colorsToFill.push(boxColors[asize - 1]);
    }
  }

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  var sizeFound = 0.0;
  if (isDesktopOrLaptop) {
    if (desktopSize !== "") sizeFound = parseFloat(desktopSize);
    else sizeFound = parseFloat(size) * 2;
  }

  if (isTabletOrMobile) {
    if (mobileSize !== "") sizeFound = parseFloat(mobileSize);
    else sizeFound = parseFloat(size);
  }

  let sizePassed = parseFloat(sizeFound);
  let sizecontainer = (sizePassed * 112) / 64;
  let sizeborderradius = (sizePassed * 24) / 64;
  let sizeborderthickness = (sizePassed * 16) / 64;

  let box1Params = {
    w: (sizePassed * 112) / 64,
    h: (sizePassed * 48) / 64,
    mt: (sizePassed * 64) / 64,
    ml: 0,
  };

  let box2Params = {
    w: (sizePassed * 48) / 64,
    h: (sizePassed * 48) / 64,
    mt: 0,
    ml: 0,
  };

  let box3Params = {
    w: (sizePassed * 48) / 64,
    h: (sizePassed * 48) / 64,
    mt: 0,
    ml: (sizePassed * 64) / 64,
  };

  let anim1Params = {
    w: [
      (sizePassed * 112) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
    ],
    h: [
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 112) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
    ],
    mt: [
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      0,
      0,
      0,
    ],
    ml: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  let anim2Params = {
    w: [
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 112) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
    ],
    h: [
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
    ],
    mt: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ml: [
      0,
      0,
      0,
      0,
      0,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
    ],
  };

  let anim3Params = {
    w: [
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 112) / 64,
    ],
    h: [
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 112) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
      (sizePassed * 48) / 64,
    ],
    mt: [
      0,
      0,
      0,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
    ],
    ml: [
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      (sizePassed * 64) / 64,
      0,
    ],
  };

  return (
    <StyledContainer
      $sizecontainer={sizecontainer}
      $background={background}
      className={className}
    >
      <StyledBox
        $boxparams={box1Params}
        $sizeborderradius={sizeborderradius}
        $sizeborderthickness={sizeborderthickness}
        $bordercolor={colorsToFill[0]}
        $animparams={anim1Params}
        className="box1"
      ></StyledBox>
      <StyledBox
        $boxparams={box2Params}
        $sizeborderradius={sizeborderradius}
        $sizeborderthickness={sizeborderthickness}
        $bordercolor={colorsToFill[1]}
        $animparams={anim2Params}
        className="box2"
      ></StyledBox>
      <StyledBox
        $boxparams={box3Params}
        $sizeborderradius={sizeborderradius}
        $sizeborderthickness={sizeborderthickness}
        $bordercolor={colorsToFill[2]}
        $animparams={anim3Params}
        className="box3"
      ></StyledBox>
    </StyledContainer>
  );
};

export default XlviLoader;
