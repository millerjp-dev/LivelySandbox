import React, { MutableRefObject, useContext } from "react";
import { UserContext } from "../context/UserContext";

const useSave = () => {
    const {canvasRef} = useContext(UserContext);
    const save = (name: string) => {
        if (canvasRef?.current) {
            const link = document.createElement('a');
            link.setAttribute('download', name + '.png');
            link.setAttribute('href', canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();
        }
    }
    return {save}
}

export default useSave;