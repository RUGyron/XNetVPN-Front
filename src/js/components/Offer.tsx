
// OfferAgreementPage.tsx
import {Shield, ChevronLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {ScrollToHash} from "../utils/funcs.tsx";
import {useContext} from "react";
import {GlobalContext} from "../utils/GlobalProvider.tsx";
import {Dictionary} from "../utils/localization.tsx";
import Language from "../enums/language.tsx";

function OfferAgreementPage() {
    const navigate = useNavigate();
    const globalContext = useContext(GlobalContext);

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-black text-white py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={"img/shield.svg"} alt={"shield"} width={25} height={25}/>
                            <span className="text-2xl font-bold">XNet</span>
                        </div>
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

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-12">
                    <section>
                        <h1 className="text-3xl font-bold mb-8">{globalContext.localized(Dictionary.offerTitle)}</h1>
                        <div className="space-y-6">
                            <p className="text-gray-600 leading-relaxed">{globalContext.localized(Dictionary.offerIntro)}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{globalContext.localized(Dictionary.offerSection1Title)}</h2>
                        <p className="text-gray-600 leading-relaxed">{globalContext.localized(Dictionary.offerSection1_1)}</p>
                        <p className="text-gray-600 leading-relaxed mt-4">{globalContext.localized(Dictionary.offerSection1_2)}</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>{globalContext.localized(Dictionary.offerSection1_2_1)}</li>
                            <li>{globalContext.localized(Dictionary.offerSection1_2_2)}</li>
                            <li>{globalContext.localized(Dictionary.offerSection1_2_3)}</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">{globalContext.localized(Dictionary.offerSection1_3)}</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>{globalContext.localized(Dictionary.offerSection1_3_1)}</li>
                            <li>{globalContext.localized(Dictionary.offerSection1_3_2)}</li>
                            <li>{globalContext.localized(Dictionary.offerSection1_3_3)}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{globalContext.localized(Dictionary.offerSection2Title)}</h2>
                        <p className="text-gray-600 leading-relaxed">{globalContext.localized(Dictionary.offerSection2_1)}</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>{globalContext.localized(Dictionary.offerSection2_1_1)}</li>
                            <li>{globalContext.localized(Dictionary.offerSection2_1_2)}</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">{globalContext.localized(Dictionary.offerSection2_2)}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{globalContext.localized(Dictionary.offerSection3Title)}</h2>
                        <p className="text-gray-600 leading-relaxed">{globalContext.localized(Dictionary.offerSection3_1)}</p>
                    </section>

                    <div className="text-sm text-gray-500 pt-8 border-t">
                        {globalContext.localized(Dictionary.policyUpdated)}
                    </div>
                </div>
            </main>

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

export default OfferAgreementPage;
