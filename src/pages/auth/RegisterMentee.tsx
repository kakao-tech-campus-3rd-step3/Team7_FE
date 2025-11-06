import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Plus } from "lucide-react";

import {
    RegisterMenteeSchema,
    type RegisterMenteeSchemaType,
} from "@/features/authentication/schema/RegisterSchema";
import { useRegisterMentee } from "@/features/authentication/services/registerMentee";

import { Button } from "@/shared/ui/button";
import { CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterMentee() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { mutate, isPending } = useRegisterMentee();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterMenteeSchemaType>({
        resolver: zodResolver(RegisterMenteeSchema),
        defaultValues: {
            commonInfo: {
                name: "",
                email: "",
                phoneNumber: "",
                profileImage: "",
                registrationId: "kakao",
                oauthId: searchParams.get("oauthId") || "",
            },
            university: "",
            major: "",
            graduationYear: new Date().getFullYear(),
            wishCompanies: [],
            wishPositions: [],
        },
    });

    const {
        fields: wishCompanyFields,
        append: appendWishCompany,
        remove: removeWishCompany,
    } = useFieldArray({
        control,
        name: "wishCompanies",
    });

    const {
        fields: wishPositionFields,
        append: appendWishPosition,
        remove: removeWishPosition,
    } = useFieldArray({
        control,
        name: "wishPositions",
    });

    const onSubmit = (data: RegisterMenteeSchemaType) => {
        mutate(data, {
            onSuccess: () => {
                navigate("/mentee/dashboard");
            },
        });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <main className=" py-8">
            <div className="container mx-auto max-w-2xl px-4">
                <div className="text-center mb-8">
                    <div className="text-2xl font-bold text-blue-600 mb-4">Career-Fit</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">멘티 기본 정보 입력</h1>
                    <p className="text-gray-600">맞춤형 멘토링을 위한 기본 정보를 입력해주세요</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        {/* 이름, 이메일 */}
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

                        {/* 전화번호 */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">전화번호</Label>
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

                        {/* 대학교, 전공, 졸업년도 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="university">
                                    대학교 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="university"
                                    placeholder="예: 서울대학교"
                                    {...register("university")}
                                />
                                {errors.university && (
                                    <p className="text-sm text-red-500">
                                        {errors.university.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="major">
                                    전공 <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="major"
                                    placeholder="예: 컴퓨터공학과"
                                    {...register("major")}
                                />
                                {errors.major && (
                                    <p className="text-sm text-red-500">{errors.major.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="graduationYear">졸업년도</Label>
                                <Input
                                    id="graduationYear"
                                    type="number"
                                    placeholder="예: 2024"
                                    {...register("graduationYear", { valueAsNumber: true })}
                                />
                                {errors.graduationYear && (
                                    <p className="text-sm text-red-500">
                                        {errors.graduationYear.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 희망 회사 */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>희망 회사</Label>
                                <Button
                                    type="button"
                                    onClick={() => appendWishCompany({ companyName: "" })}
                                    size="sm"
                                    variant="outline"
                                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    추가
                                </Button>
                            </div>
                            {wishCompanyFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input
                                        placeholder="예: 삼성전자, 네이버"
                                        {...register(`wishCompanies.${index}.companyName`)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => removeWishCompany(index)}
                                        size="sm"
                                        variant="destructive"
                                    >
                                        삭제
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* 희망 직무 */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>희망 직무</Label>
                                <Button
                                    type="button"
                                    onClick={() => appendWishPosition({ positionName: "" })}
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    추가
                                </Button>
                            </div>
                            {wishPositionFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input
                                        placeholder="예: 프론트엔드 개발자, 백엔드 개발자"
                                        {...register(`wishPositions.${index}.positionName`)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => removeWishPosition(index)}
                                        size="sm"
                                        variant="destructive"
                                    >
                                        삭제
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* 버튼들 */}
                        <div className="flex flex-col space-y-3">
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                                size="lg"
                                disabled={isPending}
                            >
                                {isPending ? "회원가입 완료 중..." : "회원가입 완료"}
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
