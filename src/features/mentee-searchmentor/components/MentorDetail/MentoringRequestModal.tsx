import { useState, useEffect } from "react";

import { X } from "lucide-react";

import { useFileMetaDataListByApplicationId } from "@/entities/document/services/getFileMetaDataListByApplicationId";

import { useGetApplications } from "@/features/mentee-dashboard/services/getApplications";
import { useCreateMentoring } from "@/features/mentee-searchmentor/services/createMentoring";

import { getCurrentMemberId } from "@/shared/lib/auth";
import { toast } from "@/shared/lib/toast";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

export interface MentoringRequestModalProps {
    open: boolean;
    onClose: () => void;
    mentorId: number;
    mentorName: string;
    className?: string;
    onSuccess?: () => void;
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

interface ApplicationSelectFieldProps {
    value: string;
    onChange: (value: string) => void;
    applications: Array<{ applicationId: number; companyName: string; applyPosition: string }>;
}

const ApplicationSelectField = ({ value, onChange, applications }: ApplicationSelectFieldProps) => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">
            지원서 선택 <span className="text-red-500">*</span>
        </label>
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="리뷰받을 지원 패키지를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
                {applications.length === 0 ? (
                    <SelectItem value="none" disabled>
                        아직 지원 패지키가 없습니다.
                    </SelectItem>
                ) : (
                    applications.map((app) => (
                        <SelectItem key={app.applicationId} value={String(app.applicationId)}>
                            {app.companyName} - {app.applyPosition}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    </div>
);

interface DocumentSelectFieldProps {
    value: string;
    onChange: (value: string) => void;
    applicationId: number | null;
    documents: Array<{ id: number; documentTitle: string; attachmentFileType: string }>;
    isLoading: boolean;
}

const DocumentSelectField = ({
    value,
    onChange,
    applicationId,
    documents,
    isLoading,
}: DocumentSelectFieldProps) => {
    if (!applicationId) {
        return (
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-900">
                    문서 선택 <span className="text-red-500">*</span>
                </label>
                <Select disabled>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="먼저 지원서를 선택해주세요" />
                    </SelectTrigger>
                </Select>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-900">
                문서 선택 <span className="text-red-500">*</span>
            </label>
            <Select value={value} onValueChange={onChange} disabled={isLoading}>
                <SelectTrigger className="w-full">
                    <SelectValue
                        placeholder={isLoading ? "문서를 불러오는 중..." : "문서를 선택해주세요"}
                    />
                </SelectTrigger>
                <SelectContent>
                    {documents.length === 0 ? (
                        <SelectItem value="none" disabled>
                            {isLoading ? "문서를 불러오는 중..." : "문서가 없습니다"}
                        </SelectItem>
                    ) : (
                        documents.map((doc) => (
                            <SelectItem key={doc.id} value={String(doc.id)}>
                                {doc.documentTitle} ({doc.attachmentFileType})
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

interface TitleFieldProps {
    value: string;
    onChange: (value: string) => void;
}

const TitleField = ({ value, onChange }: TitleFieldProps) => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">요청 제목</label>
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="멘토링 요청" />
    </div>
);

interface DescriptionFieldProps {
    value: string;
    onChange: (value: string) => void;
}

const DescriptionField = ({ value, onChange }: DescriptionFieldProps) => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">
            요청 메시지 <span className="text-red-500">*</span>
        </label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
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

interface DueDateFieldProps {
    value: string;
    onChange: (value: string) => void;
}

const DueDateField = ({ value, onChange }: DueDateFieldProps) => (
    <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-900">
            마감일 <span className="text-red-500">*</span>
        </label>
        <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} required />
    </div>
);

export const MentoringRequestModal = ({
    open,
    onClose,
    mentorId,
    mentorName,
    className,
    onSuccess,
}: MentoringRequestModalProps) => {
    const memberId = getCurrentMemberId();
    const [selectedApplicationId, setSelectedApplicationId] = useState<string>("");
    const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const { data: applicationsData } = useGetApplications({
        memberId,
        size: 100,
    });

    const applications = applicationsData?.applications ?? [];

    const { data: resumeFiles, isLoading: isLoadingResumes } = useFileMetaDataListByApplicationId(
        selectedApplicationId ? Number(selectedApplicationId) : 0,
        "RESUME",
        0,
        100,
        !!selectedApplicationId,
    );

    const { data: portfolioFiles, isLoading: isLoadingPortfolios } =
        useFileMetaDataListByApplicationId(
            selectedApplicationId ? Number(selectedApplicationId) : 0,
            "PORTFOLIO",
            0,
            100,
            !!selectedApplicationId,
        );

    const documents = [
        ...(resumeFiles?.content?.map((file) => ({
            id: file.id,
            documentTitle: file.documentTitle,
            attachmentFileType: "RESUME",
        })) ?? []),
        ...(portfolioFiles?.content?.map((file) => ({
            id: file.id,
            documentTitle: file.documentTitle,
            attachmentFileType: "PORTFOLIO",
        })) ?? []),
    ];

    const isLoadingDocuments = isLoadingResumes || isLoadingPortfolios;

    const createMentoringMutation = useCreateMentoring();

    useEffect(() => {
        if (!open) {
            setSelectedApplicationId("");
            setSelectedDocumentId("");
            setTitle("");
            setDescription("");
            setDueDate("");
        }
    }, [open]);

    useEffect(() => {
        setSelectedDocumentId("");
    }, [selectedApplicationId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedApplicationId || !selectedDocumentId || !description || !dueDate) {
            toast.error("필수 항목을 모두 입력해주세요.");
            return;
        }

        try {
            await createMentoringMutation.mutateAsync({
                mentorId,
                documentId: Number(selectedDocumentId),
                title: title || "멘토링 요청",
                dueDate: new Date(dueDate).toISOString(),
                description,
            });

            toast.success("멘토링 요청이 완료되었습니다.");
            onSuccess?.();
            onClose();
        } catch {
            toast.error("멘토링 요청에 실패했습니다.");
        }
    };

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

                <form className="px-6 py-5" onSubmit={handleSubmit}>
                    <MentorNameField mentorName={mentorName} />

                    <ApplicationSelectField
                        value={selectedApplicationId}
                        onChange={setSelectedApplicationId}
                        applications={applications}
                    />

                    <DocumentSelectField
                        value={selectedDocumentId}
                        onChange={setSelectedDocumentId}
                        applicationId={selectedApplicationId ? Number(selectedApplicationId) : null}
                        documents={documents}
                        isLoading={isLoadingDocuments}
                    />

                    <TitleField value={title} onChange={setTitle} />

                    <DueDateField value={dueDate} onChange={setDueDate} />

                    <DescriptionField value={description} onChange={setDescription} />

                    <div className="flex items-center justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            취소
                        </Button>
                        <Button
                            type="submit"
                            disabled={createMentoringMutation.isPending}
                            className="bg-slate-700 text-white hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {createMentoringMutation.isPending ? "요청 중..." : "요청 보내기"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
