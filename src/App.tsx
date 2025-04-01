import React, { useState } from 'react';
import { Globe, Zap, Server, ChevronRight, CheckCircle, Apple, Smartphone, Monitor, Download, X, User, CreditCard, Key, Lock } from 'lucide-react';
import {ScrollToHash} from "./utils/funcs.tsx";

type AuthMode = 'signin' | 'signup' | null;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  onLogin: () => void;
}

function AuthModal({ isOpen, onClose, mode, setMode, onLogin }: AuthModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600">
            {mode === 'signin' 
              ? 'Sign in to access your VPN account' 
              : 'Sign up to start using secure VPN service'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => setMode('signup')}
                className="text-black font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => setMode('signin')}
                className="text-black font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        <div className="mt-6 pt-6 text-xs text-center text-gray-500 border-t">
          By continuing, you agree to our{' '}
          <a href="#terms" className="underline hover:text-black">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ onClose, onLogout }: { onClose: () => void; onLogout: () => void }) {
  const handleSignOut = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-600">john@example.com</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Current Plan</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">Pro Plan</p>
                <p className="text-sm text-gray-600">Next billing date: March 1, 2024</p>
              </div>
              <button className="text-sm text-black hover:underline">
                Upgrade Plan
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Connected Devices</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Monitor className="w-5 h-5 mr-2" />
                  <span>MacBook Pro</span>
                </div>
                <span className="text-sm text-gray-600">Current Device</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  <span>iPhone 13</span>
                </div>
                <button className="text-sm text-red-600 hover:underline">
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 text-red-600 hover:underline"
            >
              Sign Out
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/*<Shield className="w-8 h-8" />*/}
              <img src={"shield.svg"} alt={"shield"} width={25} height={25} />
              <span className="text-2xl font-bold">XNet</span>
            </div>
            {isLoggedIn ? (
              <button 
                onClick={() => setShowProfile(true)}
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition flex items-center"
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </button>
            ) : (
              <button 
                onClick={() => setAuthMode('signin')}
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Get Started
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
                onClick={() => setAuthMode('signup')}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center hover:bg-gray-100 transition"
              >
                Try Free <ChevronRight className="ml-2" />
              </button>
              <button
                  onClick={() => {
                    const el = document.getElementById("pricing");
                    if (el) {
                      el.scrollIntoView({behavior: "smooth"});
                    } else {
                      // если элемент еще не отрисован — можно запомнить якорь
                      location.href = "/#pricing";
                    }
                  }}
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
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CreditCard className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Purchase</h3>
              <p className="text-gray-600">Choose your plan and complete the purchase securely</p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Key className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Get Access Key</h3>
              <p className="text-gray-600">Receive your unique access key via email</p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lock className="w-10 h-10 text-black" />
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
            <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
              <Apple className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">iOS App</h3>
              <button className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                <span>App Store</span>
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
              <Smartphone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Android App</h3>
              <button className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                <span>Google Play</span>
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition">
              <Monitor className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Windows App</h3>
              <button className="w-full bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                <span>Windows</span>
                <Download className="w-5 h-5" />
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
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Access</h3>
              <p className="text-gray-600">Connect to servers in over 90 countries worldwide</p>
            </div>
            <div className="text-center">
              <div className="bg-black p-4 rounded-full inline-block mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Experience high-speed connections with no throttling</p>
            </div>
            <div className="text-center">
              <div className="bg-black p-4 rounded-full inline-block mb-4">
                <Server className="w-8 h-8 text-white" />
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
              <h3 className="text-xl font-bold mb-4">Basic</h3>
              <div className="text-4xl font-bold mb-4">$5<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['5 Locations', 'Basic Speed', '1 Device'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-black" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full h-12 border border-black rounded-full hover:bg-black hover:text-white transition">
                Select Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-black rounded-2xl p-8 hover:shadow-lg transition relative flex flex-col h-full">
              <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 rounded-bl-lg rounded-tr-xl text-sm">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-4">$10<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['All Locations', 'Fast Speed', '5 Devices', 'Priority Support'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-black" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full h-12 bg-black text-white rounded-full hover:bg-gray-800 transition">
                Select Plan
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-2xl p-8 hover:shadow-lg transition flex flex-col h-full">
              <h3 className="text-xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-4">$20<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['All Locations', 'Ultra Speed', 'Unlimited Devices', '24/7 Support', 'Custom Setup'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-black" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full h-12 border border-black rounded-full hover:bg-black hover:text-white transition">
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
                <li><a href="/privacy-terms/#terms" className="hover:text-gray-300 transition">Terms of Service</a></li>
                <li><a href="/privacy-terms" className="hover:text-gray-300 transition">Privacy Policy</a></li>
                <li><a href="/privacy-terms/#refund" className="hover:text-gray-300 transition">Refund Policy</a></li>
              </ul>
            </div>
            <div className="md:justify-self-end md:text-right">
              <h4 className="font-bold text-lg mb-4">Contact Information</h4>
              <ul className="space-y-2">
                <li>Email: <a className="hover:text-gray-300 transition" href={"mailto:support@xnetapps.com"}>support@xnetapps.com</a></li>
                <li>Address: 53 Nikola Dumana Street, Yerevan, Armenia, 0001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-12 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src={"shield.svg"} alt={"shield"} width={25} height={25}/>
              <span className="text-xl font-bold">XNet</span>
            </div>
            <div className="text-sm text-gray-400">© 2025 XNet VPN. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
          isOpen={authMode !== null}
          onClose={() => setAuthMode(null)}
          mode={authMode}
        setMode={setAuthMode}
        onLogin={handleLogin}
      />

      {/* Profile Modal */}
      {showProfile && (
        <ProfilePage 
          onClose={() => setShowProfile(false)} 
          onLogout={handleLogout}
        />
      )}

      <ScrollToHash/>
    </div>
  );
}

export default App;