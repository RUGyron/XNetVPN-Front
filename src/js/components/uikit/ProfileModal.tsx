import {Copy, Loader2, User, X} from "lucide-react"
import {motion} from 'framer-motion'
import {useGlobalContext} from "../../utils/useGlobalProvider.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import getDeviceIcon from "../../enums/device.tsx";
import {Dictionary} from "../../utils/localization.tsx";
import fetchAndHandleProfile from "../../utils/fetchAndHandleProfile.tsx";
import clickOutsideHandler from "../../utils/clickOutsideHandler.tsx";
import {toast} from "sonner";
import formatDateReadable from "../../utils/formatDateReadable.tsx";

interface ProfileProps {
    showed: boolean
    onClose: () => void
    onSubChosen: () => void
}

export default function ProfileModal({showed, onClose, onSubChosen}: ProfileProps) {
    const globalContext = useGlobalContext()
    const [processing, setProcessing] = useState<boolean>(true)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const updateProfile = useCallback(async () => {
        setProcessing(true)
        await fetchAndHandleProfile(globalContext.setProfile, globalContext.setLoggedIn)
        setProcessing(false)
    }, [globalContext.setLoggedIn, globalContext.setProfile])

    useEffect(() => clickOutsideHandler(modalRef, onClose), [onClose])

    useEffect(() => {
        if (showed) {
            const run = async () => {
                await updateProfile()
            }
            run().then(() => {
            })
        }
    }, [showed, updateProfile])

    function onSignOut() {
        globalContext.setLoggedIn(false)
        globalContext.setProfile(null)
        Cookies.remove('access')
        Cookies.remove('refresh')
        onClose()
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
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6"/>
                </button>

                <div className="relative min-h-[200px]">
                    {processing && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-600"/>
                        </div>
                    )}
                    <div
                        className={`transition-all duration-700 ease-in-out overflow-hidden ${processing ? 'max-h-0 opacity-0' : 'max-h-[650px] opacity-100'}`}>
                        <div className="text-center mb-8">
                            <div
                                className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <User className="w-12 h-12 text-gray-600"/>
                            </div>
                            <h2 className="text-2xl font-bold">{globalContext.localized(Dictionary.profileTitle)}</h2>
                            <p
                                onClick={async () => {
                                    await navigator.clipboard.writeText(globalContext.profile?.id ?? '')
                                    toast.success(globalContext.localized(Dictionary.copiedToClipboard))
                                }}
                                className="inline-flex items-center gap-1 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded-2xl px-3 py-1.5 cursor-pointer hover:bg-gray-200 transition active:scale-95 select-none"
                                title="Click to copy"
                            >
                                <Copy className="w-4 h-4 text-gray-500"/>
                                {globalContext.profile?.id ?? ""}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">{globalContext.localized(Dictionary.profileCurrentPlan)}</h3>
                                {globalContext.profile?.subscription ? (() => {
                                    const sub = globalContext.profile?.subscription
                                    const profile = globalContext.profile
                                    const endDate = globalContext.profile?.subscriptionExpiresAt
                                    if (!sub || !profile || !endDate) return
                                    return (
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="font-bold">{globalContext.profile?.subscription.name ?? ""}</p>
                                                <p className="text-sm text-gray-600">{globalContext.localized(Dictionary.profileNextBilling)}: {formatDateReadable(endDate, globalContext.language)}</p>
                                            </div>
                                            <button className="text-sm text-black hover:underline">
                                                {globalContext.localized(Dictionary.profileUnsubscribe)}
                                            </button>
                                        </div>
                                    )
                                })() : (
                                    <button
                                        onClick={onSubChosen}
                                        className={`w-full rounded-lg transition flex items-center justify-center h-10 ${processing ? 'bg-gray-700 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                                    >
                                        <span className="text-sm font-medium">{globalContext.localized(Dictionary.profileExplore)}</span>
                                    </button>
                                )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">{globalContext.localized(Dictionary.profileConnectedDevices)}</h3>

                                <div className="max-h-[16vh] overflow-y-auto space-y-2 pr-1 custom-scroll">
                                    {globalContext.profile && globalContext.profile.devices.length > 0 ? (
                                        globalContext.profile.devices.map((device, i) => (
                                            <div key={i} className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <img
                                                        src={getDeviceIcon(device.type)}
                                                        className="w-5 h-5 mr-2"
                                                        alt={device.type}
                                                    />
                                                    <span
                                                        className="truncate overflow-hidden text-ellipsis max-w-[200px]">
                                                            {device.name}
                                                        </span>
                                                </div>
                                                <button className="text-sm text-red-600 hover:underline">
                                                    {globalContext.localized(Dictionary.profileDisconnectDevice)}
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-600">
                                            {globalContext.localized(Dictionary.noConnectedDevices)}
                                        </p>
                                    )
                                    }
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={onSignOut}
                                    className="px-4 h-10 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                    {globalContext.localized(Dictionary.profileSignOut)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
        </>
    )
        ;
}