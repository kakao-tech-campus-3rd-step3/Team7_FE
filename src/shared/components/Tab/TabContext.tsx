import { createContext, useContext, useState, type PropsWithChildren } from "react";

export interface TabContextType<T extends readonly string[]> {
    activeTab: T[number];
    setActiveTab: React.Dispatch<React.SetStateAction<T[number]>>;
}

export const TabContext = createContext<TabContextType<readonly string[]> | null>(null);

export interface TabContextProviderProps<T extends readonly string[]> extends PropsWithChildren {
    defaultActiveTab: T[number];
}

export const TabContextProvider = <T extends readonly string[]>({
    defaultActiveTab,
    children,
}: TabContextProviderProps<T>) => {
    const [activeTab, setActiveTab] = useState<T[number]>(defaultActiveTab);
    return (
        <TabContext.Provider
            value={{
                activeTab,
                setActiveTab,
            }}
        >
            {children}
        </TabContext.Provider>
    );
};

export const useTabContext = <T extends readonly string[]>() => {
    const context = useContext(TabContext) as TabContextType<T> | null;
    if (!context) {
        throw new Error("useTabContext 는 TabContextProvider 내부에서만 사용 가능합니다.");
    }
    return context;
};
