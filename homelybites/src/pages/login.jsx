import { useState } from 'react';
import logo from '../assets/logo.svg';
import chef from '../assets/chef.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleLogin = (e) => {
        e.preventDefault();
        // Login logic will be implemented here
        console.log('Login attempt with:', { email, password });
    };

    const handleSignUp = () => {
        // Sign up navigation will be implemented here
        console.log('Navigate to signup page');
    };

    const handleForgotPassword = () => {
        // Forgot password logic will be implemented here
        console.log('Forgot password process initiated');
    };

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Left side - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-10">
                        <img src={logo} alt="HomelyBites Logo" className="w-24 h-24 mb-2" />
                        <h1 className="text-2xl font-bold mt-4 text-gray-800">HOMELYBITES</h1>
                        <h2 className="text-xl mt-6 mb-8 text-gray-700">Welcome, Login!</h2>
                    </div>
                    
                    <form onSubmit={handleLogin} className="w-full">
                        <div className="mb-4">
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                                required
                            />
                        </div>
                        
                        <div className="mb-2">
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                                required
                            />
                        </div>
                        
                        <div className="text-right mb-6">
                            <button 
                                type="button" 
                                onClick={handleForgotPassword}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
                        >
                            Login
                        </button>
                    </form>
                    
                    <div className="mt-8 flex items-center justify-center">
                        <div className="border-t border-gray-300 flex-grow mr-3"></div>
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="border-t border-gray-300 flex-grow ml-3"></div>
                    </div>
                    
                    <div className="mt-6 flex justify-center space-x-4">
                        <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#EA4335" d="M12.0001 4.37C13.7521 4.37 15.2211 4.93 16.3311 5.97L19.3591 2.94C17.5601 1.24 15.0221 0.12 12.0001 0.12C7.38812 0.12 3.45012 2.67 1.37012 6.44L4.66812 9C5.77812 6.3 8.64112 4.37 12.0001 4.37Z"></path>
                                <path fill="#4285F4" d="M23.49 12.27C23.49 11.48 23.42 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.33 17.24 16.07 18.09L19.27 21.1C21.43 19.14 22.99 16.05 22.99 12.28L23.49 12.27Z"></path>
                                <path fill="#FBBC05" d="M4.66791 13.5001C4.44791 12.7201 4.32791 11.8901 4.32791 11.0001C4.32791 10.1101 4.44791 9.28006 4.66791 8.50006L1.37091 5.99006C0.561906 7.47006 0.112906 9.18006 0.112906 11.0001C0.112906 12.8201 0.561906 14.5301 1.37091 16.0101L4.66791 13.5001Z"></path>
                                <path fill="#34A853" d="M12.0001 22C15.0201 22 17.5601 21 19.2701 19.1L16.0701 16.09C15.0001 16.82 13.6201 17.24 12.0001 17.24C8.64112 17.24 5.77812 15.31 4.66812 12.61L1.37012 15.17C3.45012 18.94 7.38812 22 12.0001 22Z"></path>
                            </svg>
                        </button>
                        <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </button>
                        <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="mt-8 text-center text-sm text-gray-600">
                        Don't have an acoount? 
                        <button 
                            onClick={handleSignUp}
                            className="ml-1 text-pink-500 hover:text-pink-600"
                        >
                            SignUp Now
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Right side - Chef Illustration */}
            <div className="hidden md:block md:w-1/2 bg-pink-200">
                <div className="h-full flex items-center justify-center">
                    <img src={chef} alt="Chef Illustration" className="max-w-full max-h-full" />
                </div>
            </div>
        </div>
    );
};

export default Login;