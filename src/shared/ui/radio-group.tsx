import * as React from "react";

import { cn } from "@/shared/lib/utils";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

function RadioGroup({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="radio-group"
            className={cn("grid gap-2", className)}
            {...props}
        />
    );
}

function RadioGroupItem({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
    return (
        <RadioGroupPrimitive.Item
            data-slot="radio-group-item"
            className={cn(
                "peer aspect-square h-4 w-4 rounded-full border border-gray-300",
                "text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}

export { RadioGroup, RadioGroupItem };
