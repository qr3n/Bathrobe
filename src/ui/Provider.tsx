import { ReactElement, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ISteps } from "../model";
import { BathrobeContext } from "../model";

interface IProps {
    children: ReactElement[],
    steps: ISteps<unknown>
}

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

export const BathrobeProvider = (props: IProps) => {
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) setHeight(ref.current.clientHeight);
        };

        updateHeight();

        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [ref]);

    return (
        <BathrobeContext.Provider value={{ steps: props.steps }}>
            <div style={{position: 'relative', height: height, overflow: 'hidden', width: '100%'}}>
                <AnimatePresence initial={false} custom={props.steps.direction}>
                    <motion.div
                        style={{position: 'absolute', width: '100%'}}
                        key={props.steps.current}
                        custom={props.steps.direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        ref={ref}
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                    >
                        {props.children[props.steps.current]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </BathrobeContext.Provider>
    );
};
