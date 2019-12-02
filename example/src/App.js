import { Colors, Container, View } from "lego-components";
import React from "react";
import { MdClose, MdDone, MdInfo } from "react-icons/md";
import styled from "styled-components";

const Wrap = styled.div`
	margin: 0.2rem auto;
	font-size: 1rem;

	@media (min-width: 48em) {
		max-width: 93.75rem;
		padding: 0.25rem;
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
		margin-bottom: 0.25rem;
		margin-right: 0.4rem;
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
	const steps = ["Aguardando pagamento", "Recebemos seu pagamento", "Produzindo seu cartão", "Cartão a caminho", "Você recebeu seu cartão"];
	const index = 3;
	const currentIcon = <MdInfo />;
	const doneIcon = <MdDone />;
	const pendingIcon = <MdClose />;
	return (
		<Container>
			<View span="100%">
				<Wrap>
					<ul className="step-list">
						{steps.map((title, i) => {
							if (index === i) {
								return (
									<li key={title} className={current}>
										<span className="step-list-icon">{currentIcon}</span>
										<span className="step-list-title">{title}</span>
									</li>
								);
							}
							if (i < index) {
								return (
									<li key={title} className={done}>
										<span className="step-list-icon">{doneIcon}</span>
										<span className="step-list-title">{title}</span>
									</li>
								);
							}
							return (
								<li key={title} className={pending}>
									<span className="step-list-icon">{pendingIcon}</span>
									<span className="step-list-title">{title}</span>
								</li>
							);
						})}
					</ul>
				</Wrap>
			</View>
		</Container>
	);
}
