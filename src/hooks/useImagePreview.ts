import { useState, useEffect } from "react";

const useImagePreview = (blob: Blob) => {
    const [img, setImg] = useState("");
    useEffect(() => {
        const url = URL.createObjectURL(blob);
        setImg(url);
        return () => {
            URL.revokeObjectURL(img);
        };
    }, [blob]);
    return img;
};

export default useImagePreview;
