import { createContext, useContext, useRef, type PropsWithChildren } from "react";

import { EventBus } from "@/core/document-commenter/events/EventBus";
import type { EventController } from "@/core/document-commenter/events/EventController";

export const EventBusContext = createContext<EventBus | null>(null);

export interface EventBusProviderProps extends PropsWithChildren {
    eventControllers?: Array<EventController>;
}

export const EventBusProvider = ({
    children,
    eventControllers,
}: EventBusProviderProps) => {
    const eventBus = useRef<Nullable<EventBus>>(null);

    if (!eventBus.current) {
        eventBus.current = new EventBus();

        eventControllers?.forEach((controller) => {
            eventBus.current?.use(controller);
        });
    }

    return <EventBusContext.Provider value={eventBus.current}>{children}</EventBusContext.Provider>;
};

export const useEventBus = () => {
    const eventBus = useContext(EventBusContext);
    if (!eventBus) {
        throw new Error("useEventBus must be used within an EventBusProvider");
    }
    return eventBus;
};
