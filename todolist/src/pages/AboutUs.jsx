import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
            <div className="max-w-4xl text-center">
                <h1 className="text-4xl font-bold text-blue-400 mb-4">About Us</h1>
                <p className="text-lg text-gray-300 leading-relaxed">
                    Welcome to <span className="text-blue-400 font-semibold">TodoList</span>, your ultimate task management solution. 
                    Our goal is to help you stay organized and boost your productivity effortlessly.
                </p>
                
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-blue-300 mb-3">Why Choose Us?</h2>
                    <ul className="text-gray-400 space-y-2 text-lg">
                        <li>✅ Simple & User-Friendly Interface</li>
                        <li>✅ Task Prioritization & Deadlines</li>
                        <li>✅ Secure Login & Data Storage</li>
                        <li>✅ Fast & Responsive Design</li>
                    </ul>
                </div>

                <p className="mt-6 text-gray-400">
                    Join us today and take control of your tasks like never before!
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
