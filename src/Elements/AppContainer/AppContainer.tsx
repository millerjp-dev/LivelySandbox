import React, { forwardRef, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import Canvas from "../Canvas/Canvas";
import Toolbar from "../Toolbar/Toolbar";
import Background from "../Background/Background";
import Card from "../Card/Card";

const AppContainer =() => {
    const canvasRef = useRef<HTMLCanvasElement>();
    return(
        <UserContext.Provider value={{canvasRef}}>
            <Canvas ref={(ref)=>{canvasRef.current=ref||undefined}} />
            <Background src='url(/vaporwave.jpg)' />
            <Card width={500} position={{x: 100, y: 100}}/>
            <Toolbar />
        </UserContext.Provider>
    )
};

export default AppContainer;