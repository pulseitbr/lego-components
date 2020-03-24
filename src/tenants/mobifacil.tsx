import { TENANT, Tenants } from "@pulseitbr/lego";
import React, { Fragment, useEffect, useState } from "react";

const isMobifacil = Tenants.mobifacil === TENANT;

type Props = {
	children: React.ReactNode;
	visibleForAuthorized?: boolean;
	isAuthorized?: boolean;
	visible?: boolean;
};

const Mobifacil = ({ children, visible = false, visibleForAuthorized = false, isAuthorized = false }: Props) => {
	const [isTenant, setIsTenant] = useState((visibleForAuthorized && isAuthorized) || isMobifacil);

	useEffect(() => {
		if (visibleForAuthorized && isAuthorized && isMobifacil) {
			return setIsTenant(true);
		}
		if (!isMobifacil || !visibleForAuthorized) {
			return setIsTenant(false);
		}
		return setIsTenant(visible);
	}, [visibleForAuthorized, isAuthorized]);

	return isTenant ? children : <Fragment />;
};

export default Mobifacil;
