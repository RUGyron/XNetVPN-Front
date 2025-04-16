import {useContext, useEffect, useState} from 'react'
import {
    Apple,
    CheckCircle,
    CreditCard,
    Download,
    Globe,
    Key,
    Loader2,
    Lock,
    Monitor,
    Server,
    Smartphone,
    User,
    Zap
} from 'lucide-react'

import Config from "../utils/Config.tsx"
import {ScrollToHash} from "../utils/funcs.tsx"
import AuthModal from "./uikit/AuthModal.tsx"
// import {useNavigate} from "react-router-dom"
import {useGlobalContext} from "../utils/useGlobalProvider.tsx"
import {GlobalContext} from "../utils/GlobalProvider.tsx"
import {AnimatePresence} from 'framer-motion'
import ProfileModal from "./uikit/ProfileModal.tsx";
import {Toaster} from 'sonner'
import {Dictionary, DictionaryKey} from "../utils/localization.tsx";
import SubscriptionModal from "./uikit/SubscriptionModal.tsx";
import scrollTo from "../utils/scrollTo.tsx";
import {SubscriptionModel} from "../models/SubscriptionModel.tsx";
import Skeleton from "./uikit/Skeleton.tsx";
import AnimatedDouble from "./uikit/AnimatedDouble.tsx";
import switchModals from "../utils/switchModals.tsx";
import Language from "../enums/language.tsx";

function MainPage() {
    // const navigate = useNavigate()
    const globalContext = useGlobalContext()
    const {loggedIn} = useContext(GlobalContext)
    const [authShowed, setAuthShowed] = useState<boolean>(false)
    const [profileShowed, setProfileShowed] = useState<boolean>(false)
    const [subShowed, setSubShowed] = useState<SubscriptionModel | null>(null)

    useEffect(() => {
        console.log(navigator.language)
    }, [])

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="bg-black text-white py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={"img/shield.svg"} alt={"shield"} width={25} height={25}/>
                            <span className="text-2xl font-bold">XNet</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Language Toggle */}
                            <button
                                onClick={() =>
                                    globalContext.setLanguage(globalContext.language === Language.english ? Language.russian : Language.english)
                                }
                                className="text-sm text-white bg-transparent hover:bg-white hover:text-black transition px-4 py-2 rounded-full border border-white"
                            >
                                {globalContext.language === 'en' ? 'RU' : 'EN'}
                            </button>

                            {/* Profile or Auth */}
                            {loggedIn === null ? (
                                <button
                                    disabled={true}
                                    className="bg-gray-300 text-black px-6 py-2.5 rounded-full font-semibold hover:bg-gray-300 transition"
                                >
                                    <Loader2 className="animate-spin w-5 h-5"/>
                                </button>
                            ) : loggedIn ? (
                                <button
                                    onClick={() => setProfileShowed(true)}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition flex items-center"
                                >
                                    <User className="w-5 h-5 mr-2"/>
                                    {globalContext.localized(Dictionary.heroProfileButton)}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setAuthShowed(true)}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
                                >
                                    {globalContext.localized(Dictionary.heroSignInButton)}
                                </button>
                            )}
                        </div>
                    </nav>

                    <div className="max-w-3xl mx-auto text-center mt-20 mb-20">
                        <h1 className="text-5xl font-bold mb-6">{globalContext.localized(Dictionary.heroTitle)}</h1>
                        <p className="text-xl text-gray-300 mb-8">{globalContext.localized(Dictionary.heroSubTitle)}</p>
                        <div className="flex justify-center space-x-4">
                            {globalContext.subscriptions ? (() => {
                                const sub = globalContext.subscriptions?.pro
                                if (!sub) return
                                return <button
                                    onClick={() => {
                                        if (!globalContext.loggedIn) {
                                            setAuthShowed(true)
                                        } else {
                                            setSubShowed(sub)
                                        }
                                    }}
                                    className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center hover:bg-gray-300 transition"
                                >
                                    {globalContext.localized(Dictionary.heroGetStartedButton)}
                                </button>
                            })() : (
                                <button
                                    disabled={true}
                                    className="bg-gray-200 text-black px-8 py-3 rounded-full font-semibold flex items-center hover:bg-gray-300 transition"
                                >
                                    <Loader2 className="animate-spin w-5 h-5"/>
                                </button>
                            )}
                            <button
                                onClick={() => scrollTo('pricing')}
                                className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
                            >
                                {globalContext.localized(Dictionary.heroViewPlansButton)}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">{globalContext.localized(Dictionary.guideTitle)}</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">

                        {/* Step 1 */}
                        <div className="text-center relative">
                            <div
                                className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <CreditCard className="w-10 h-10 text-black"/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{globalContext.localized(Dictionary.guide1Title)}</h3>
                            <p className="text-gray-600">{globalContext.localized(Dictionary.guide1SubTitle)}</p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center relative">
                            <div
                                className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Key className="w-10 h-10 text-black"/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{globalContext.localized(Dictionary.guide2Title)}</h3>
                            <p className="text-gray-600">{globalContext.localized(Dictionary.guide2SubTitle)}</p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center relative">
                            <div
                                className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Lock className="w-10 h-10 text-black"/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{globalContext.localized(Dictionary.guide3Title)}</h3>
                            <p className="text-gray-600">{globalContext.localized(Dictionary.guide3SubTitle)}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">{globalContext.localized(Dictionary.downloadTitle)}</h2>
                        <p className="text-xl text-gray-300">{globalContext.localized(Dictionary.downloadSubTitle)}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div
                            className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
                            <Apple className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-4">iOS {globalContext.localized(Dictionary.downloadApp)}</h3>
                            <button
                                className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                                <span>App Store</span>
                                <Download className="w-5 h-5"/>
                            </button>
                        </div>
                        <div
                            className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
                            <Smartphone className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-4">Android {globalContext.localized(Dictionary.downloadApp)}</h3>
                            <button
                                className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                                <span>Google Play</span>
                                <Download className="w-5 h-5"/>
                            </button>
                        </div>
                        <div
                            className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
                            <Monitor className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-4">Windows {globalContext.localized(Dictionary.downloadApp)}</h3>
                            <button
                                className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                                <span>Windows</span>
                                <Download className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="bg-black p-4 rounded-full inline-block mb-4">
                                <Globe className="w-8 h-8 text-white"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{globalContext.localized(Dictionary.benefits1Title)}</h3>
                            <p className="text-gray-600">{globalContext.localized(Dictionary.benefits1SubTitle)}</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-black p-4 rounded-full inline-block mb-4">
                                <Zap className="w-8 h-8 text-white"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{globalContext.localized(Dictionary.benefits2Title)}</h3>
                            <p className="text-gray-600">{globalContext.localized(Dictionary.benefits2SubTitle)}</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-black p-4 rounded-full inline-block mb-4">
                                <Server className="w-8 h-8 text-white"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{globalContext.localized(Dictionary.benefits3Title)}</h3>
                            <p className="text-gray-600">{globalContext.localized(Dictionary.benefits3SubTitle)}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20" id="pricing">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">{globalContext.localized(Dictionary.pricingTitle)}</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div className="border rounded-2xl p-8 hover:shadow-lg transition flex flex-col h-full">
                            <h3 className="text-xl font-bold mb-4">{globalContext.subscriptions?.basic.name ?? <Skeleton className="h-8 w-1/3" />}</h3>
                            <div className="text-4xl font-bold mb-4">
                                {globalContext.subscriptions ? (
                                    <>
                                        <AnimatedDouble value={globalContext.subscriptions.basic.annuallyPrice} prefix={"$"}/>
                                        <span className="text-lg text-gray-500">/{globalContext.localized(Dictionary.pricingMo)}</span>
                                    </>
                                ) : (
                                    <Skeleton className="h-10 w-2/3" />
                                )}
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {globalContext.subscriptions ? (
                                    globalContext.subscriptions.basic.benefits.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <CheckCircle className="w-5 h-5 mr-2 text-black"/>
                                                {globalContext.localized(Dictionary[feature as DictionaryKey])}
                                            </li>
                                        ))
                                ) : (
                                    [...Array(5)].map((_, index) => (
                                        <Skeleton key={index} className={"w-full h-6"}/>
                                    ))
                                )}
                            </ul>
                            <button
                                onClick={() => {
                                    if (loggedIn) {
                                        if (globalContext.subscriptions) {
                                            setSubShowed(globalContext.subscriptions?.basic)
                                        }
                                    } else {
                                        setAuthShowed(true)
                                    }
                                }}
                                className="w-full h-12 border border-black rounded-full hover:bg-black hover:text-white transition">
                                {globalContext.localized(Dictionary.pricingSelectPlan)}
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div
                            className="border-2 border-black rounded-2xl p-8 hover:shadow-lg transition relative flex flex-col h-full">
                            <div
                                className="absolute top-0 right-0 bg-black text-white px-4 py-1 rounded-bl-lg rounded-tr-xl text-sm">
                                {globalContext.localized(Dictionary.pricingPopular)}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{globalContext.subscriptions?.pro.name ?? <Skeleton className="h-8 w-1/3" />}</h3>
                            <div className="text-4xl font-bold mb-4">
                                {globalContext.subscriptions ? (
                                    <>
                                        <AnimatedDouble value={globalContext.subscriptions.pro.annuallyPrice} prefix={"$"}/>
                                        <span className="text-lg text-gray-500">/{globalContext.localized(Dictionary.pricingMo)}</span>
                                    </>
                                ) : (
                                    <Skeleton className="h-10 w-2/3" />
                                )}
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {globalContext.subscriptions ? (
                                    globalContext.subscriptions.pro.benefits.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <CheckCircle className="w-5 h-5 mr-2 text-black"/>
                                            {globalContext.localized(Dictionary[feature as DictionaryKey])}
                                        </li>
                                    ))
                                ) : (
                                    [...Array(5)].map((_, index) => (
                                        <Skeleton key={index} className={"w-full h-6"}/>
                                    ))
                                )}
                            </ul>
                            <button
                                onClick={() => {
                                    if (loggedIn) {
                                        if (globalContext.subscriptions) {
                                            setSubShowed(globalContext.subscriptions?.pro)
                                        }
                                    } else {
                                        setAuthShowed(true)
                                    }
                                }}
                                className="w-full h-12 bg-black text-white rounded-full hover:bg-gray-800 transition">
                                {globalContext.localized(Dictionary.pricingSelectPlan)}
                            </button>
                        </div>

                        {/* Unlimited Plan */}
                        <div className="border rounded-2xl p-8 hover:shadow-lg transition flex flex-col h-full">
                            <h3 className="text-xl font-bold mb-4">{globalContext.subscriptions?.unlimited.name ?? <Skeleton className="h-8 w-1/3" />}</h3>
                            <div className="text-4xl font-bold mb-4">
                                {globalContext.subscriptions ? (
                                    <>
                                        <AnimatedDouble value={globalContext.subscriptions.unlimited.annuallyPrice} prefix={"$"}/>
                                        <span className="text-lg text-gray-500">/{globalContext.localized(Dictionary.pricingMo)}</span>
                                    </>
                                ) : (
                                    <Skeleton className="h-10 w-2/3" />
                                )}
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {globalContext.subscriptions ? (
                                    globalContext.subscriptions.unlimited.benefits.map((feature, index) => (
                                        <li key={feature} className="flex items-center">
                                            {index === 0 ? (
                                                <img src={"./img/ai.png"} className="w-5 h-5 mr-2" alt="ai"/>
                                            ) : (
                                                <CheckCircle className="w-5 h-5 mr-2 text-black"/>
                                            )}
                                            {globalContext.localized(Dictionary[feature as DictionaryKey])}
                                        </li>
                                    ))
                                ) : (
                                    [...Array(5)].map((_, key) => (
                                        <Skeleton key={key} className={"w-full h-6"}/>
                                    ))
                                )}
                            </ul>
                            <button
                                onClick={() => {
                                    if (loggedIn) {
                                        if (globalContext.subscriptions) {
                                            setSubShowed(globalContext.subscriptions?.unlimited)
                                        }
                                    } else {
                                        setAuthShowed(true)
                                    }
                                }}
                                className="w-full h-12 border border-black rounded-full hover:bg-black hover:text-white transition">
                                {globalContext.localized(Dictionary.pricingSelectPlan)}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <div className="md:justify-self-start">
                            <h4 className="font-bold text-lg mb-4">{globalContext.localized(Dictionary.legalHeader)}</h4>
                            <ul className="space-y-2">
                                <li><a href={Config.urls.policy} target="_blank"
                                       className="hover:text-gray-300 transition">{globalContext.localized(Dictionary.legalPrivacy)}</a>
                                </li>
                                <li><a href={Config.urls.terms} target="_blank"
                                       className="hover:text-gray-300 transition">{globalContext.localized(Dictionary.legalTerms)}</a>
                                </li>
                                <li><a href={Config.urls.refund} target="_blank"
                                       className="hover:text-gray-300 transition">{globalContext.localized(Dictionary.legalRefund)}</a>
                                </li>
                            </ul>
                        </div>
                        <div className="md:justify-self-end md:text-right">
                            <h4 className="font-bold text-lg mb-4">{globalContext.localized(Dictionary.legalContacts)}</h4>
                            <ul className="space-y-2">
                                <li>{globalContext.localized(Dictionary.legalEmail)}: <a className="hover:text-gray-300 transition"
                                              href={"mailto:support@xnetapps.com"}>support@xnetapps.com</a></li>
                                <li>{globalContext.localized(Dictionary.legalAddress)}</li>
                                <li>{globalContext.localized(Dictionary.legalTIN)}: {globalContext.localized(Dictionary.legalFullName)} 183208089374</li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="border-t border-gray-800 mt-16 pt-12 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <img src={"img/shield.svg"} alt={"shield"} width={25} height={25}/>
                            <span className="text-xl font-bold">XNet</span>
                        </div>
                        <div className="text-sm text-gray-400">{globalContext.localized(Dictionary.legalRights)}</div>
                    </div>
                </div>
            </footer>
            {profileShowed}

            {/* Auth Modal */}
            <AnimatePresence>
                {authShowed && (
                    <AuthModal
                        showed={authShowed}
                        onClose={() => setAuthShowed(false)}
                        onAuth={() => switchModals(() => setAuthShowed(false), () => setProfileShowed(true))}
                    />
                )}
            </AnimatePresence>

            {/* Profile Modal */}
            <AnimatePresence>
                {profileShowed && (
                    <ProfileModal
                        showed={profileShowed}
                        onClose={() => setProfileShowed(false)}
                        onSubChosen={() => switchModals(() => setProfileShowed(false), () => setSubShowed(globalContext.subscriptions?.pro ?? null))}
                    />
                )}
            </AnimatePresence>

            {/* Sub Modal */}
            <AnimatePresence>
                {subShowed && (
                    <SubscriptionModal defaultSub={subShowed} onClose={() => setSubShowed(null)}/>
                )}
            </AnimatePresence>

            <Toaster
                duration={5000}
                toastOptions={{
                    className: 'text-base px-6 py-4 rounded-xl shadow-lg',
                    style: {
                        fontSize: '15px',
                    },
                }}
            />

            <ScrollToHash/>
        </div>
    );
}

export default MainPage;