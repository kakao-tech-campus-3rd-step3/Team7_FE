import {
    FileText,
    FileImage,
    FileVideo,
    FileArchive,
    FileAudio,
    FileCode,
    FileSpreadsheet,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface FileIconByMimeTypeProps {
    ext?: string;
    mime?: string;
    size?: number;
    className?: string;
    withBadge?: boolean;
}

export function getFileIconMeta(ext: string, mime: string) {
    const lowerExt = (ext ?? "").toLowerCase();
    const lowerMime = (mime ?? "").toLowerCase();

    switch (true) {
        case lowerMime.startsWith("image/"):
            return { Comp: FileImage, badge: "bg-green-100 text-green-600" };
        case lowerMime.startsWith("video/"):
            return { Comp: FileVideo, badge: "bg-purple-100 text-purple-600" };
        case lowerMime.startsWith("audio/"):
            return { Comp: FileAudio, badge: "bg-indigo-100 text-indigo-600" };
        case lowerMime.includes("zip") || ["zip", "7z", "rar"].includes(lowerExt):
            return { Comp: FileArchive, badge: "bg-amber-100 text-amber-600" };
        case ["xls", "xlsx", "csv"].includes(lowerExt):
            return { Comp: FileSpreadsheet, badge: "bg-emerald-100 text-emerald-600" };
        case ["js", "ts", "tsx", "json", "html", "css", "java", "py"].includes(lowerExt):
            return { Comp: FileCode, badge: "bg-sky-100 text-sky-600" };
        default:
            return { Comp: FileText, badge: "bg-rose-100 text-rose-600" };
    }
}

export const FileIconByMimeType = ({
    ext = "",
    mime = "",
    size = 16,
    className,
    withBadge = true,
}: FileIconByMimeTypeProps) => {
    const { Comp, badge } = getFileIconMeta(ext, mime);
    return (
        <div
            className={cn(
                "grid size-8 place-items-center rounded",
                withBadge ? badge : undefined,
                className,
            )}
        >
            <Comp size={size} aria-hidden />
        </div>
    );
};
