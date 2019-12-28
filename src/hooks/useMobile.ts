import { useEffect, useState } from "react";

const isTouchableDevice = () => "ontouchstart" in document.documentElement;

// 1024 -> Table width
const isAcceptDesktopWidth = () => window.innerWidth <= 1024;

const isAndroid = (userAgent: string) => Boolean(userAgent.match(/Android/i));
const isIos = (userAgent: string) => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
const isOpera = (userAgent: string) => Boolean(userAgent.match(/Opera Mini/i));
const isWindows = (userAgent: string) => Boolean(userAgent.match(/IEMobile/i));

const testMobileFunctions = [isAndroid, isIos, isOpera, isWindows];

const isMobile = (userAgent: string) => testMobileFunctions.reduce((acc, el) => acc || el(userAgent), false);

const useMobile = () => {
	const [mobile, setIsMobile] = useState(isTouchableDevice());

	useEffect(() => setIsMobile(isMobile(navigator.userAgent) || isTouchableDevice() || !isAcceptDesktopWidth()));

	return mobile;
};

export default useMobile;
