
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left side - Navigation */}
      <div className="flex flex-col justify-center p-6 w-1/3">
        <nav>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <Link to="/alert" className="hover:text-white transition-colors">Alert</Link>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <Link to="/admin-dashboard" className="hover:text-white transition-colors">Admin Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Center - Mobile Phone Mockup */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-8">
          Project Aegis
        </h1>

        {/* Mobile Phone Mockup */}
        <div className="relative">
          <div className="w-64 h-[480px] bg-black rounded-[2.5rem] border-3 border-gray-800 shadow-2xl">
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-b-lg z-10"></div>
            
            {/* Phone screen */}
            <div className="w-full h-full bg-gray-100 rounded-[2rem] p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <img 
                src="/lovable-uploads/e83c505b-0f63-43f6-bcfb-cde054447162.png" 
                alt="Project Aegis Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Title */}
      <div className="flex flex-col justify-center items-end p-6 w-1/3">
        <div className="text-right text-gray-400">
          <h2 className="text-lg md:text-xl lg:text-2xl font-light whitespace-nowrap">
             Flood Alerting System
         </h2>
        </div>
      </div>
    </div>
  );
};

export default Index;
