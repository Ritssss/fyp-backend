import React from 'react';
import { User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar/>  
    {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Missions Section */}
        <section className="mb-16 sm:mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-6" style={{color: '#FF7A7A'}}>
                Our Missions
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            
            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-[4/3] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-200">
                  {/* Kitchen scene placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-cover bg-center flex items-center justify-center text-gray-500 text-lg font-medium">
                      Kitchen Cooking Scene
                    </div>
                  </div>
                  {/* Overlay elements */}
                  <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="text-sm text-gray-800 font-medium">Recipe Cooking Tutorial</div>
                  </div>
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-red-400 rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-green-400 rounded-full opacity-80 animate-pulse delay-75"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-300 mb-16"></div>

        {/* Community Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-[4/3] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-200">
                  {/* Community kitchen scene placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-cover bg-center flex items-center justify-center text-gray-500 text-lg font-medium">
                      Community Kitchen Scene
                    </div>
                  </div>
                  {/* Overlay elements */}
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-400 rounded-full opacity-80 animate-bounce"></div>
                  <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-teal-400 rounded-full opacity-80 animate-bounce delay-150"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-indigo-400 rounded-full opacity-80 animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="order-2">
              <h2 className="text-4xl font-bold mb-6" style={{color: '#FF7A7A'}}>
                Community
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>
        </section>

        {/* Final Divider */}
        <div className="border-t border-gray-300 mt-16"></div>
      </main>
    </div>
  );
};

export default AboutUs;