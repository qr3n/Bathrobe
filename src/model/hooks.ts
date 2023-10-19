import { useCallback, useContext, useRef, useState } from "react";
import { IBathrobeContext, ISteps } from "./types.ts";
import { BathrobeContext } from "./context.ts";

type ThrottleFunction = (direction: 'next' | 'previous') => unknown;

function useThrottle(callback: ThrottleFunction, delay: number) {
    const lastRan = useRef(0);

    return useCallback(
        (direction: 'next' | 'previous') => {
            const now = Date.now();
            if (now - lastRan.current >= delay) {
                lastRan.current = now;
                callback(direction);
            }
        },
        [callback, delay]
    );
}

export const useSteps = <T>(count: number, context: T, delay?: number): ISteps<T> => {
    const [[current, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        setPage([current + newDirection, newDirection]);
    };

    const next = () => {
        count - 1 > current && paginate(1)
    }
    const previous = () => {
        current > 0 && paginate(-1)
    }

    const callStep = (direction: 'next' | 'previous') => {
        direction === 'next' ? next() : previous()
    }

    const throttleCallStep = useThrottle(callStep, delay || 550)

    return {
        context,
        current,
        direction,
        next: () => throttleCallStep('next'),
        previous: () => throttleCallStep('previous'),
        isFirst: current === 0,
        isLast: current === count - 1,
    };
}

export const useBathrobeContext = <T>() => {
    return useContext<IBathrobeContext<T>>(BathrobeContext)
}