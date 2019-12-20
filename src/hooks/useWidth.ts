import { useState, useEffect } from "react";
const useWidth = () => {
	const isClient = typeof window === "object";

	function getSize() {
		return isClient ? window.innerWidth : 0;
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
};

export default useWidth;
