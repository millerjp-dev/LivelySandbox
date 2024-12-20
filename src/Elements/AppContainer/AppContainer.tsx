import React, { forwardRef, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Canvas from "../Canvas/Canvas";
import Toolbar from "../Toolbar/Toolbar";
import Background from "../Background/Background";
import Card from "../Card/Card";
import CharacterPage from "../../pages/character";
import styled from "styled-components";

const CharacterContainer = styled.div`
    position: absolute;
    top: 100px;
    right: 100px;
    z-index: 50;
`

const AppContainer =() => {
    const [position, setPosition] = useState<{x: number, y: number}>({x: 100, y: 100});

    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        setInterval(() => {
            setPosition(({x,y}) => ({x:x+10,y:y+10}));
        }, 1000);
    }, []);
    return(
        <UserContext.Provider value={{canvasRef}}>
            <Canvas ref={(ref)=>{canvasRef.current=ref||undefined}} />
            <Background src='url(/vaporwave.jpg)' />
            <Card width={100} position={position} />
            <Card width={100} position={{x: 300, y: 200}} />
            <Toolbar />
            <CharacterContainer>
                <CharacterPage />
            </CharacterContainer>
        </UserContext.Provider>
    )
};

export default AppContainer;