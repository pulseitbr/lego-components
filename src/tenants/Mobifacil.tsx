import React, { useEffect, useState, Fragment } from "react";
import { Tenants, TENANT } from "lego";

const isMobifacil = Tenants.mobifacil === TENANT;

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

	return isTenant ? children : <Fragment />;
};

export default Mobifacil;
