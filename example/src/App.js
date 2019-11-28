import React from "react";
import { Container, View, Text, Colors } from "lego-components";
import styled from "styled-components";
import { MdInfo } from "react-icons/md";

const Wrap = styled.div`
	.wrapper {
		margin: 1rem auto;
	}

	@media (min-width: 48em) {
		.wrapper {
			max-width: 93.75rem;
		}
	}

	.step {
		font-size: 1rem;
	}

	@media (min-width: 48em) {
		.step {
			padding: 20px;
		}
	}
	.step-list {
		width: 100%;
		margin: 0;
		padding: 0;
		list-style-type: none;
	}
	@media (min-width: 48em) {
		.step-list {
			display: flex;
			justify-content: space-between;
		}
	}
	.step-item {
		padding: 3px 5px;
		text-align: center;
		position: relative;
		display: flex;
		align-items: center;
	}
	@media (min-width: 48em) {
		.step-item {
			padding: 0.625rem;
			flex-direction: column;
			flex: 1;
		}
	}
	.step-item:after {
		content: "";
		display: block;
		position: absolute;
		z-index: 2;
	}
	@media (min-width: 48em) {
		.step-item:after {
			width: calc(100% - 6.25rem);
			top: 28%;
			left: calc(50% + 50px);
			border-top: 1px dashed ${Colors.disabled};
			border-top-style: dashed;
		}
	}
	.step-item-done {
		color: ${Colors.success};
		transition: all 0.1s;
	}
	@media (min-width: 48em) {
		.step-item-done:after {
			border-top: 1px solid ${Colors.successLight};
		}
	}
	.step-item-done:hover,
	.step-item-done:focus {
		text-decoration: none;
	}
	.step-item-current {
		color: ${Colors.primary};
		font-weight: bolder;
	}
	.step-item-current:last-of-type:after,
	.step-item-current:only-of-type:after {
		height: 30%;
	}
	.step-item:last-of-type:after {
		display: none;
	}
	.step-item-pending {
		color: ${Colors.disabled};
	}
	.step-item-pending:after {
		height: 30%;
	}
	.step-list-title {
		margin: 1px 0 0;
	}
	@media (min-width: 48em) {
		.step-list-title {
			margin: 0;
		}
	}
	.step-list-icon {
		margin: 0;
		height: 1em;
		width: 1em;
		font-size: 1.5rem;
	}
	@media (min-width: 48em) {
		.step-list-icon {
			margin: 0 0 15px;
		}
	}
`;

const done = "step-item step-item-done";
const current = "step-item step-item-current";
const pending = "step-item step-item-pending";

export default function TestApp() {
	const steps = [
		{ title: "Aguardando pagamento" },
		{ title: "Recebemos seu pagamento" },
		{ title: "Produzindo seu cartão" },
		{ title: "Cartão a caminho" },
		{ title: "Você recebeu seu cartão" },
	];
	const index = 2;
	return (
		<Container>
			<View span="100%">
				<Wrap>
					<div className="wrapper">
						<nav className="step">
							<ul className="step-list">
								{steps.map((x, i) => {
									console.log(i, index);
									if (index === i) {
										return (
											<li className={current}>
												<span className="step-list-icon">{x.icon || <MdInfo />}</span>
												<span className="step-list-title">{x.title}</span>
											</li>
										);
									}
									if (i < index) {
										return (
											<li className={done}>
												<span className="step-list-icon">{x.icon || <MdInfo />}</span>
												<span className="step-list-title">{x.title}</span>
											</li>
										);
									}
									return (
										<li className={pending}>
											<span className="step-list-icon">{x.icon || <MdInfo />}</span>
											<span className="step-list-title">{x.title}</span>
										</li>
									);
								})}
							</ul>
						</nav>
					</div>
				</Wrap>
			</View>
		</Container>
	);
}
