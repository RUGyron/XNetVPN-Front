import {useContext, useState} from 'react'
import {
    Globe,
    Zap,
    Server,
    CheckCircle,
    Apple,
    Smartphone,
    Monitor,
    Download,
    User,
    CreditCard,
    Key,
    Lock
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

function MainPage() {
    // const navigate = useNavigate()
    const globalContext = useGlobalContext()
    const {loggedIn} = useContext(GlobalContext)
    const [authShowed, setAuthShowed] = useState<boolean>(false)
    const [profileShowed, setProfileShowed] = useState<boolean>(false)
    const [subShowed, setSubShowed] = useState<SubscriptionModel | null>(null)

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="bg-black text-white py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            {/*<Shield className="w-8 h-8" />*/}
                            <img src={"img/shield.svg"} alt={"shield"} width={25} height={25}/>
                            <span className="text-2xl font-bold">XNet</span>
                        </div>
                        {loggedIn ? (
                            <button
                                onClick={() => setProfileShowed(true)}
                                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition flex items-center"
                            >
                                <User className="w-5 h-5 mr-2"/>
                                Profile
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setAuthShowed(true)
                                }}
                                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
                            >
                                Sign In
                            </button>
                        )}
                    </nav>

                    <div className="max-w-3xl mx-auto text-center mt-20 mb-20">
                        <h1 className="text-5xl font-bold mb-6">Secure and Fast VPN Service</h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Access the internet freely and securely with XNet VPN.
                            Military-grade encryption, unlimited bandwidth, and servers worldwide.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    setAuthShowed(true)
                                }}
                                className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center hover:bg-gray-100 transition"
                            >
                                Get Started
                            </button>
                            <button
                                onClick={() => scrollTo('pricing')}
                                className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
                            >
                                View Plans
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
                        {/* Connecting Lines */}
                        <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gray-300"></div>
                        <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gray-300"></div>

                        {/* Step 1 */}
                        <div className="text-center relative">
                            <div
                                className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <CreditCard className="w-10 h-10 text-black"/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">1. Purchase</h3>
                            <p className="text-gray-600">Choose your plan and complete the purchase securely</p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center relative">
                            <div
                                className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Key className="w-10 h-10 text-black"/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">2. Get Access Key</h3>
                            <p className="text-gray-600">Receive your unique access key via email</p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center relative">
                            <div
                                className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Lock className="w-10 h-10 text-black"/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">3. Activate</h3>
                            <p className="text-gray-600">Enter your key in the app to start browsing securely</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Download XNet VPN</h2>
                        <p className="text-xl text-gray-300">Available on all major platforms</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div
                            className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
                            <Apple className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-4">iOS App</h3>
                            <button
                                className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                                <span>App Store</span>
                                <Download className="w-5 h-5"/>
                            </button>
                        </div>
                        <div
                            className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
                            <Smartphone className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-4">Android App</h3>
                            <button
                                className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                                <span>Google Play</span>
                                <Download className="w-5 h-5"/>
                            </button>
                        </div>
                        <div
                            className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
                            <Monitor className="w-12 h-12 mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-4">Windows App</h3>
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
                            <h3 className="text-xl font-bold mb-2">Global Access</h3>
                            <p className="text-gray-600">Connect to servers in over 90 countries worldwide</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-black p-4 rounded-full inline-block mb-4">
                                <Zap className="w-8 h-8 text-white"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                            <p className="text-gray-600">Experience high-speed connections with no throttling</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-black p-4 rounded-full inline-block mb-4">
                                <Server className="w-8 h-8 text-white"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Secure Servers</h3>
                            <p className="text-gray-600">Military-grade encryption keeps your data safe</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20" id="pricing">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div className="border rounded-2xl p-8 hover:shadow-lg transition flex flex-col h-full">
                            <h3 className="text-xl font-bold mb-4">{globalContext.subscriptions?.basic.name}</h3>
                            <div className="text-4xl font-bold mb-4">${globalContext.subscriptions?.basic.annuallyPrice}<span className="text-lg text-gray-500">/mo</span></div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {globalContext.subscriptions?.basic.benefits.map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-black"/>
                                        {globalContext.localized(Dictionary[feature as DictionaryKey])}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    if (globalContext.subscriptions) {
                                        setSubShowed(globalContext.subscriptions?.basic)
                                    }
                                }}
                                className="w-full h-12 border border-black rounded-full hover:bg-black hover:text-white transition">
                                Select Plan
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div
                            className="border-2 border-black rounded-2xl p-8 hover:shadow-lg transition relative flex flex-col h-full">
                            <div
                                className="absolute top-0 right-0 bg-black text-white px-4 py-1 rounded-bl-lg rounded-tr-xl text-sm">
                                Popular
                            </div>
                            <h3 className="text-xl font-bold mb-4">{globalContext.subscriptions?.pro.name}</h3>
                            <div className="text-4xl font-bold mb-4">${globalContext.subscriptions?.pro.annuallyPrice}<span
                                className="text-lg text-gray-500">/mo</span></div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {globalContext.subscriptions?.pro.benefits.map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-black"/>
                                        {globalContext.localized(Dictionary[feature as DictionaryKey])}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    if (globalContext.subscriptions) {
                                        setSubShowed(globalContext.subscriptions?.pro)
                                    }
                                }}
                                className="w-full h-12 bg-black text-white rounded-full hover:bg-gray-800 transition">
                                Select Plan
                            </button>
                        </div>

                        {/* Unlimited Plan */}
                        <div className="border rounded-2xl p-8 hover:shadow-lg transition flex flex-col h-full">
                            <h3 className="text-xl font-bold mb-4">{globalContext.subscriptions?.unlimited.name}</h3>
                            <div className="text-4xl font-bold mb-4">${globalContext.subscriptions?.unlimited.annuallyPrice}<span
                                className="text-lg text-gray-500">/mo</span></div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                {globalContext.subscriptions?.unlimited.benefits.map((feature, index) => (
                                    <li key={feature} className="flex items-center">
                                        {index === 0 ? (
                                            <img src={"./img/ai.png"} className="w-5 h-5 mr-2" alt="ai"/>
                                        ) : (
                                            <CheckCircle className="w-5 h-5 mr-2 text-black"/>
                                        )}
                                        {globalContext.localized(Dictionary[feature as DictionaryKey])}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    if (globalContext.subscriptions) {
                                        setSubShowed(globalContext.subscriptions?.unlimited)
                                    }
                                }}
                                className="w-full h-12 border border-black rounded-full hover:bg-black hover:text-white transition">
                                Select Plan
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
                            <h4 className="font-bold text-lg mb-4">Legal Information</h4>
                            <ul className="space-y-2">
                                <li><a href={Config.urls.terms} target="_blank"
                                       className="hover:text-gray-300 transition">Terms of Service</a></li>
                                <li><a href={Config.urls.policy} target="_blank"
                                       className="hover:text-gray-300 transition">Privacy
                                    Policy</a></li>
                                <li><a href={Config.urls.refund} target="_blank"
                                       className="hover:text-gray-300 transition">Refund Policy</a></li>
                            </ul>
                        </div>
                        <div className="md:justify-self-end md:text-right">
                            <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                            <ul className="space-y-2">
                                <li>Email: <a className="hover:text-gray-300 transition"
                                              href={"mailto:support@xnetapps.com"}>support@xnetapps.com</a></li>
                                <li>Address: 53 Nikola Dumana Street, Yerevan, Armenia, 0001</li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className="border-t border-gray-800 mt-16 pt-12 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <img src={"img/shield.svg"} alt={"shield"} width={25} height={25}/>
                            <span className="text-xl font-bold">XNet</span>
                        </div>
                        <div className="text-sm text-gray-400">© 2025 XNet VPN. All rights reserved.</div>
                    </div>
                </div>
            </footer>
            {profileShowed}

            {/* Auth Modal */}
            <AnimatePresence>
                {authShowed && (
                    <AuthModal showed={authShowed} onClose={() => setAuthShowed(false)}/>
                )}
            </AnimatePresence>

            {/* Profile Modal */}
            <AnimatePresence>
                {profileShowed && (
                    <ProfileModal showed={profileShowed} onClose={() => setProfileShowed(false)}/>
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