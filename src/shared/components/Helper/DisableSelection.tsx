export interface DisableSelectionProps extends React.ComponentPropsWithoutRef<"div"> {
    children?: React.ReactNode;
}

export const DisableSelection = ({ children, ...props }: DisableSelectionProps) => {
    const { style, ...rest } = props;

    return (
        <div
            {...rest}
            style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                ...style,
            }}
        >
            {children}
        </div>
    );
};
