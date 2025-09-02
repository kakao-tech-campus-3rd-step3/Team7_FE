import { ZoomIn, ZoomOut } from "lucide-react";

export interface VersionNavMagnifyControllerProps {
    onZoomIn?: () => void;
    onZoomOut?: () => void;
}

export const VersionNavMagnifyController = ({
    onZoomIn,
    onZoomOut,
}: VersionNavMagnifyControllerProps) => {
    return (
        <div className="flex gap-2 mr-3 [&>button]:text-gray-500 [&>button]:cursor-pointer">
            <button onClick={onZoomIn} aria-label="확대">
                <ZoomIn size={16} />
            </button>
            <button onClick={onZoomOut} aria-label="축소">
                <ZoomOut size={16} />
            </button>
        </div>
    );
};
