import { memo, useMemo } from "react";

import { CalendarDays, FileText } from "lucide-react";

import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";

export interface VersionRadioItem {
    id?: string;
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

const toRadioValue = (id: string | undefined) => id ?? "";
const fromRadioValue = (val: string): string | undefined => (val === "" ? undefined : val);

const VersionRadioListItem = memo(function VersionRadioListItem({
    item,
    checked,
}: {
    item: VersionRadioItem;
    checked: boolean;
    onChange?: (id: string | undefined) => void;
}) {
    const radioId = useMemo(() => (item.id ?? "blank") + "-" + item.title, [item.id, item.title]);

    return (
        <li
            className={[
                "flex items-center justify-between rounded-lg border bg-white px-4 py-3 transition",
                checked ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200",
            ].join(" ")}
        >
            <div className="flex w-full items-center gap-3">
                <RadioGroupItem id={radioId} value={toRadioValue(item.id)} className="mt-0.5" />
                <Label
                    htmlFor={radioId}
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-3"
                >
                    <div className="grid size-8 place-items-center rounded-md bg-green-50 text-green-600">
                        <FileText size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
                        {item.description && (
                            <p className="truncate text-xs text-gray-500">{item.description}</p>
                        )}
                    </div>
                    {item.date && (
                        <div className="hidden shrink-0 items-center gap-1 text-xs text-gray-500 md:flex">
                            <CalendarDays size={14} />
                            <span>{item.date}</span>
                        </div>
                    )}
                </Label>
            </div>
        </li>
    );
});

export const VersionRadioList = ({ title, items, value, onChange }: VersionRadioListProps) => {
    const radioValue = toRadioValue(value);
    const safeItems = Array.isArray(items) ? items : [];

    return (
        <section className="space-y-3">
            {title && <h3 className="text-sm font-medium text-gray-800">{title}</h3>}
            <RadioGroup
                value={radioValue}
                onValueChange={(val: string) => onChange?.(fromRadioValue(val))}
                className="space-y-2"
            >
                <ul className="space-y-2">
                    {safeItems.map((it) => {
                        const isChecked = radioValue === toRadioValue(it.id);
                        return (
                            <VersionRadioListItem
                                key={(it.id ?? "blank") + it.title}
                                item={it}
                                checked={isChecked}
                                onChange={onChange}
                            />
                        );
                    })}
                </ul>
            </RadioGroup>
        </section>
    );
};
