import Notification, { NotifyType } from "./Notification";

type SnackbarType = Partial<NotifyType>;

const Snackbar = ({ children, ...props }: SnackbarType) =>
	Notification({
		containerClass: "tc center",
		position: "bottomCenter",
		clickClose: true,
		closable: false,
		hasIcon: false,
		theme: "dark",
		center: true,
		duration: 3,
		title: "",
		children,
		...props
	});

export default Snackbar;
