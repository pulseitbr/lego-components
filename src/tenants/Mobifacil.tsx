import React, { useEffect, useState, Fragment } from "react";

const isMobifacilRegex = /\.mobifacil\./gi;

const isMobifacil = isMobifacilRegex.test(window.location.href) || process.env.NODE_ENV === "development";

type Props = {
    children: React.ReactNode;
    visibleForAuthorized?: boolean;
    isAuthorized?: boolean;
};

const Mobifacil = ({ children, visibleForAuthorized = false, isAuthorized = false }: Props) => {
    const [isTenant, setIsTenant] = useState((visibleForAuthorized && isAuthorized) || isMobifacil);

    useEffect(() => {
        if (!isMobifacil) {
            setIsTenant(false);
        } else if (!visibleForAuthorized) {
            setIsTenant(false);
        } else if (visibleForAuthorized && isAuthorized && isMobifacil) {
            setIsTenant(true);
        } else {
            setIsTenant(true);
        }
    }, [visibleForAuthorized, isAuthorized]);

    return isTenant ? <Fragment>{children}</Fragment> : <Fragment />;
};

export default Mobifacil;
