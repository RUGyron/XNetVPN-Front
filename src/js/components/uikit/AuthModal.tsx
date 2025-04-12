import {FormEvent, useEffect, useRef, useState} from "react"
import {X, Loader2} from "lucide-react"
import Config from "../../utils/Config.tsx"
// import {useNavigate} from "react-router-dom"
import {useGlobalContext} from "../../utils/useGlobalProvider.tsx"
import Cookies from "js-cookie"
import login from "../../api/login.tsx"
import {Dictionary} from "../../utils/localization.tsx"
import {motion} from 'framer-motion'
import clickOutsideHandler from "../../utils/clickOutsideHandler.tsx";

interface AuthProps {
    showed: boolean
    onClose: () => void
    onAuth: () => void
}

export default function AuthModal({showed, onClose, onAuth}: AuthProps) {

    // const navigate = useNavigate()
    const globalContext = useGlobalContext()
    const [key, setKey] = useState<string>("")
    const [errorKey, setErrorKey] = useState<string>("")
    const [processing, setProcessing] = useState<boolean>(false)
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => clickOutsideHandler(modalRef, onClose), [onClose])

    const onLoginSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            setProcessing(true)
            setErrorKey('')
            const auth = await login(key)
            Cookies.set('access', auth.tokens.access, {expires: Config.cookies.access.expireDuration})
            Cookies.set('refresh', auth.tokens.refresh, {expires: Config.cookies.refresh.expireDuration})
            globalContext.setLoggedIn(true)
            globalContext.setProfile(auth.profile)
            setErrorKey('')
            onAuth()
        } catch (e: any) {
            switch (await e.response.data.code) {
                case 2: // 400
                    setErrorKey(globalContext.localized(Dictionary.authErrorKey))
                    break
                default:
                    setErrorKey(globalContext.localized(Dictionary.anyError))
            }
            console.log(errorKey)
        } finally {
            setProcessing(false)
        }
    }

    if (!showed) return null

    return (
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

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Access Key</h2>
                    <p className="text-gray-600">Enter your key to access the VPN</p>
                </div>

                <form className="space-y-4" onSubmit={onLoginSubmit}>
                    <div>
                        <input
                            type="text"
                            className={`
    w-full px-4 py-2 rounded-lg transition
    ${errorKey
                                ? 'border border-red-500 focus:border-red-600'
                                : 'border border-gray-300 focus:border-gray-500'}
  `}
                            placeholder="Enter your access key"
                            value={key}
                            onChange={(e) => {
                                setKey(e.target.value)
                                setErrorKey('')
                            }}
                        />
                        <div
                            className={`text-sm text-red-500 mt-1 overflow-hidden transition-all duration-300 ${errorKey ? 'max-h-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                            {errorKey || '\u00A0'}
                        </div>
                    </div>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        New user? A key will be generated for you automatically.
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full rounded-lg transition flex items-center justify-center h-10 ${processing ? 'bg-gray-700 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                        {processing ? (
                            <Loader2 className="animate-spin w-5 h-5"/>
                        ) : (
                            <span className="text-sm font-medium">Sign In</span>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-6 text-xs text-center text-gray-500 border-t">
                    By continuing, you agree to our{" "}
                    <a
                        href={Config.urls.terms}
                        target="_blank"
                        className="underline hover:text-black"
                    >
                        Terms of Service
                    </a>
                </div>
            </motion.div>
        </motion.div>
    )
}