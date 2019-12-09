import { useEffect, useState } from "react";

const isTouchableDevice = () => "ontouchstart" in document.documentElement;

const getMobileDetect = (userAgent: string) => {
	const isAndroid = () => Boolean(userAgent.match(/Android/i));
	const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
	const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
	const isWindows = () => Boolean(userAgent.match(/IEMobile/i));

	const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows());
	const isDesktop = () => !isMobile();

	return { isMobile, isDesktop, isAndroid, isIos };
};

const useMobile = () => {
	const [isMobile, setIsMobile] = useState(isTouchableDevice());
	const touchableDevice = isTouchableDevice();

	useEffect(() => {
		const devices = getMobileDetect(navigator.userAgent);
		setIsMobile(devices.isMobile || touchableDevice);
	}, [touchableDevice]);

	return isMobile;
};

export default useMobile;
