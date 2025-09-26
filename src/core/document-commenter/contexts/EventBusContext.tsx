import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

import { EventBus } from "@/core/document-commenter/events/EventBus";
import type { EventController } from "@/core/document-commenter/events/EventController";

export const EventBusContext = createContext<EventBus | null>(null);

export interface EventBusProviderProps extends PropsWithChildren {
    eventControllers?: Array<EventController>;
}

export const EventBusProvider = ({ children, eventControllers }: EventBusProviderProps) => {
    const [eventBus] = useState(() => new EventBus());

    useEffect(() => {
        eventControllers?.forEach((controller) => {
            eventBus.use(controller);
        });

        return () => {
            eventControllers?.forEach((controller) => {
                controller.detach();
            });
        };
    }, [eventBus, eventControllers]);

    return <EventBusContext.Provider value={eventBus}>{children}</EventBusContext.Provider>;
};

export const useEventBus = () => {
    const eventBus = useContext(EventBusContext);
    if (!eventBus) {
        throw new Error("useEventBus must be used within an EventBusProvider");
    }
    return eventBus;
};
