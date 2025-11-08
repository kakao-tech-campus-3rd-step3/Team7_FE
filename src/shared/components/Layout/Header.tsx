export interface HeaderWithTitleProps {
    title: string;
}

export const HeaderWithTitle = ({ title }: HeaderWithTitleProps) => {
    return (
        <header className="mb-3 flex items-center justify-between">
            <h2 className="text-xl leading-7 font-semibold text-slate-900">{title}</h2>
        </header>
    );
};
