import classnames from "classnames";
import { Uuid } from "lego";
import React from "react";
import { MdClose, MdDone, MdError, MdInfoOutline, MdWarning } from "react-icons/md";
import { toast, Toast, ToastOptions } from "react-toastify";
import { Container, View } from "../base";
import { SubTitle } from "../typography";

toast.configure({
	autoClose: 6000,
	draggable: true,
	newestOnTop: true,
	pauseOnFocusLoss: true,
	enableMultiContainer: true,
	pauseOnHover: true,
	closeButton: (
		<button className="Toastify__close-button Toastify__close-button--default" type="button" aria-label="close">
			<MdClose style={{ fontSize: "1.3rem" }} />
		</button>
	),
	closeOnClick: true
});

export type Themes = "info" | "success" | "warning" | "error" | "default" | "danger" | "dark";
export type ToastyThemes = "info" | "success" | "warning" | "error" | "default";

export type NotificationProps = {
	message: React.ReactNode;
	title?: React.ReactNode;
	icon?: React.ReactNode;
	showIcon?: boolean;
	theme?: Themes;
	toastId?: string;
} & ToastOptions;

const iconStyle = { verticalAlign: "middle", display: "inline-flex", marginBottom: "8px", marginRight: "2px" };

const getToastyCall = (theme: Themes, toasty: Toast): Toast => {
	if (theme === "default" || theme === "dark") {
		return toasty;
	}
	if (theme === "danger") {
		return toasty.error as Toast;
	}
	return toasty[theme];
};

const iconThemes: { [key: string]: JSX.Element } = {
	info: <MdInfoOutline style={iconStyle} />,
	dark: <MdInfoOutline style={iconStyle} />,
	success: <MdDone style={iconStyle} />,
	warning: <MdWarning style={iconStyle} />,
	error: <MdError style={iconStyle} />,
	danger: <MdError style={iconStyle} />,
	default: <MdInfoOutline style={iconStyle} />
};

const Notify = ({
	theme = "default",
	toastId = Uuid(),
	showIcon = true,
	message,
	title,
	icon,
	...props
}: NotificationProps): { toast: Toast; id: string } => {
	const toastCall = getToastyCall(theme, toast);
	const viewIcon = !!icon ? icon : iconThemes[theme];
	toastCall(
		<Container>
			{!!title && (
				<View className="mb2" span="100%">
					<SubTitle style={{ color: "inherit" }} size={0.65}>
						{showIcon && viewIcon} {title}
					</SubTitle>
				</View>
			)}
			<View span="100%">{message}</View>
		</Container>,
		{ ...props, className: classnames({ "Toastify__toast--dark": theme === "dark" }, props.className) }
	);
	return { id: toastId, toast };
};

export default Notify;
