import React, { MutableRefObject, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";

const useOpen = () => {
    const inputRef = useRef<HTMLInputElement>();
    const {canvasRef} = useContext(UserContext);

    const handleFileChange : React.ChangeEventHandler<HTMLInputElement> = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        event.target.value = '';
    }

    const HiddenInput = (
        <input  
            style={{display: 'none'}}
            ref={(ref) => {inputRef.current=ref||undefined}}
            type="file"
            onChange={handleFileChange}
            accept="*.png"
        />
    );

    const open = () => {
        if (canvasRef?.current && inputRef.current) {
            inputRef.current.click();
        }
    }

    return {open, HiddenInput}
}

export default useOpen;