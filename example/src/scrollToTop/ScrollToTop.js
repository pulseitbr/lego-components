import React, { Component } from "react";
import styled from "styled-components";
import { Fragment } from "react";
export default class ScrollToTop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_visible: false
		};
	}

	componentDidMount() {
		var scrollComponent = this;
		document.addEventListener("scroll", function(e) {
			scrollComponent.toggleVisibility();
		});
	}

	toggleVisibility() {
		if (window.pageYOffset > 1000) {
			this.setState({
				is_visible: true
			});
		} else {
			this.setState({
				is_visible: false
			});
		}
	}

	scrollToTop() {
		window.scrollTo({
			top: 0
		});
	}

	render() {
		const { is_visible } = this.state;

		const ScrollToTop = styled.div`
			position: fixed;
			bottom: 1.5rem;
			right: 1.5rem;
			/* animation: fadeIn 700ms ease-in-out 1s both; */
			cursor: pointer;
		`;

		return (
			<Fragment>
				{is_visible && (
					<ScrollToTop>
						<div
							onClick={() => this.scrollToTop()}
							style={{ width: 70, height: 30, borderRadius: 15, background: "gray", textAlign: "center" }}
						>
							SUBIR
						</div>
					</ScrollToTop>
				)}
			</Fragment>
		);
	}
}
