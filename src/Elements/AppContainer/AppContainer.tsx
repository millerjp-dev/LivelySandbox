import React, { forwardRef, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import Canvas from "../Canvas/Canvas";
import Toolbar from "../Toolbar/Toolbar";
import Background from "../Background/Background";

const AppContainer =() => {
    const canvasRef = useRef<HTMLCanvasElement>();
    return(
        <UserContext.Provider value={{canvasRef}}>
            <Canvas ref={(ref)=>{canvasRef.current=ref||undefined}} />
            <Background src='url(/vaporwave.jpg)' />
            <Toolbar />
        </UserContext.Provider>
    )
};

export default AppContainer;