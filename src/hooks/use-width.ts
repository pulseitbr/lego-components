import { useState, useEffect } from "react";

const isClient = typeof window === "object";
const getSize = () => (isClient ? window.innerWidth : 0);

const useWidth = () => {
	const [windowSize, setWindowSize] = useState(getSize);
	useEffect(() => {
		if (!isClient) {
			return;
		}
		const handleResize = () => setWindowSize(getSize());
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
};

export default useWidth;
