import fileSize from "filesize";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export const removeDuplicate = (arr, key) => {
    const duplicatesNames = [];
    const len = arr.length;
    for (let i = 0; i < len; i += 1) {
        const item = arr[i];
        const name = item[key];
        if (!duplicatesNames.includes(name)) {
            duplicatesNames.push(name);
        } else {
            arr.splice(i, 1);
        }
    }
    return arr;
};

const Upload = () => {
    const [saveFiles, setSaveFiles] = useState([]);

    useEffect(() => {
        return () => {
            saveFiles.forEach((x) => URL.revokeObjectURL(x));
        };
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => {
            return {
                file,
                key: file.name,
                name: file.name,
                type: file.type,
                size: fileSize(file.size),
                previewUrl: URL.createObjectURL(file)
            };
        });
        setSaveFiles((prev) => removeDuplicate([...prev, ...newFiles], "name"));
    }, []);
    console.log("SAVE FILES", saveFiles);
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDropAccepted: onDrop,
        accept: "image/*"
    });

    const renderDragMessage = (isDragAccept, isDragActive, isDragReject) => {
        if (isDragAccept) {
            return <span style={{ color: "green" }}>Solte os arquivos aqui</span>;
        }
        if (!isDragActive) {
            return <span>Arraste arquivos aqui...</span>;
        }
        return <span style={{ color: "red" }}>Arquivo não suportado</span>;
    };

    return (
        <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {renderDragMessage(isDragAccept, isDragActive, isDragReject)}
        </div>
    );
};

export default Upload;
