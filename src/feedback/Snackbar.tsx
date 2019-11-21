import Notification, { NotificationProps } from "./Notification";

const Snackbar = ({ message, ...props }: NotificationProps) =>
	Notification({
		...props,
		position: "bottom-center",
		title: "",
		theme: "dark",
		showIcon: false,
		message
	});

export default Snackbar;
