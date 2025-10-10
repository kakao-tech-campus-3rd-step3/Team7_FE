import { useCallback, type PropsWithChildren } from "react";

import { CommentAreaPlaceholder } from "@/core/document-commenter/components/Comment/CommentAreaPlaceholder";
import { EventBusProvider, useEventBus } from "@/core/document-commenter/contexts/EventBusContext";
import { useLocalCoordinates } from "@/core/document-commenter/hooks/useLocalCoordinates";
import { SelectionEventPlugin } from "@/core/document-commenter/plugins/SelectionEventPlugin";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CommentAreaPlaceholder> = {
    component: CommentAreaPlaceholder,
};

export default meta;
type Story = StoryObj<typeof CommentAreaPlaceholder>;

const CommentableContainer = ({ children }: PropsWithChildren) => {
    const eventBus = useEventBus();

    const { ref: pageRef, getCoords } = useLocalCoordinates<HTMLDivElement>();

    const onMouseDown = useCallback(
        (event: React.MouseEvent) => {
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            if (!localCoords) return;
            eventBus.dispatch({ type: "raw:mousedown", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    const onMouseMove = useCallback(
        (event: React.MouseEvent) => {
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            if (!localCoords) return;
            eventBus.dispatch({ type: "raw:mousemove", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    const onMouseUp = useCallback(
        (event: React.MouseEvent) => {
            const localCoords = getCoords({ x: event.clientX, y: event.clientY });
            if (!localCoords) return;
            eventBus.dispatch({ type: "raw:mouseup", payload: localCoords });
        },
        [eventBus, getCoords],
    );

    return (
        <div
            style={{
                position: "relative",
                width: "600px",
                height: "400px",
                border: "1px solid black",
            }}
            ref={pageRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            {children}
        </div>
    );
};

export const Default: Story = {
    args: {
        borderColor: "#F6B13B",
        backgroundColor: "#F6B13B33",
    },
    render: (args) => {
        return (
            <EventBusProvider eventBusPlugins={[new SelectionEventPlugin()]}>
                <CommentableContainer>
                    <CommentAreaPlaceholder {...args} />
                </CommentableContainer>
            </EventBusProvider>
        );
    },
};
