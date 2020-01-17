import Notify, { NotificationProps } from "./notify";

const Snackbar = ({ message, ...props }: NotificationProps) =>
	Notify({
		...props,
		position: "bottom-center",
		title: "",
		theme: "dark",
		showIcon: false,
		message
	});

export default Snackbar;
