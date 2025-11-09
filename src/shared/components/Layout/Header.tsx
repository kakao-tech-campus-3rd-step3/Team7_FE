export interface HeaderWithTitleProps {
    title: string;
    subtitle?: string;
}

export const HeaderWithTitle = ({ title, subtitle }: HeaderWithTitleProps) => {
    return (
        <header className="mb-3 flex flex-col ">
            <h2 className="text-2xl leading-7 font-semibold text-slate-900">{title}</h2>
            {subtitle && <h3 className="text-sm text-slate-700">{subtitle}</h3>}
        </header>
    );
};
