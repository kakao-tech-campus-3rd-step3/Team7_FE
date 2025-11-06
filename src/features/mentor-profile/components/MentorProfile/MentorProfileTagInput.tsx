import { useState } from "react";

import { X, Plus } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export interface MentorProfileTagInputProps {
    label?: string;
    placeholder?: string;
    value: string[];
    onChange: (next: string[]) => void;
    className?: string;
}

export function MentorProfileTagInput({
    label,
    placeholder = "새 태그 입력",
    value,
    onChange,
    className,
}: MentorProfileTagInputProps) {
    const [inputText, setInputText] = useState("");

    const handleAddTag = () => {
        const trimmedText = inputText.trim();
        if (!trimmedText) return;
        if (value.includes(trimmedText)) {
            setInputText("");
            return;
        }
        onChange([...value, trimmedText]);
        setInputText("");
    };

    const handleRemoveTag = (tagIndex: number) => {
        const updatedTags = value.slice();
        updatedTags.splice(tagIndex, 1);
        onChange(updatedTags);
    };

    return (
        <div className={cn("w-full", className)}>
            {label && <div className="mb-2 text-sm font-medium text-muted-foreground">{label}</div>}

            <div className="flex flex-wrap items-center gap-2 mb-2">
                {value.map((tagName: string, tagIndex: number) => (
                    <div
                        key={tagName}
                        className="inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                            backgroundColor: "#DBEAFE",
                            color: "#1D4ED8",
                        }}
                    >
                        #{tagName}
                        <button
                            type="button"
                            className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded hover:bg-black/10"
                            aria-label={`${tagName} 제거`}
                            onClick={() => handleRemoveTag(tagIndex)}
                        >
                            <X className="h-3 w-3" style={{ color: "#1D4ED8" }} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                        }
                    }}
                />
                <Button type="button" onClick={handleAddTag} className="gap-1">
                    <Plus className="h-4 w-4" />
                    추가
                </Button>
            </div>
        </div>
    );
}
