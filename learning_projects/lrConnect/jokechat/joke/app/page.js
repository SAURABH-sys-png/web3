import { Content } from 'next/font/google';
import Link from 'next/link';
import { metadata } from './layout';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white selection:bg-indigo-100">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-50 blur-[100px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-600 border border-indigo-100 animate-fade-in">
              Encrypted. Fast. Simple.
            </span>
          </div>

          {/* Hero Header */}
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6">
              Connect with anyone, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                anywhere in real-time.
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Experience the next generation of messaging. Secure, lightning-fast, 
              and designed to keep your conversations flowing effortlessly.
            </p>

            {/* Main Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/chat"
                className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200 flex items-center justify-center gap-2"
              >
                Start Chatting
              </Link>
              <Link
                href="/contacts"
                className="w-full sm:w-auto px-10 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Add Contacts
              </Link>
            </div>
          </div>

          {/* Interactive Chat Mockup (The "Beautiful Design") */}
          <div className="mt-20 relative group max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            {/* The "App UI" Mockup */}
            <div className="relative bg-white border border-gray-100 rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-12 min-h-[400px]">
              
              {/* Sidebar Mockup */}
              <div className="hidden md:block col-span-4 border-r border-gray-50 bg-gray-50/50 p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-20 bg-gray-200 rounded" />
                        <div className="h-2 w-32 bg-gray-100 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area Mockup */}
              <div className="col-span-12 md:col-span-8 p-6 flex flex-col justify-end space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3 max-w-[70%]">
                    <p className="text-sm text-gray-700 font-medium">Hey! Did you see the new UI updates?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 rounded-2xl rounded-br-none px-4 py-3 max-w-[70%] shadow-lg shadow-blue-200">
                    <p className="text-sm text-white font-medium">Yeah, it looks incredibly clean! 🚀</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50 flex gap-2">
                  <div className="flex-1 h-10 bg-gray-50 rounded-full border border-gray-100 px-4 flex items-center text-gray-400 text-sm">
                    Type a message...
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm rotate-45" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%)'}} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

