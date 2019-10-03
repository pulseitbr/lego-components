import Notification, { NotifyType } from "./Notification";

type SnackbarType = Partial<NotifyType>;

const Snackbar = ({ children, ...props }: SnackbarType) => {
    return Notification({
        containerClass: "tc center",
        position: "bottomCenter",
        closable: false,
        theme: "dark",
        center: true,
        duration: 3,
        title: "",
        children,
        ...props
    });
};

export default Snackbar;