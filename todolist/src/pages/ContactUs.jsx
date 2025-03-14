import React from "react";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
            <div className="max-w-lg text-center bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-blue-400 mb-4">Contact Us</h1>
                <p className="text-gray-300 mb-6">
                    Have any questions? Reach out to us and we'll get back to you as soon as possible.
                </p>

                <div className="text-left text-gray-400 space-y-3">
                    <p><span className="font-semibold text-blue-300">📍 Address:</span> Gayatri Vidya Parishad College Of Engineering</p>
                    <p><span className="font-semibold text-blue-300">📞 Phone:</span> 322103311023</p>
                    <p><span className="font-semibold text-blue-300">✉️ Email:</span> 322103311023@todolist.com</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-blue-300 mb-3">Follow Us</h2>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-blue-400 hover:text-blue-300 text-2xl">📘</a>
                        <a href="#" className="text-blue-400 hover:text-blue-300 text-2xl">🐦</a>
                        <a href="#" className="text-blue-400 hover:text-blue-300 text-2xl">📸</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
