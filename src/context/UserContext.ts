import React, { useRef } from "react";

interface userContextProps {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined> | undefined;
}

export const UserContext = React.createContext<userContextProps>({canvasRef: undefined});