import React from "react";
import styled from "styled-components";

interface BackgroundProps {
    src: string;
}

const StyledImg = styled.div<{src: string}>`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    ${({src}) => (`background-image: ${src};`)}
    background-size: cover;
`;

const Background = ({src}: BackgroundProps) => {
    return (
        <StyledImg src={src} />
    )
}

export default Background;