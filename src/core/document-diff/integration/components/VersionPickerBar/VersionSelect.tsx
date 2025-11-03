export interface VersionOption {
    id: string;
    label: string;
    subLabel?: string;
}

export interface VersionSelectProps {
    label: string;
    value?: string;
    options: VersionOption[];
    onChange: (id: string) => void;
    disabled?: boolean;
}

export const VersionSelect = ({
    label,
    value,
    options,
    onChange,
    disabled,
}: VersionSelectProps) => {
    return (
        <label className="inline-flex items-center gap-2">
            <span className="text-sm text-slate-600">{label}</span>
            <select
                className="h-9 rounded-md border bg-white px-3 text-sm outline-none transition-shadow
                   focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                aria-label={label}
            >
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    );
};
