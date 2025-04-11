import { useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedDouble = ({ value, className, prefix }: { value: number, className?: string, prefix?: string }) => {
    const count = useMotionValue(value);
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        const controls = animate(count, value, {
            duration: 0.5,
            ease: "easeInOut",
        });
        return controls.stop;
    }, [count, value]);

    useMotionValueEvent(count, "change", (latest) => {
        setDisplayValue(Number(latest.toFixed(2))); // округление
    });

    return <span className={className}>{prefix}{displayValue}</span>
}

export default AnimatedDouble
