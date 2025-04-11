import {Loader2, X} from "lucide-react"
import {motion} from 'framer-motion'
import {useGlobalContext} from "../../utils/useGlobalProvider.tsx"
import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import clickOutsideHandler from "../../utils/clickOutsideHandler.tsx"
import SubPeriodType from "../../enums/SubscriptionType.tsx"
import {SubscriptionModel} from "../../models/SubscriptionModel.tsx"
import fetchAndHandleSubscriptions from "../../utils/fetchAndHandleSubscriptions.tsx";
import Config from "../../utils/Config.tsx";
import {Dictionary, DictionaryKey} from "../../utils/localization.tsx";
import {toast} from "sonner";
import delay from "../../utils/delay.tsx";
import Toggle from "./Toggle.tsx";
import AnimatedDouble from "./AnimatedDouble.tsx";

interface SubscriptionProps {
    defaultSub: SubscriptionModel
    onClose: () => void
}

export default function SubscriptionModal({defaultSub, onClose}: SubscriptionProps) {
    const globalContext = useGlobalContext()
    const [processing, setProcessing] = useState<boolean>(true)
    const [purchasing, setPurchasing] = useState<boolean>(false)
    const modalRef = useRef<HTMLDivElement | null>(null)
    const [selectedSub, setSelectedSub] = useState<SubscriptionModel | null>(null)
    const [selectedSubPeriod, setSelectedSubPeriod] = useState<SubPeriodType>(SubPeriodType.annually)
    const currentPrice = useMemo((): number | null => {
        return selectedSubPeriod === SubPeriodType.annually ? selectedSub?.annuallyPriceYear ?? null : selectedSub?.monthPrice ?? null
    }, [selectedSub, selectedSubPeriod])

    const updateSubscriptions = useCallback(async () => {
        setProcessing(true)
        await fetchAndHandleSubscriptions(globalContext.setSubscriptions)
        setProcessing(false)
    }, [globalContext.setSubscriptions])

    useEffect(() => clickOutsideHandler(modalRef, onClose), [onClose])

    useEffect(() => {
        if (defaultSub) {
            updateSubscriptions().then(() => {
            })
        }
    }, [defaultSub, updateSubscriptions])

    useEffect(() => {
        if (globalContext.subscriptions) {
            setSelectedSub(defaultSub)
        }
    }, [defaultSub, globalContext.subscriptions])

    async function purchaseSubmit() {
        try {
            setPurchasing(true)
            await delay(1500)
            onClose()
        } catch (e: any) {
            switch (await e.response.data.code) {
                case 2: // 400
                    toast.error(globalContext.localized(Dictionary.unauthorizedError))
                    break
                default:
                    toast.error(globalContext.localized(Dictionary.anyError))
            }
        } finally {
            setPurchasing(false)
        }
    }

    return (
        <>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex items-center justify-center z-50"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            >
                <motion.div
                    ref={modalRef}
                    className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-xl"
                    initial={{scale: 0.75, opacity: 0, y: 20}}
                    animate={{scale: 1, opacity: 1, y: 0}}
                    exit={{scale: 0.75, opacity: 0, y: 20}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                >

                    {/* X */}

                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6"/>
                    </button>

                    <div className="relative min-h-[200px]">

                        {/* Loader */}

                        {processing && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-600"/>
                            </div>
                        )}

                        <div
                            className={`transition-all duration-700 ease-in-out overflow-hidden ${processing ? 'max-h-0 opacity-0' : 'max-h-[650px] opacity-100'}`}>
                            <div className="space-y-6">

                                {/* Header */}

                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold mb-2">Choose Plan</h2>
                                </div>

                                {/* First Block */}

                                <div className="bg-gray-50 p-4 pb-3 rounded-lg">
                                    <div
                                        className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4">
                                        {/* Info */}
                                        <div className="text-center sm:text-left">
                                            <p className="font-bold">{selectedSub?.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {globalContext.localized(Dictionary[selectedSub?.benefits[0] as DictionaryKey])}
                                            </p>
                                        </div>

                                        {/* Toggle */}
                                        <div className="self-center sm:self-auto">
                                            <Toggle
                                                value={selectedSubPeriod}
                                                onChange={setSelectedSubPeriod}
                                                options={{
                                                    monthly: "Monthly",
                                                    annually: "Annually"
                                                }}
                                                horizontalPadding={8}
                                                height={35}
                                                capsuleMargin={3}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="border-t pt-3 flex justify-between items-center text-sm font-medium text-gray-800">
                                        <span>You pay now</span>
                                        <span className="flex items-center gap-2">
                                            {selectedSubPeriod === SubPeriodType.annually && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    $ {selectedSub && selectedSub?.monthPrice * 12}
                                                </span>
                                            )}
                                            {currentPrice && <AnimatedDouble value={currentPrice} prefix={"$"} className={"text-lg font-semibold text-black"}/>}
                                        </span>
                                    </div>
                                </div>

                                {/* Basic / Pro / Unlimited */}

                                <div className="grid grid-cols-1 sm:flex gap-2 mt-4">
                                    {globalContext.subscriptions?.toArray().map(sub => {
                                        const isSelected = selectedSub?.id === sub.id;
                                        const price = selectedSubPeriod === SubPeriodType.annually
                                            ? sub.annuallyPrice
                                            : sub.monthPrice;

                                        return (
                                            <button
                                                key={sub.name}
                                                onClick={() => setSelectedSub(sub)}
                                                className={`w-full sm:flex-1 px-4 py-3 rounded-lg border transition duration-200 ${isSelected ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-50 text-black'} flex justify-between items-center sm:flex-col sm:items-center sm:justify-center text-left sm:text-center`}
                                            >
                                                <div className="font-medium">{sub.name}</div>
                                                <div className="flex items-baseline gap-1 sm:justify-center sm:mt-1">
                                                    <AnimatedDouble value={price} prefix={"$"} className={`text-sm ${isSelected ? '' : 'text-gray-600'}`}/>
                                                    <span className={`text-sm ${isSelected ? '' : 'text-gray-600'}`}>/ mo</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Purchase */}

                                <button
                                    onClick={purchaseSubmit}
                                    disabled={purchasing}
                                    className={`w-full rounded-lg transition flex items-center justify-center h-10 ${processing ? 'bg-gray-700 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                                >
                                    {purchasing ? (
                                        <Loader2 className="animate-spin w-5 h-5"/>
                                    ) : (
                                        <span className="text-sm font-medium">Purchase</span>
                                    )}
                                </button>

                                {/* Explore plans */}

                                <div className="mt-6 pt-6 text-xs text-center text-gray-500 border-t">
                                    {`${globalContext.localized(Dictionary.subsExploreBenefits1)} `}
                                    <a
                                        href={`${Config.urls.main}#pricing`}
                                        target="_blank"
                                        className="underline hover:text-black"
                                    >
                                        {globalContext.localized(Dictionary.subsExploreBenefits2)}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}