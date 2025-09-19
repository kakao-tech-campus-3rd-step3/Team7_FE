export interface DisableSelectionProps extends React.ComponentPropsWithoutRef<"div"> {
    children?: React.ReactNode;
}

export const DisableSelection = ({ children, ...props }: DisableSelectionProps) => {
    return (
        <div
            style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                ...props.style,
            }}
            {...props}
        >
            {children}
        </div>
    );
};
