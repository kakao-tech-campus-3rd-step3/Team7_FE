import { useEffect } from "react";

import { useEventBus } from "@/core/document-commenter/contexts/EventBusContext";
import type { EventHandlerOf, EventTypes } from "@/core/document-commenter/events/EventTypes";

export const useEventBusSubscription = <K extends keyof EventTypes>(
    eventType: K,
    handler: (payload: EventTypes[K]) => void,
) => {
    const eventBus = useEventBus();

    useEffect(() => {
        const eventHandler: EventHandlerOf<K> = (event) => {
            handler(event.payload);
        };

        eventBus.subscribe(eventType, eventHandler);

        return () => {
            eventBus.unsubscribe(eventType, eventHandler);
        };
    }, [eventBus, eventType, handler]);
};
