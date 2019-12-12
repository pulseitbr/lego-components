import * as React from "react";
import { Container } from "../../base";
import Timeline from "../../timeline/Timeline";
import TimelineItem from "../../timeline/TimelineItem";
import MaterialInput from "../MaterialInput";
import defaults from "./defaults";

export type RuleObject = {
	name: string;
	error: React.ReactNode;
	assert: React.ReactNode;
	matcher: Function;
	icons?: {
		assert: string;
		error: string;
	};
};

export type RuleValid = {
	[name: string]: Boolean;
};

export type DefaultIcons = {
	assert: boolean;
	error: React.ReactNode;
};

type Props = {
	name: string;
	value: string;
	viewChecks: boolean;
	rules?: RuleObject[];
	placeholder?: string;
	useDefault: Boolean;
	selfControl?: Boolean;
	disabled?: Boolean;
	timelineClassName?: string;
	defaultIcons?: DefaultIcons;
	textStyle?: React.CSSProperties;
	inputStyle?: React.CSSProperties;
	timeLineStyle?: React.CSSProperties;
	onChange(e: React.ChangeEvent<HTMLInputElement>): any;
	onFocus?(e: React.ChangeEvent<HTMLInputElement>): any;
	onBlur?(e: React.ChangeEvent<HTMLInputElement> & { rules: RuleValid[] }): any;
};

const check = (correct: boolean) => (assert: React.ReactNode, error: React.ReactNode) => (correct ? assert : error);

function findType(object: RuleObject, value: string, key: number, defaultIcons?: DefaultIcons, textStyle?: object) {
	const withError = check(object.matcher(value));
	const props = { key, style: textStyle };
	// eslint-disable-next-line no-undefined
	const customIcon = object.icons === undefined;
	if (defaultIcons && customIcon) {
		return withError(
			<TimelineItem {...props} dot={defaultIcons.assert}>
				{object.assert}
			</TimelineItem>,
			<TimelineItem {...props} dot={defaultIcons.error}>
				{object.error}
			</TimelineItem>
		);
	}
	return customIcon
		? withError(
				<TimelineItem {...props}>{object.assert}</TimelineItem>,
				<TimelineItem {...props} color="red">
					{object.error}
				</TimelineItem>
		  )
		: withError(
				<TimelineItem {...props} color={object.icons!.assert!}>
					{object.assert}
				</TimelineItem>,
				<TimelineItem {...props} color={object.icons!.error!}>
					{object.error}
				</TimelineItem>
		  );
}

type State = {
	input: string;
	useDefault: Boolean;
	rules?: RuleObject[];
};

export default class PasswordStrength extends React.Component<Props, State> {
	public constructor(props: any) {
		super(props);
		if (!this.props.useDefault) {
			this.state = {
				input: this.props.value,
				rules: this.props.rules,
				useDefault: this.props.useDefault
			};
		} else {
			this.state = {
				input: "",
				useDefault: this.props.useDefault,
				rules: defaults.concat(this.props.rules || [])
			};
		}
	}

	public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ input: e.target.value });
		return !!this.props.onChange ? this.props.onChange(e) : e;
	};

	public onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!!this.state.rules) {
			//@ts-ignore
			const rules: RuleValid[] = this.state.rules
				.map((x) => ({ [x.name]: !!x.matcher(this.state.input) }))
				.reduce((accumulator, element) => ({ ...accumulator, ...element }), {});
			const send: React.ChangeEvent<HTMLInputElement> & { rules: RuleValid[] } = { ...e, rules };
			return !!this.props.onBlur ? this.props.onBlur(send) : send;
		}
	};

	public render() {
		const { input } = this.state;
		const passwordCorrect = this.props.rules!.filter((x) => x.matcher(input));
		const ok = passwordCorrect.length !== this.props.rules!.length && !!input && input !== "";
		const showChecks = ok || this.props.viewChecks;
		return (
			<Container>
				<MaterialInput
					type="password"
					name={this.props.name}
					onFocus={this.props.onFocus}
					onBlur={this.onBlur}
					value={this.state.input}
					onChange={this.props.onChange}
					disabled={!!this.props.disabled}
					placeholder={this.props.placeholder}
					style={this.props.inputStyle}
				/>
				<Container isCollapse show={showChecks}>
					{showChecks && (
						<Timeline
							className={this.props.timelineClassName || ""}
							style={{ ...this.props.timeLineStyle, marginBottom: 0, paddingBottom: 0 }}
						>
							{(this.state.rules || []).map((x: RuleObject, i: number) =>
								findType(x, input, i, this.props.defaultIcons, this.props.textStyle)
							)}
						</Timeline>
					)}
				</Container>
			</Container>
		);
	}
}
