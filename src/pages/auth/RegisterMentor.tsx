import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

import { Upload, Plus } from "lucide-react";

import {
    RegisterMentorSchema,
    type RegisterMentorSchemaType,
} from "@/features/authentication/schema/RegisterSchema";
import { useRegisterMentor } from "@/features/authentication/services/registerMentor";

import { Button } from "@/shared/ui/button";
import { CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterMentor() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { mutate, isPending } = useRegisterMentor();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<RegisterMentorSchemaType>({
        resolver: zodResolver(RegisterMentorSchema),
        defaultValues: {
            commonInfo: {
                name: "",
                email: "",
                phoneNumber: "",
                profileImage: "",
                registrationId: "kakao",
                oauthId: searchParams.get("oauthId") || "",
            },
            careerYears: 1,
            currentCompany: "",
            currentPosition: "",
            employmentCertificate: "",
            certifications: [],
            educations: [],
            expertises: [],
            description: "",
            careers: [],
        },
    });

    const {
        fields: certificationFields,
        append: appendCertification,
        remove: removeCertification,
    } = useFieldArray({
        control,
        name: "certifications",
    });

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "educations",
    });

    const {
        fields: expertiseFields,
        append: appendExpertise,
        remove: removeExpertise,
    } = useFieldArray({
        control,
        name: "expertises",
    });

    const {
        fields: careerFields,
        append: appendCareer,
        remove: removeCareer,
    } = useFieldArray({
        control,
        name: "careers",
    });

    const [portfolio, setPortfolio] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setPortfolio(file);
        if (file) {
            setValue("employmentCertificate", file.name);
        }
    };

    const onSubmit = (data: RegisterMentorSchemaType) => {
        mutate(data, {
            onSuccess: () => {
                navigate("/mentor/dashboard");
            },
        });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <main className="py-8">
            <div className="container mx-auto max-w-2xl px-4">
                <div className="text-center mb-8">
                    <div className="text-2xl font-bold text-green-600 mb-4">Career-Fit</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">멘토 기본 정보 입력</h1>
                    <p className="text-gray-600">효과적인 멘토링을 위한 기본 정보를 입력해주세요</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    이름 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="실명을 입력해주세요"
                                    {...register("commonInfo.name")}
                                />
                                {errors.commonInfo?.name && (
                                    <p className="text-sm text-red-500">
                                        {errors.commonInfo.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    이메일 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    {...register("commonInfo.email")}
                                />
                                {errors.commonInfo?.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.commonInfo.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">
                                    전화번호 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    placeholder="010-0000-0000"
                                    {...register("commonInfo.phoneNumber")}
                                />
                                {errors.commonInfo?.phoneNumber && (
                                    <p className="text-sm text-red-500">
                                        {errors.commonInfo.phoneNumber.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="careerYears">
                                    경력 <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setValue("careerYears", parseInt(value))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="선택해주세요" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1년차</SelectItem>
                                        <SelectItem value="2">2년차</SelectItem>
                                        <SelectItem value="3">3년차</SelectItem>
                                        <SelectItem value="4">4년차</SelectItem>
                                        <SelectItem value="5">5년차</SelectItem>
                                        <SelectItem value="10">10년차 이상</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.careerYears && (
                                    <p className="text-sm text-red-500">
                                        {errors.careerYears.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentCompany">
                                    현재 회사 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="currentCompany"
                                    placeholder="예: 삼성전자"
                                    {...register("currentCompany")}
                                />
                                {errors.currentCompany && (
                                    <p className="text-sm text-red-500">
                                        {errors.currentCompany.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currentPosition">
                                    현재 직책 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="currentPosition"
                                    placeholder="예: Senior Software Engineer"
                                    {...register("currentPosition")}
                                />
                                {errors.currentPosition && (
                                    <p className="text-sm text-red-500">
                                        {errors.currentPosition.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="portfolio">
                                재직 증명서 <span className="text-red-500">*</span>
                            </Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                                <input
                                    type="file"
                                    id="portfolio"
                                    className="hidden"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileUpload}
                                />
                                <label htmlFor="portfolio" className="cursor-pointer">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <p className="text-sm text-gray-600">
                                        재직증명서, 명함, 사원증 등 현재 회사 재직을 증명할 수 있는
                                        서류를 업로드해주세요. (이미지 또는 PDF 파일)
                                    </p>
                                    {portfolio && (
                                        <p className="mt-2 text-sm text-green-600">
                                            선택된 파일: {portfolio.name}
                                        </p>
                                    )}
                                </label>
                            </div>
                            {errors.employmentCertificate && (
                                <p className="text-sm text-red-500">
                                    {errors.employmentCertificate.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>자격증</Label>
                                <Button
                                    type="button"
                                    onClick={() => appendCertification({ certificateName: "" })}
                                    size="sm"
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    추가
                                </Button>
                            </div>
                            {certificationFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input
                                        placeholder="자격증명을 입력해주세요"
                                        {...register(`certifications.${index}.certificateName`)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => removeCertification(index)}
                                        size="sm"
                                        variant="destructive"
                                    >
                                        삭제
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>학력</Label>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        appendEducation({
                                            schoolName: "",
                                            major: "",
                                            startYear: new Date().getFullYear() - 4,
                                            endYear: new Date().getFullYear(),
                                        })
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    추가
                                </Button>
                            </div>
                            {educationFields.map((field, index) => (
                                <div key={field.id} className="space-y-2 border rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            학력 {index + 1}
                                        </span>
                                        <Button
                                            type="button"
                                            onClick={() => removeEducation(index)}
                                            size="sm"
                                            variant="destructive"
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <Input
                                            placeholder="학교명"
                                            {...register(`educations.${index}.schoolName`)}
                                        />
                                        <Input
                                            placeholder="전공"
                                            {...register(`educations.${index}.major`)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <Input
                                            type="number"
                                            placeholder="입학년도"
                                            {...register(`educations.${index}.startYear`, {
                                                valueAsNumber: true,
                                            })}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="졸업년도"
                                            {...register(`educations.${index}.endYear`, {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>전문 분야</Label>
                                <Button
                                    type="button"
                                    onClick={() => appendExpertise({ expertiseName: "" })}
                                    size="sm"
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    추가
                                </Button>
                            </div>
                            {expertiseFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input
                                        placeholder="전문 분야를 입력해주세요"
                                        {...register(`expertises.${index}.expertiseName`)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => removeExpertise(index)}
                                        size="sm"
                                        variant="destructive"
                                    >
                                        삭제
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>경력 사항</Label>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        appendCareer({
                                            companyName: "",
                                            position: "",
                                            startDate: new Date().getFullYear() - 1,
                                            endDate: new Date().getFullYear(),
                                        })
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    추가
                                </Button>
                            </div>
                            {careerFields.map((field, index) => (
                                <div key={field.id} className="space-y-2 border rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            경력 {index + 1}
                                        </span>
                                        <Button
                                            type="button"
                                            onClick={() => removeCareer(index)}
                                            size="sm"
                                            variant="destructive"
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <Input
                                            placeholder="회사명"
                                            {...register(`careers.${index}.companyName`)}
                                        />
                                        <Input
                                            placeholder="직책"
                                            {...register(`careers.${index}.position`)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <Input
                                            type="number"
                                            placeholder="입사년도"
                                            {...register(`careers.${index}.startDate`, {
                                                valueAsNumber: true,
                                            })}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="퇴사년도"
                                            {...register(`careers.${index}.endDate`, {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">
                                멘토 한 줄 소개 <span className="text-red-500">*</span>
                            </Label>
                            <textarea
                                id="description"
                                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                placeholder="자신을 표현하는 짧은 문장을 입력해주세요"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col space-y-3">
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                                size="lg"
                                disabled={isPending}
                            >
                                {isPending ? "멘토 가입 신청 중..." : "멘토 가입 신청"}
                            </Button>

                            <Button
                                type="button"
                                onClick={handleGoBack}
                                variant="ghost"
                                className="w-full text-gray-600"
                            >
                                ← 역할 선택으로 돌아가기
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </div>
        </main>
    );
}
