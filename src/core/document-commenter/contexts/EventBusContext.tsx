import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

import { EventBus } from "@/core/document-commenter/events/EventBus";
import type { EventBusPlugin } from "@/core/document-commenter/events/EventBusPlugin";

export const EventBusContext = createContext<EventBus | null>(null);

export interface EventBusProviderProps extends PropsWithChildren {
    eventBusPlugins?: Array<EventBusPlugin>;
}

export const EventBusProvider = ({ children, eventBusPlugins }: EventBusProviderProps) => {
    const [eventBus] = useState(() => new EventBus());

    useEffect(() => {
        eventBusPlugins?.forEach((controller) => {
            eventBus.use(controller);
        });

        return () => {
            eventBusPlugins?.forEach((controller) => {
                controller.uninstall();
            });
        };
    }, [eventBus, eventBusPlugins]);

    return <EventBusContext.Provider value={eventBus}>{children}</EventBusContext.Provider>;
};

export const useEventBus = () => {
    const eventBus = useContext(EventBusContext);
    if (!eventBus) {
        throw new Error("useEventBus must be used within an EventBusProvider");
    }
    return eventBus;
};
