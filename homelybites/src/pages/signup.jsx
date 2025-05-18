import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setError('');
    };
    
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setError('');
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError('');
    };
    
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        // Basic validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }
        
        // Password validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }
        
        // Password match validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        
        try {
            // Simulate API call with localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                setError('Email is already registered');
                setLoading(false);
                return;
            }
            
            // Create new user
            const newUser = {
                firstName,
                lastName,
                email,
                password,
                createdAt: new Date().toISOString()
            };
            
            // Add to users array
            users.push(newUser);
            
            // Artificial delay to simulate network request
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Save updated users array
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show success toast
            setShowSuccessToast(true);
            
            // Auto hide toast after 5 seconds
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 5000);
            
            // Redirect to login after short delay with query parameter
            setTimeout(() => {
                navigate('/login?registered=true');
            }, 1500);
            
        } catch (err) {
            setError('Registration failed. Please try again');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full bg-white relative">
            {/* Success Toast Notification - with pink theme (#FC7D7D) */}
            {showSuccessToast && (
                <div className="fixed top-4 right-4 bg-white border-l-4 p-4 rounded shadow-md z-50 animate-fade-in-down flex items-center" style={{ borderColor: '#FC7D7D' }}>
                    <div className="mr-2">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FC7D7D">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold" style={{ color: '#333333' }}>Success!</p>
                        <p style={{ color: '#666666' }}>Registration successful!</p>
                    </div>
                    <button 
                        onClick={() => setShowSuccessToast(false)}
                        className="ml-4 hover:opacity-80"
                        style={{ color: '#FC7D7D' }}
                    >
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            
            {/* Left side - SignUp Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-start pt-12 px-8">
                <div className="w-full max-w-md mx-auto">
                    <div className="flex flex-col items-center mb-12">
                        <img src="/src/img/logo-fyp.svg" alt="HomelyBites Logo" className="w-32 h-32" />
                        <h2 className="text-2xl font-bold font-amaranth mt-6 text-gray-800">Get Started</h2>
                    </div>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSignUp} className="w-full">
                        <div className="flex gap-4 mb-6">
                            <div className="w-1/2">
                                <input 
                                    type="text" 
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <input 
                                    type="text" 
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300"
                                required
                            />
                        </div>
                        
                        <div className="mb-6 relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300"
                                required
                            />
                            <button 
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        <div className="mb-8 relative">
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="w-full px-4 py-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-300"
                                required
                            />
                            <button 
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <button 
                            type="submit" 
                            style={{ backgroundColor: '#FC7D7D' }}
                            className="w-full py-3 text-white rounded-full hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <button 
                            onClick={navigateToLogin}
                            style={{ color: '#FC7D7D' }}
                            className="hover:opacity-80"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Add custom animation for toast */}
            <style jsx>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translate3d(0, -20px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.5s ease-out;
                }
            `}</style>
            
            {/* Right side - Chef Illustration */}
            <div className="hidden md:block md:w-1/2 bg-pink-200">
                <div className="h-full flex items-center justify-center">
                    <img src="/src/img/chef.png" alt="Chef Illustration" className="max-w-full max-h-full" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;