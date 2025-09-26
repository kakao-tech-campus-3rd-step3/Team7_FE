import { useForm, type SubmitHandler } from "react-hook-form";

import type { Section } from "@/features/dashboard/models/types";

import { FormField as Field, inputClassName } from "@/shared/components/Form/FormField";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import {
    newApplicationSchema,
    type NewApplicationFormInput,
    type NewApplicationFormOutput,
    DEFAULT_APPLICATION,
} from "../../models/application.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export interface NewApplicationModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (payload: NewApplicationFormOutput & { targetSection?: Section }) => void;
    className?: string;
}

export const NewApplicationModal = ({
    open,
    onClose,
    onCreate,
    className,
}: NewApplicationModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<NewApplicationFormInput>({
        resolver: zodResolver(newApplicationSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: DEFAULT_APPLICATION,
    });

    const onSubmit: SubmitHandler<NewApplicationFormInput> = (formValues) => {
        const data: NewApplicationFormOutput = newApplicationSchema.parse(formValues);
        onCreate({ ...data, targetSection: "planned" });
        reset();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div
                className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[92vw] max-w-[720px] rounded-xl bg-white shadow-xl",
                    className,
                )}
            >
                <div className="px-6 py-5 border-b">
                    <h3 className="text-base font-semibold text-slate-900">정보 확인</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        지원하실 기업의 정보를 입력해 주세요.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="회사명" error={errors.companyName?.message}>
                            <input
                                {...register("companyName")}
                                placeholder="예) 삼성전자"
                                className={inputClassName(!!errors.companyName)}
                            />
                        </Field>

                        <Field label="지원 직무" error={errors.applyPosition?.message}>
                            <input
                                {...register("applyPosition")}
                                placeholder="예) DX부문 소프트웨어 개발"
                                className={inputClassName(!!errors.applyPosition)}
                            />
                        </Field>

                        <Field label="마감일" error={errors.deadline?.message}>
                            <input
                                type="date"
                                {...register("deadline")}
                                className={inputClassName(!!errors.deadline)}
                            />
                        </Field>

                        <Field label="근무지" error={errors.location?.message}>
                            <input
                                {...register("location")}
                                placeholder="예) 서울"
                                className={inputClassName(!!errors.location)}
                            />
                        </Field>

                        <Field label="고용 형태" error={errors.employmentType?.message}>
                            <input
                                {...register("employmentType")}
                                placeholder="예) 정규직"
                                className={inputClassName(!!errors.employmentType)}
                            />
                        </Field>

                        <Field label="경력 요구사항" error={errors.careerRequirement?.message}>
                            <input
                                type="number"
                                {...register("careerRequirement", {
                                    valueAsNumber: true,
                                    required: "경력 요구사항을 입력해 주세요.",
                                })}
                                placeholder="신입은 0, 경력은 년차"
                                className={inputClassName(!!errors.careerRequirement)}
                            />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field label="채용공고 URL" error={errors.url?.message}>
                                <input
                                    type="url"
                                    {...register("url")}
                                    placeholder="https://..."
                                    className={inputClassName(!!errors.url)}
                                />
                            </Field>
                        </div>
                    </div>

                    <div className="mt-4 border-t pt-4 flex items-center justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            이전
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="bg-[#2563EB] text-white hover:bg-[#1E4FD9] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "생성 중..." : "지원 패키지 생성"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
