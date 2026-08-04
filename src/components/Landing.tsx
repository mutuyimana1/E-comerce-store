import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle ,Bed,Apple,Laptop} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GroceryLandingPage() {

  return (
    <div className="relative min-h-sfcreen bg-white overflow-hidden font-sans flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
          <motion.div
            key="grocery-hero"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full max-w-6xl rounded-2xl bg-[#b9bbbad] min-h-[480px] flex items-center px-8 sm:px-16 overflow-hidden border border-b-0 border-[#b9bbba]"
          >
          
            <div className="absolute right-[-5%] top-[10%] w-[450px] h-[450px] border-[2px] border-[#b9bbba] rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-[380px] h-[380px] border-[1px] border-[#b9bbba] rounded-full bg-[#b9bbbad]"/>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-8">
              
              {/* Left Column: Text Content (7/12 width) */}
              <div className="lg:col-span-7 space-y-5 text-left">
                {/* Yellow Highlight Badge */}
                <div className="inline-block bg-[#FFD15C] text-[#2C2C2C] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wide">
                  Shop and get your product into your hands in 2 hours
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D2619] tracking-tight leading-[1.15]">
                    Quality Everyday Items. <br />
                    <span className="text-[#0D2619]">Fresh Grocery</span>
                  </h1>
                  <p className="text-xs sm:text-sm font-normal leading-relaxed max-w-md">
                    Products across electronics, personal accessories, and home goods.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/products"
                    className="px-6 py-3 bg-[#0A1E13] text-white text-xs font-semibold hover:bg-emerald-950 transition-all duration-300 inline-flex items-center gap-2 rounded-lg shadow-md"
                  >
                    Shop Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative flex justify-center items-center h-full min-h-[320px]">
                
                <motion.div 
                  initial={{ y: 15 }}
                  animate={{ y: -10 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-md z-30 flex flex-col items-center border border-white/40 w-24 text-center"
                >
                  <span className="text-2xl"><Apple size={24}/></span>
                  <p className="text-[10px] font-bold text-gray-800 mt-1">Apple - 4 pcs</p>
                  <p className="text-[8px] text-amber-500">★★★★★</p>
                </motion.div>

                {/* 2. Floating Delivery Done Badge */}
                <motion.div 
                  initial={{ x: -10 }}
                  animate={{ x: 10 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
                  className="absolute bottom-16 left-[-20px] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md z-30 flex items-center gap-1.5 border border-white/40"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                  <span className="text-[9px] font-bold text-gray-700">Delivery Done!</span>
                </motion.div>

                {/* 3. Floating Avocado Card */}
                <motion.div 
                  initial={{ y: -10 }}
                  animate={{ y: 10 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-24 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-md z-30 flex items-center gap-2 border border-white/40 text-left min-w-[100px]"
                >
                  <span className="text-xl"><Bed size={24}/></span>
                  <div>
                    <p className="text-[9px] font-bold text-gray-800 leading-none">Bed</p>
                    <p className="text-[7px] text-amber-400">★★★★★</p>
                    <p className="text-[9px] font-extrabold text-emerald-600 mt-0.5">$3</p>
                  </div>
                </motion.div>

                {/* Main Subject Mockup Placement */}
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 z-20 flex items-end">
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1661396876151-004c81653389?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Grocery Shopping Girl" 
                    className="w-full h-[90%] object-cover rounded-2xl shadow-xl border-4 border-white"
                  />
                  {/* Decorative Orange slice mockup accent */}
                  <span className="absolute top-2 right-2 text-4xl transform rotate-12 drop-shadow-md"><Laptop size={30}/></span>
                </div>
              </div>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
