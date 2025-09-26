import { Button } from "@/shared/ui/button";

export interface CreateVersionButtonProps {
    onClick?: () => void;
}

export const CreateVersionButton = ({ onClick }: CreateVersionButtonProps) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
        >
            + 새 버전 만들기
        </Button>
    );
};
