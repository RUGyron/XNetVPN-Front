import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type ToggleProps<T extends string> = {
    value: T
    options: Record<T, React.ReactNode>
    onChange: (val: T) => void
    className?: string
    horizontalPadding?: number
    height?: number
    capsuleMargin?: number // влияет на отступы капсулы со всех сторон
}

export default function Toggle<T extends string>({
                                             value,
                                             options,
                                             onChange,
                                             className = "",
                                             horizontalPadding = 12,
                                             height = 36,
                                             capsuleMargin = 2
                                         }: ToggleProps<T>) {
    const keys = Object.keys(options) as T[]
    const measureRefs = useRef<Record<T, HTMLDivElement | null>>({} as any)
    const [maxTextWidth, setMaxTextWidth] = useState(0)

    useEffect(() => {
        let max = 0
        keys.forEach((key) => {
            const el = measureRefs.current[key]
            if (el) {
                const w = el.offsetWidth
                if (w > max) max = w
            }
        })
        setMaxTextWidth(max)
    }, [keys])

    // капсула и сегмент
    const capsuleBaseWidth = maxTextWidth + horizontalPadding * 2
    const capsuleWidth = capsuleBaseWidth - capsuleMargin * 2
    const segmentWidth = capsuleBaseWidth
    const toggleWidth = segmentWidth * keys.length
    const capsuleX = keys.indexOf(value) * segmentWidth + capsuleMargin

    return (
        <>
            {/* Измерение текста */}
            <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                {keys.map((key) => (
                    <div
                        key={key}
                        ref={(el) => (measureRefs.current[key] = el)}
                        className="inline-block text-sm font-medium px-[12px] py-[6px]"
                    >
                        {options[key]}
                    </div>
                ))}
            </div>

            <div
                className={`relative bg-gray-100 rounded-full overflow-hidden flex text-sm font-medium text-gray-500 ${className}`}
                style={{
                    height,
                    width: toggleWidth
                }}
            >
                {/* Анимационная капсула */}
                <motion.div
                    layout
                    className="absolute bg-white rounded-full shadow z-0"
                    animate={{
                        x: capsuleX,
                        width: capsuleWidth
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                        top: capsuleMargin,
                        bottom: capsuleMargin
                    }}
                />

                {keys.map((key) => (
                    <button
                        key={key}
                        onClick={() => onChange(key)}
                        className={`z-10 transition-colors text-center w-1/2 ${
                            value === key ? "text-black" : "hover:text-black"
                        }`}
                        style={{
                            paddingLeft: horizontalPadding,
                            paddingRight: horizontalPadding
                        }}
                    >
                        {options[key]}
                    </button>
                ))}
            </div>
        </>
    )
}