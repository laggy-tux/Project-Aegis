
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, Users, TrendingUp, DollarSign, ShoppingCart, Calendar, Bell, Settings, User, BarChart3, Home, Edit3 } from "lucide-react";
import DetailModal from "../components/DetailModal";
import { ScrollArea } from "../components/ui/scroll-area";

const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [evacuatedCount, setEvacuatedCount] = useState(560);
  const [remainingCount, setRemainingCount] = useState(340);

  // Listen for localStorage changes from other pages (but don't persist on refresh)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'evacuatedCount' && e.newValue) {
        setEvacuatedCount(parseInt(e.newValue));
      }
      if (e.key === 'remainingCount' && e.newValue) {
        setRemainingCount(parseInt(e.newValue));
      }
    };

    // Listen for changes when Alert page updates localStorage
    const checkForUpdates = () => {
      const stored_evacuated = localStorage.getItem('evacuatedCount');
      const stored_remaining = localStorage.getItem('remainingCount');
      
      if (stored_evacuated) {
        setEvacuatedCount(parseInt(stored_evacuated));
      }
      if (stored_remaining) {
        setRemainingCount(parseInt(stored_remaining));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates when the page becomes visible (for same-tab updates)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForUpdates();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Periodic check for same-tab updates (since storage event doesn't fire on same tab)
    const interval = setInterval(checkForUpdates, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  const handleBlockClick = (section: string) => {
    setActiveModal(section);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const getModalContent = (section: string) => {
    switch (section) {
      case 'evacuated':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-600 font-medium">People Evacuated</div>
              <div className="text-3xl font-bold text-gray-800">{evacuatedCount}</div>
              <div className="text-sm text-gray-600">Successfully evacuated to safety zones</div>
            </div>
            <p className="text-sm">Evacuation process is running smoothly with all evacuees accounted for.</p>
          </div>
        );
      case 'remaining':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-medium">Yet to Evacuate</div>
              <div className="text-3xl font-bold text-blue-800">{remainingCount}</div>
              <div className="text-sm text-blue-600">People still in affected areas</div>
            </div>
            <p className="text-sm">Emergency teams are working to evacuate remaining residents.</p>
          </div>
        );
      case 'threat':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-red-600 font-medium">Serious Threat Areas</div>
              <div className="text-3xl font-bold text-red-800">Multiple Zones</div>
              <div className="text-sm text-red-600">High-risk flood zones identified</div>
            </div>
            <p className="text-sm">Critical areas require immediate attention and evacuation.</p>
          </div>
        );
      default:
        return <p>More details coming soon...</p>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        {/* Navigation */}
        <div className="p-4">
          <nav>
            <ul className="flex justify-center space-x-6 text-gray-300 text-sm">
              <li className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <Link to="/alert" className="hover:text-white transition-colors">Alert</Link>
              </li>
              <li className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <Link to="/admin-dashboard" className="hover:text-white transition-colors text-xs">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Title */}
        <div className="text-center px-4">
          <h1 className="text-xl font-light mb-6">Admin Dashboard</h1>
        </div>

        {/* Mobile Phone Mockup */}
        <div className="flex justify-center px-4">
          <div className="relative">
            <div className="w-48 h-[360px] bg-black rounded-[2rem] border-2 border-gray-800 shadow-2xl">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-lg z-10"></div>
              
               <div className="w-full h-full bg-white rounded-[1.75rem] relative overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-3 pt-6 pb-12">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-black text-sm font-medium">Dashboard</h2>
                      <div className="w-6 h-6 bg-purple-300 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {/* People Evacuated */}
                      <button
                        onClick={() => handleBlockClick('evacuated')}
                        className="bg-white p-2 rounded-lg text-left hover:shadow-md transition-all duration-200 hover:scale-105 border border-gray-100"
                      >
                        <div className="text-black text-lg font-bold mb-1">{evacuatedCount}</div>
                        <div className="text-gray-600 text-xs mb-1">People Evacuated</div>
                        <div className="w-8 h-1 bg-black rounded-full mb-1"></div>
                        <div className="text-black text-xs font-medium">60%</div>
                      </button>

                      {/* Yet to Evacuate */}
                      <button
                        onClick={() => handleBlockClick('remaining')}
                        className="bg-white p-2 rounded-lg text-left hover:shadow-md transition-all duration-200 hover:scale-105 border border-gray-100"
                      >
                        <div className="text-blue-600 text-lg font-bold mb-1">{remainingCount}</div>
                        <div className="text-gray-600 text-xs mb-1">Yet to Evacuate</div>
                        <div className="w-8 h-1 bg-blue-500 rounded-full mb-1"></div>
                        <div className="text-blue-600 text-xs font-medium">40%</div>
                      </button>
                    </div>

                    {/* Threat Map */}
                    <button
                      onClick={() => handleBlockClick('threat')}
                      className="w-full bg-gray-100 rounded-lg p-2 mb-4 hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-black text-sm font-medium">Serious</div>
                          <div className="text-black text-sm font-medium">Threat</div>
                        </div>
                        <div className="w-12 h-8 bg-gradient-to-br from-red-300 to-red-400 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-4 bg-red-500 rounded opacity-80"></div>
                        </div>
                      </div>
                    </button>

                    {/* Serious Threat Areas Section with Image */}
                    <div className="mb-3">
                      <h3 className="text-black text-xs font-medium mb-2">Serious Threat Areas</h3>
                      <div className="bg-gray-100 rounded-lg p-2 h-20 relative overflow-hidden">
                        <img 
                          src="/lovable-uploads/7c4cd136-aebc-455b-8199-010c192c7270.png" 
                          alt="Serious Threat Areas Map"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </div>

                    {/* Additional content to demonstrate scrolling */}
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <h4 className="text-black text-xs font-medium mb-1">Emergency Contacts</h4>
                        <div className="text-xs text-gray-600">
                          <p>Fire Department: 911</p>
                          <p>Evacuation Hotline: 1-800-EVACUATE</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-2">
                        <h4 className="text-black text-xs font-medium mb-1">Weather Update</h4>
                        <div className="text-xs text-gray-600">
                          <p>Heavy rainfall expected</p>
                          <p>Wind speed: 45 mph</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Bottom Navigation - Reduced size */}
                <div className="absolute bottom-1 left-2 right-2">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <Home className="w-3 h-3 text-black" />
                      <span className="text-xs text-black font-medium">Home</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <BarChart3 className="w-3 h-3 text-black" />
                      <span className="text-xs text-black">Analytics</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Settings className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center px-4 pb-8">
          <h2 className="text-sm text-gray-400 font-light">
            Dashboard Interface
          </h2>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left side - Navigation */}
        <div className="flex flex-col justify-center p-6 w-1/3">
          <nav>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <Link to="/alert" className="hover:text-white transition-colors">Alert</Link>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <Link to="/admin-dashboard" className="hover:text-white transition-colors">Admin Dashboard</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Center - Mobile Phone Mockup */}
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-8">
            Admin Dashboard
          </h1>

          {/* Mobile Phone Mockup */}
          <div className="relative">
            <div className="w-64 h-[480px] bg-black rounded-[2.5rem] border-3 border-gray-800 shadow-2xl">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-b-lg z-10"></div>
              
              {/* Phone screen with white background and scrollable content */}
              <div className="w-full h-full bg-white rounded-[2rem] relative overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 pt-8 pb-16">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-black text-xl font-medium">Dashboard</h2>
                      <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* People Evacuated */}
                      <button
                        onClick={() => handleBlockClick('evacuated')}
                        className="bg-white p-3 rounded-lg text-left hover:shadow-md transition-all duration-200 hover:scale-105 border border-gray-100"
                      >
                        <div className="text-black text-2xl font-bold mb-1">{evacuatedCount}</div>
                        <div className="text-gray-600 text-xs mb-2">People Evacuated</div>
                        <div className="w-12 h-2 bg-black rounded-full mb-1"></div>
                        <div className="text-black text-sm font-medium">60%</div>
                      </button>

                      {/* Yet to Evacuate */}
                      <button
                        onClick={() => handleBlockClick('remaining')}
                        className="bg-white p-3 rounded-lg text-left hover:shadow-md transition-all duration-200 hover:scale-105 border border-gray-100"
                      >
                        <div className="text-blue-600 text-2xl font-bold mb-1">{remainingCount}</div>
                        <div className="text-gray-600 text-xs mb-2">Yet to Evacuate</div>
                        <div className="w-12 h-2 bg-blue-500 rounded-full mb-1"></div>
                        <div className="text-blue-600 text-sm font-medium">40%</div>
                      </button>
                    </div>

                    {/* Threat Map */}
                    <button
                      onClick={() => handleBlockClick('threat')}
                      className="w-full bg-gray-100 rounded-lg p-3 mb-6 hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-black text-lg font-medium">Serious</div>
                          <div className="text-black text-lg font-medium">Threat</div>
                        </div>
                        <div className="w-16 h-12 bg-gradient-to-br from-red-300 to-red-400 rounded-lg flex items-center justify-center">
                          <div className="w-8 h-6 bg-red-500 rounded opacity-80"></div>
                        </div>
                      </div>
                    </button>

                    {/* Serious Threat Areas Section with Image */}
                    <div className="mb-4">
                      <h3 className="text-black text-sm font-medium mb-3">Serious Threat Areas</h3>
                      <div className="bg-gray-100 rounded-lg p-3 h-32 relative overflow-hidden">
                        <img 
                          src="/lovable-uploads/7c4cd136-aebc-455b-8199-010c192c7270.png" 
                          alt="Serious Threat Areas Map"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </div>

                    {/* Additional content to demonstrate scrolling */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="text-black text-sm font-medium mb-2">Emergency Contacts</h4>
                        <div className="text-xs text-gray-600">
                          <p>Fire Department: 911</p>
                          <p>Evacuation Hotline: 1-800-EVACUATE</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="text-black text-sm font-medium mb-2">Weather Update</h4>
                        <div className="text-xs text-gray-600">
                          <p>Heavy rainfall expected</p>
                          <p>Wind speed: 45 mph</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Bottom Navigation - Reduced size */}
                <div className="absolute bottom-2 left-4 right-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <Home className="w-4 h-4 text-black" />
                      <span className="text-xs text-black font-medium">Home</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <BarChart3 className="w-4 h-4 text-black" />
                      <span className="text-xs text-black">Analytics</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400">Settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Title */}
        <div className="flex flex-col justify-center items-end p-6 w-1/3">
          <div className="text-right text-gray-400">
            <h2 className="text-lg md:text-xl lg:text-2xl font-light whitespace-nowrap">
               Dashboard Interface
           </h2>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={activeModal !== null}
        onClose={handleCloseModal}
        title={activeModal ? activeModal.charAt(0).toUpperCase() + activeModal.slice(1) + " Details" : ""}
        content={activeModal ? getModalContent(activeModal) : null}
      />
    </div>
  );
};

export default AdminDashboard;
