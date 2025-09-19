import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
    const [value, setValue] = useState<boolean>(initialValue);

    const toggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    return [value, toggle] as const;
};
