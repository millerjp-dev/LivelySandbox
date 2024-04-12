import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";

interface CanvasProps {

}

const StyledCanvas = styled.canvas`
    width: calc(100vw);
    height: calc(100vh);
    position: fixed;
    top:0;
    left:0;
    z-index: 10;
    mix-blend-mode: difference;
`;

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({}, outerRef) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [nextCord, setNextCord] = useState<{x?: number, y?: number}>({});
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cTR = useRef<CanvasRenderingContext2D>(null);
    const mouseDownHandler: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (cTR.current) {
            if (e.button === 2) {
                cTR.current.strokeStyle = 'black';
                cTR.current.lineWidth = 100;
            } else {
                cTR.current.strokeStyle = 'white';
                cTR.current.lineWidth = 10;
            }
        }
        setIsDrawing(true);
        e.preventDefault();
    };
    const mouseMoveHandler: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        setNextCord({x: e.clientX, y: e.clientY});
    };
    const mouseUpHandler: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        setIsDrawing(false);
    };
    const contextMenuHandler: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (cTR.current) {
            e.stopPropagation();
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (isDrawing) {
            cTR.current?.beginPath();
        } else {
            cTR.current?.closePath();
        }         
    }, [isDrawing]);

    useEffect(() => {
        if (isDrawing) {
            cTR.current?.stroke();
        }
    });

    useEffect(() => {
        if (nextCord.x !== undefined && nextCord.y !== undefined) {
            const scaledX = nextCord.x * 2560 / (canvasRef.current?.clientWidth || 1)
            const scaledY = nextCord.y * 1440 / (canvasRef.current?.clientHeight || 1)
            cTR.current?.lineTo(scaledX, scaledY);
        }
    }, [nextCord]);

    useEffect(() => {
        if (cTR.current) {
            cTR.current.rect(0,0,2560,1440);
            cTR.current.fill();
            cTR.current.strokeStyle = 'white';
            cTR.current.lineWidth = 10;
        }
    }, []);

    useImperativeHandle(outerRef, () => canvasRef.current!, []);

    useImperativeHandle(cTR, () => canvasRef.current?.getContext('2d')!, []);

    return(
        <StyledCanvas width='2560' height='1440' ref={canvasRef} onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler} onContextMenu={contextMenuHandler}/>
    )
});

export default Canvas;