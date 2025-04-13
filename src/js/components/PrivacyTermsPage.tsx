import {Shield, ChevronLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {ScrollToHash} from "../utils/funcs.tsx";
import {useContext} from "react";
import {GlobalContext} from "../utils/GlobalProvider.tsx";
import {Dictionary} from "../utils/localization.tsx";
import Language from "../enums/language.tsx";

function PrivacyTermsPage() {
    const navigate = useNavigate()
    const globalContext = useContext(GlobalContext)

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-black text-white py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={"img/shield.svg"} alt={"shield"} width={25} height={25}/>
                            <span className="text-2xl font-bold">XNet</span>
                        </div>
                        {/* Language Toggle */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() =>
                                    globalContext.setLanguage(globalContext.language === Language.english ? Language.russian : Language.english)
                                }
                                className="text-sm text-white bg-transparent hover:bg-white hover:text-black transition px-4 py-2 rounded-full"
                            >
                                {globalContext.language === 'en' ? 'RU' : 'EN'}
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center text-white hover:text-gray-300 transition"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1"/>
                                {globalContext.localized(Dictionary.policyBack)}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-12">
                    {/* Privacy Policy Section */}
                    <section>
                        <h1 className="text-3xl font-bold mb-8">{globalContext.localized(Dictionary.privacyTitle)}</h1>
                        <div className="space-y-6">
                            <div>
                                {/*<h2 className="text-xl font-semibold mb-3">1. Information Collection</h2>*/}
                                <p className="text-gray-600 leading-relaxed">
                                    {globalContext.localized(Dictionary.privacyContent)}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Terms of Service Section */}
                    <section id={"terms"}>
                        <h1 className="text-3xl font-bold mb-8">{globalContext.localized(Dictionary.termsTitle)}</h1>
                        <div className="space-y-6">
                            <div>
                                {/*<h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>*/}
                                <p className="text-gray-600 leading-relaxed">
                                    {globalContext.localized(Dictionary.termsContent)}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Refund Section */}
                    <section id={"refund"}>
                        <h1 className="text-3xl font-bold mb-8">{globalContext.localized(Dictionary.refundTitle)}</h1>
                        <div className="space-y-6">
                            <div>
                                {/*<h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>*/}
                                <p className="text-gray-600 leading-relaxed">
                                    {globalContext.localized(Dictionary.refundContent)}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Last Updated */}
                    <div className="text-sm text-gray-500 pt-8 border-t">
                        {globalContext.localized(Dictionary.policyUpdated)}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 py-8 mt-12">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Shield className="w-6 h-6"/>
                        <span className="font-bold">XNet</span>
                    </div>
                    <p>{globalContext.localized(Dictionary.legalRights)}</p>
                </div>
            </footer>
            <ScrollToHash/>
        </div>
    );
}

export default PrivacyTermsPage;