import React, { useState, useEffect } from 'react';
import { Heart, Package, Truck, Gift, Instagram, Facebook, Twitter, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useParams } from 'react-router-dom';
const ThankYouPage = () => {
  const { orderId } = useParams();
  const [confetti, setConfetti] = useState([]);
  const orderNumber = `ORD-${orderId?.slice(-6).toUpperCase()}`; // shorten real ID nicely

  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Create confetti animation
    const createConfetti = () => {
      const colors = ['black', 'green', 'blue', 'red', 'yellow', 'purple', 'orange'];
      const newConfetti = [];
      
      for (let i = 0; i < 50; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 4,
          speed: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
        });
      }
      
      setConfetti(newConfetti);
      
      // Remove confetti after animation
      setTimeout(() => setConfetti([]), 4000);
    };

    setTimeout(createConfetti, 500);

    return () => clearInterval(progressInterval);
  }, []);

  const FloatingElement = ({ children, delay = 0 }) => (
    <div 
      className="absolute opacity-10 animate-bounce text-white"
      style={{
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    >
      {children}
    </div>
  );

  const ConfettiPiece = ({ piece }) => (
    <div
      className="fixed pointer-events-none z-50 animate-pulse"
      style={{
        left: `${piece.x}px`,
        top: `${piece.y}px`,
        width: `${piece.size}px`,
        height: `${piece.size}px`,
        backgroundColor: piece.color,
        borderRadius: '50%',
        transform: `rotate(${piece.rotation}deg)`,
        animation: `confettiDrop 4s linear forwards`,
      }}
    />
  );
  const handleContinueShopping = () => { 
    // Logic to redirect to shopping page
    window.location.href = '/';
  }
  const handleTrackOrder = () => {
    // Logic to redirect to order tracking page
    window.location.href = '/ordertracking';
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={0}><Package size={40} /></FloatingElement>
        <FloatingElement delay={1}><Heart size={35} /></FloatingElement>
        <FloatingElement delay={2}><Gift size={30} /></FloatingElement>
        <FloatingElement delay={3}><Star size={25} /></FloatingElement>
        <FloatingElement delay={4}><Sparkles size={32} /></FloatingElement>
        <FloatingElement delay={5}><ShoppingBag size={28} /></FloatingElement>
      </div>

      {/* Confetti */}
      {confetti.map(piece => (
        <ConfettiPiece key={piece.id} piece={piece} />
      ))}

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center relative ">
        <div 
          className={`max-w-2xl w-full bg-white   p-8 md:p-12 text-center transform transition-all duration-1000  relative z-10${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Success icon */}
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <div className="text-white text-3xl font-bold">✓</div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full animate-ping"></div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black animate-pulse">
            Thank You!
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your order has been successfully placed and is being prepared with love! 
            Get ready to rock your new style.
          </p>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-black-500 mb-2">
              <span>Order Processing</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-black-600 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-green-600 h-full rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Order details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-l-4 border-black">
            <div className="flex items-center justify-center mb-4">
              <Package className="text-black mr-2" size={24} />
              <h3 className="text-xl font-semibold text-black">Order Details</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="text-lg font-bold text-black">Order #{orderNumber}</p>
              <p className="flex items-center justify-center">
                <Truck className="mr-2 text-black" size={18} />
                Estimated delivery: 3-5 business days
              </p>
              <p>Confirmation email sent to your inbox</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="group bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleTrackOrder}
            >
              <span className="flex items-center justify-center">
                <Package className="mr-2 group-hover:animate-bounce" size={20} />
                Track Your Order
              </span>
            </button>
            <button className="group bg-white text-black px-8 py-4 rounded-xl font-semibold border-2 border-black hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleContinueShopping}
            >
              <span className="flex items-center justify-center">
                <ShoppingBag className="mr-2 group-hover:animate-bounce" size={20} />
                Continue Shopping
              </span>
            </button>
          </div>

          {/* Social media section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="text-gray-500 mr-2 animate-pulse" size={20} />
              <p className="text-gray-600">Share your style with us!</p>
            </div>
            <div className="flex justify-center space-x-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social, index) => (
                <button
                  key={index}
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <social.icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Discount offer */}
          <div className="mt-8 bg-black text-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <Gift className="mr-2 animate-bounce" size={24} />
              <h3 className="text-xl font-bold">Special Offer!</h3>
            </div>
            <p className="text-lg">Use code <span className="font-bold bg-white text-black px-2 py-1 rounded">THANKYOU15</span> for 15% off your next order</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confettiDrop {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;