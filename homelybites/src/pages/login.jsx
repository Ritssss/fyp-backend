import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleLogin = (e) => {
        e.preventDefault();
        // Login logic will be implemented here
        console.log('Login attempt with:', { email, password });
    };

    const handleSignUp = () => {
        // Navigate to signup page
        navigate('/signup');
    };

    const handleForgotPassword = () => {
        // Forgot password logic will be implemented here
        console.log('Forgot password process initiated');
    };

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Left side - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-start pt-12 px-8">
                <div className="w-full max-w-md mx-auto">
                    <div className="flex flex-col items-center mb-12">
                        <img src="/src/img/logo-fyp.svg" alt="HomelyBites Logo" className="w-32 h-32" />
                        <h2 className="text-2xl font-bold font-amaranth mt-6 text-gray-800">Welcome, Login!</h2>
                    </div>
                    
                    <form onSubmit={handleLogin} className="w-full">
                        <div className="mb-8">
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300"
                                required
                            />
                        </div>
                        
                        <div className="mb-1">
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300"
                                required
                            />
                        </div>
                        
                        <div className="text-right mb-8 mt-2">
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
                            style={{ backgroundColor: '#FC7D7D' }}
                            className="w-full py-3 text-white rounded-full hover:bg-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 hover:opacity-80">
                            Login
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button 
                            onClick={handleSignUp}
                            style={{ color: '#FC7D7D' }}
                            className="hover:opacity-60"
                        >
                            SignUp Now
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Right side - Chef Illustration */}
            <div className="hidden md:block md:w-1/2 bg-pink-200">
                <div className="h-full flex items-center justify-center">
                    <img src="/src/img/chef.png" alt="Chef Illustration" className="max-w-full max-h-full" />
                </div>
            </div>
        </div>
    );
};

export default Login;