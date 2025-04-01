import React, { useState } from 'react';
import { Shield, Globe, Zap, Server, ChevronRight, CheckCircle, Apple, Smartphone, Monitor, Download, X, User } from 'lucide-react';

type AuthMode = 'signin' | 'signup' | null;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

function AuthModal({ isOpen, onClose, mode, setMode }: AuthModalProps) {
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

        <form className="space-y-4">
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
      </div>
    </div>
  );
}

function ProfilePage({ onClose }: { onClose: () => void }) {
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
            <button className="px-4 py-2 text-red-600 hover:underline">
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8" />
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
              <button className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
                View Plans
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Download Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Download XNet VPN</h2>
            <p className="text-xl text-gray-300">Available on all major platforms</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition flex flex-col h-full">
              <Apple className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">iOS App</h3>
              <button className="w-full mt-auto bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                <span>App Store</span>
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition flex flex-col h-full">
              <Smartphone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Android App</h3>
              <button className="w-full mt-auto bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                <span>Google Play</span>
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-white transition flex flex-col h-full">
              <Monitor className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Windows App</h3>
              <button className="w-full mt-auto bg-white text-black h-12 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2">
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
      <section className="py-20">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition">About Us</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Careers</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Blog</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Server Status</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Contact Support</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">GDPR</a></li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-lg mb-4">Download</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition">Windows App</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">iOS App</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Android App</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Linux App</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6" />
              <span className="text-xl font-bold">XNet</span>
            </div>
            <div className="text-sm text-gray-400">© 2024 XNet VPN. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authMode !== null}
        onClose={() => {
          setAuthMode(null);
          // Temporary demo login
          if (authMode === 'signin') {
            setIsLoggedIn(true);
          }
        }}
        mode={authMode}
        setMode={setAuthMode}
      />

      {/* Profile Modal */}
      {showProfile && (
        <ProfilePage onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}

export default App;