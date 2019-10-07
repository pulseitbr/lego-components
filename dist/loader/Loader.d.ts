/// <reference types="react" />
export declare type Props = {
    size?: number;
    color?: string;
    border?: number;
    velocity?: number;
    className?: string;
};
declare const Loader: ({ color, velocity, border, size, className, ...props }: Props) => JSX.Element;
export default Loader;
