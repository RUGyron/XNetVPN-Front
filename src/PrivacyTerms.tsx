import { Shield, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {ScrollToHash} from "./utils/funcs.tsx";

function PrivacyTerms() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-black text-white py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Shield className="w-8 h-8" />
                            <span className="text-2xl font-bold">XNet</span>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center text-white hover:text-gray-300 transition"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Back to Home
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-12">
                    {/* Privacy Policy Section */}
                    <section>
                        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-3">1. Information Collection</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We collect information that you provide directly to us, including but not limited to your name, email address, and payment information when you register for our service. We also automatically collect certain information about your device when you use our services.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">2. Use of Information</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                                    <li>Provide, maintain, and improve our services</li>
                                    <li>Process your transactions</li>
                                    <li>Send you technical notices and support messages</li>
                                    <li>Respond to your comments and questions</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Terms of Service Section */}
                    <section id={"terms"}>
                        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    By accessing or using our service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">2. Service Usage</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">3. Subscription and Payments</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Some aspects of the service are provided on a subscription basis. You agree to pay all fees charged to your account based on the pricing and payment terms presented to you at the time of purchase.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">4. Termination</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">5. Changes to Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Refund Section */}
                    <section id={"refund"}>
                        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    By accessing or using our service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the service.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">2. Service Usage</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">3. Subscription and Payments</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Some aspects of the service are provided on a subscription basis. You agree to pay all fees charged to your account based on the pricing and payment terms presented to you at the time of purchase.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">4. Termination</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-3">5. Changes to Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Last Updated */}
                    <div className="text-sm text-gray-500 pt-8 border-t">
                        Last updated: April 1, 2025
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 py-8 mt-12">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Shield className="w-6 h-6" />
                        <span className="font-bold">XNet</span>
                    </div>
                    <p>© 2025 XNet VPN. All rights reserved.</p>
                </div>
            </footer>
            <ScrollToHash/>
        </div>
    );
}

export default PrivacyTerms;