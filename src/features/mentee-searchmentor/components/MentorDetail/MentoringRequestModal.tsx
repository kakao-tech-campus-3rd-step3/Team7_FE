import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

export interface MentoringRequestModalProps {
    open: boolean;
    onClose: () => void;
    mentorName: string;
    className?: string;
}

interface MentorNameFieldProps {
    mentorName: string;
}

const MentorNameField = ({ mentorName }: MentorNameFieldProps) => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">멘토명</label>
        <Input value={mentorName} disabled className="bg-slate-50" />
    </div>
);

const ApplicationSelectField = () => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">
            지원 패키지 선택 <span className="text-red-500">*</span>
        </label>
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="리뷰받을 지원 패키지를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none" disabled>
                    지원 패키지를 선택해주세요
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
);

const TitleField = () => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">요청 제목</label>
        <Input placeholder="멘토링 요청" />
    </div>
);

const DescriptionField = () => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">
            요청 메시지 <span className="text-red-500">*</span>
        </label>
        <textarea
            placeholder="멘토님께 요청드리고 싶은 내용을 자세히 작성해주세요."
            rows={6}
            className={cn(
                "w-full rounded-md border border-slate-300 px-3 py-2 text-sm",
                "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                "disabled:bg-slate-50 disabled:text-slate-500",
                "resize-none",
            )}
            required
        />
    </div>
);

export const MentoringRequestModal = ({
    open,
    onClose,
    mentorName,
    className,
}: MentoringRequestModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div
                className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[92vw] max-w-[600px] max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl",
                    className,
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
                    <h3 className="text-lg font-semibold text-slate-900">멘토링 요청서 작성</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form className="px-6 py-5">
                    <MentorNameField mentorName={mentorName} />

                    <ApplicationSelectField />

                    <TitleField />

                    <DescriptionField />

                    <div className="flex items-center justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            취소
                        </Button>
                        <Button
                            type="submit"
                            className="bg-slate-700 text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            요청 보내기
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
