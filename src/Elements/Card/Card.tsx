import React from "react";
import styled from "styled-components";

interface CardProps {
    width: number;
    position: {x: number, y: number}
}

const CardFrame = styled.div<{width: number, x: number, y: number}>`
    width: ${({width})=>width}px;
    height: ${({width})=>width*1.5454}px; //standard playing card dimensions
    position: fixed;
    top: ${({y,width})=>y - (width*1.5454/2)}px;
    left: ${({x, width})=>x - (width/2)}px;
    pointer-events: none;
    border: 1px solid black;
    border-radius: ${({width})=>width*0.0551181102}px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom right, white, lightgrey);
    transition: top linear 1s, left linear 1s;
`;

const Card = ({width, position}: CardProps) => {
    return (
        <CardFrame width={width} {...position} />
    )
}

export default Card;