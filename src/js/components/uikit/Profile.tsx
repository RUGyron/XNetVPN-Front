import {Monitor, Smartphone, User, X} from "lucide-react";

export default function Profile({ onClose, onLogout }: { onClose: () => void; onLogout: () => void }) {
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