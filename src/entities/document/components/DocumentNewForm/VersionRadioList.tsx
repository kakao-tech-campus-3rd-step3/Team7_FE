import { useId } from "react";

import { CalendarDays, FileText } from "lucide-react";

export interface VersionRadioItem {
    id: string | undefined;
    title: string;
    description?: string;
    date?: string;
}

export interface VersionRadioListProps {
    title: string;
    items: VersionRadioItem[];
    value?: string;
    onChange?: (id: string | undefined) => void;
}

export const VersionRadioList = ({ title, items, value, onChange }: VersionRadioListProps) => {
    const name = useId();

    return (
        <section className="space-y-3">
            {title ? <h3 className="text-sm font-medium text-gray-800">{title}</h3> : null}
            <ul className="space-y-2">
                {items.map((it) => {
                    const checked = (value ?? "") === (it.id ?? "");
                    return (
                        <li
                            key={(it.id ?? "blank") + it.title}
                            className={[
                                "flex items-center justify-between rounded-lg border bg-white px-4 py-3",
                                checked
                                    ? "border-blue-500 ring-2 ring-blue-200"
                                    : "border-gray-200",
                            ].join(" ")}
                        >
                            <label className="flex w-full cursor-pointer items-center gap-3">
                                <input
                                    type="radio"
                                    name={name}
                                    value={it.id ?? ""}
                                    checked={checked}
                                    onChange={() => onChange?.(it.id)}
                                    className="size-4 accent-blue-600"
                                    aria-label={it.title}
                                />
                                <div className="flex min-w-0 flex-1 items-center gap-3">
                                    <div className="grid size-8 place-items-center rounded-md bg-green-50 text-green-600">
                                        <FileText size={16} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {it.title}
                                        </p>
                                        {it.description && (
                                            <p className="truncate text-xs text-gray-500">
                                                {it.description}
                                            </p>
                                        )}
                                    </div>
                                    {it.date && (
                                        <div className="hidden shrink-0 items-center gap-1 text-xs text-gray-500 md:flex">
                                            <CalendarDays size={14} />
                                            <span>{it.date}</span>
                                        </div>
                                    )}
                                </div>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
