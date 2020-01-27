import React, { useState } from "react";
import styled from "styled-components";
import { Fragment } from "react";
import { useEffect } from "react";

const ScrollComponent = ({ scrollStepInPx }) => {
	const [showBtn, setShowBtn] = useState(false);
	// const [intervalId, setIntervalId] = useState(0);

	useEffect(() => {
		const scrollFn = () => {
			toggleVisibility();
		};
		window.addEventListener("scroll", scrollFn);
		return () => window.removeEventListener("scroll", scrollFn);
	}, []);

	const toggleVisibility = () => {
		const body = document.body;
		const html = document.documentElement;
		const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

		if (Math.round(window.pageYOffset + window.innerHeight) >= 0.4 * height) {
			setShowBtn(true);
			return;
		}
		setShowBtn(false);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "auto"
		});
	};

	const Wrapper = styled.div`
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		/* animation: fadeIn 700ms ease-in-out 1s both; */
		cursor: pointer;
	`;

	const Inner = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		border: 1px solid black;
		border-radius: 15px;
		background: #f9f9f9;
		font-weight: bold;
		font-family: Verdana, Geneva, Tahoma, sans-serif;

		&&:hover {
			background: #ccc;
		}
	`;

	return (
		<Fragment>
			{showBtn && (
				<Wrapper onClick={() => scrollToTop()}>
					<Inner>SUBIR</Inner>
				</Wrapper>
			)}
		</Fragment>
	);
};

export default ScrollComponent;
