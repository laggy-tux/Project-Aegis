
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Camera, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  unread: boolean;
}

interface ResponseState {
  hasResponded: boolean;
  response: string;
  message: string;
}

const Alert = () => {
  const [messages, setMessages] = useState<AlertMessage[]>([
    {
      id: "1",
      sender: "Armando Cajide",
      message: "Emergency alert received",
      timestamp: new Date(),
      unread: true
    }
  ]);

  const [alertCount, setAlertCount] = useState(3);
  const [showEvacuationMessage, setShowEvacuationMessage] = useState(false);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [responseState, setResponseState] = useState<ResponseState>({
    hasResponded: false,
    response: "",
    message: ""
  });

  // Simulate receiving alerts from REST API
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with actual REST API polling
      console.log("Checking for new alerts from API...");
      
      // Simulate random alert
      if (Math.random() > 0.8) {
        const newAlert: AlertMessage = {
          id: Date.now().toString(),
          sender: "Emergency System",
          message: "New flood warning detected",
          timestamp: new Date(),
          unread: true
        };
        
        setMessages(prev => [newAlert, ...prev]);
        setAlertCount(prev => prev + 1);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleIntimateUser = () => {
    setShowEvacuationMessage(true);
    setShowResponseOptions(false);
  };

  const handleMessageClick = () => {
    setShowResponseOptions(true);
  };

  const handleResponse = (response: string) => {
    console.log(`User responded: ${response}`);
    
    // Update evacuation count in localStorage if evacuated
    if (response === "Evacuated") {
      const currentCount = parseInt(localStorage.getItem('evacuatedCount') || '560');
      const newCount = currentCount + 1;
      localStorage.setItem('evacuatedCount', newCount.toString());
      
      // Also update remaining count
      const currentRemaining = parseInt(localStorage.getItem('remainingCount') || '340');
      const newRemaining = Math.max(0, currentRemaining - 1);
      localStorage.setItem('remainingCount', newRemaining.toString());
    }
    
    // Set response state with appropriate message
    const getResponseMessage = (resp: string) => {
      switch (resp) {
        case "Evacuated":
          return "Great! You're safe. Stay in the designated safety zone and follow emergency personnel instructions.";
        case "Yet to evacuate":
          return "Please evacuate immediately! Follow your planned evacuation route. Emergency services have been notified.";
        case "Need assistance":
          return "Help is on the way! Stay calm, stay where you are if safe, and wait for emergency personnel to reach you.";
        default:
          return "";
      }
    };
    
    setResponseState({
      hasResponded: true,
      response,
      message: getResponseMessage(response)
    });
    setShowResponseOptions(false);
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
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <Link to="/alert" className="hover:text-white transition-colors">Alert</Link>
              </li>
              <li className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <Link to="/admin-dashboard" className="hover:text-white transition-colors text-xs">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Title */}
        <div className="text-center px-4">
          <h1 className="text-xl font-light mb-6">Alert</h1>
        </div>

        {/* Mobile Phone Mockup */}
        <div className="flex justify-center px-4">
          <div className="relative">
            <div className="w-48 h-[360px] bg-black rounded-[2rem] border-2 border-gray-800 shadow-2xl overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-black rounded-b-lg z-10"></div>
              
              {/* Phone screen - Updated wallpaper */}
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-purple-800 rounded-[1.75rem] relative">
                {/* Status bar */}
                <div className="flex justify-between items-center px-4 pt-6 pb-2 text-white">
                  <div className="text-lg font-light">9:41</div>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                      <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                      <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                      <div className="w-0.5 h-0.5 bg-white/50 rounded-full"></div>
                    </div>
                    <div className="ml-1 text-xs">📶</div>
                  </div>
                </div>

                <div className="px-4 text-white">
                  <div className="text-sm font-medium">Wednesday, August 14</div>
                </div>

                {/* Evacuation Message or Regular Notification */}
                {showEvacuationMessage ? (
                  <div className="mx-3 mt-4 space-y-2">
                    {!responseState.hasResponded ? (
                      <>
                        {/* Emergency Alert */}
                        <div 
                          className="bg-red-600/90 backdrop-blur-md rounded-lg p-3 cursor-pointer animate-pulse"
                          onClick={handleMessageClick}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                <Bell className="w-2 h-2 text-red-600" />
                              </div>
                              <div>
                                <div className="text-white font-bold text-xs">EMERGENCY</div>
                                <div className="text-white/90 text-xs">now</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-white font-bold text-xs">IMMEDIATE THREAT</div>
                          <div className="text-white text-xs">Please evacuate immediately!</div>
                        </div>

                        {/* Response Options */}
                        {showResponseOptions && (
                          <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 space-y-1">
                            <div className="text-white font-medium text-xs mb-2">Quick Response:</div>
                            <div className="space-y-1">
                              <button 
                                onClick={() => handleResponse("Evacuated")}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-1.5 px-2 rounded text-xs transition-colors"
                              >
                                Evacuated
                              </button>
                              <button 
                                onClick={() => handleResponse("Yet to evacuate")}
                                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-1.5 px-2 rounded text-xs transition-colors"
                              >
                                Yet to evacuate
                              </button>
                              <button 
                                onClick={() => handleResponse("Need assistance")}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded text-xs transition-colors"
                              >
                                Need assistance
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Response Confirmation */
                      <div className={`backdrop-blur-md rounded-lg p-3 ${
                        responseState.response === "Evacuated" ? "bg-green-600/90" :
                        responseState.response === "Yet to evacuate" ? "bg-yellow-600/90" :
                        "bg-orange-600/90"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                              <Bell className="w-2 h-2 text-current" />
                            </div>
                            <div>
                              <div className="text-white font-bold text-xs">RESPONSE RECEIVED</div>
                              <div className="text-white/90 text-xs">just now</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-white font-bold text-xs">{responseState.response.toUpperCase()}</div>
                        <div className="text-white text-xs">{responseState.message}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Regular Notification */
                  <div className="mx-3 mt-4 bg-white/20 backdrop-blur-md rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-1.5 h-1.5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium text-xs">MESSAGES</div>
                          <div className="text-white/70 text-xs">2m ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-white font-medium text-xs">Armando Cajide</div>
                    <div className="text-white/90 text-xs">{alertCount} Messages</div>
                  </div>
                )}

                {/* Bottom indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <div className="w-6 h-0.5 bg-white/30 rounded-full"></div>
                  <Camera className="w-3 h-3 text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center px-4 py-4">
          <h2 className="text-sm text-gray-400 font-light">
            Messaging Interface
          </h2>
        </div>

        {/* Intimate User Button */}
        <div className="px-4 pb-8">
          <Button 
            onClick={handleIntimateUser}
            className="w-full bg-black border-purple-600 text-purple-600 hover:bg-gray-900 py-3 rounded-lg font-medium transition-all duration-200 border"
          >
            Intimate User
          </Button>
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
                <div className="w-2 h-2 bg-white rounded-full"></div>
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
            Alert
          </h1>

          {/* Mobile Phone Mockup */}
          <div className="relative">
            <div className="w-64 h-[480px] bg-black rounded-[2.5rem] border-3 border-gray-800 shadow-2xl overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-b-lg z-10"></div>
              
              {/* Phone screen - Updated wallpaper */}
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-purple-800 rounded-[2rem] relative">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-8 pb-3 text-white">
                  <div className="text-2xl font-light">9:41</div>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    </div>
                    <div className="ml-1 text-xs">📶</div>
                    <div className="text-sm">📶</div>
                  </div>
                </div>

                <div className="px-6 text-white">
                  <div className="text-base font-medium">Wednesday, August 14</div>
                </div>

                {/* Evacuation Message or Regular Notification */}
                {showEvacuationMessage ? (
                  <div className="mx-4 mt-6 space-y-3">
                    {!responseState.hasResponded ? (
                      <>
                        {/* Emergency Alert */}
                        <div 
                          className="bg-red-600/90 backdrop-blur-md rounded-xl p-4 cursor-pointer animate-pulse"
                          onClick={handleMessageClick}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <Bell className="w-3 h-3 text-red-600" />
                              </div>
                              <div>
                                <div className="text-white font-bold text-sm">EMERGENCY ALERT</div>
                                <div className="text-white/90 text-xs">now</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-white font-bold text-sm">IMMEDIATE THREAT</div>
                          <div className="text-white text-sm">Please evacuate immediately!</div>
                        </div>

                        {/* Response Options */}
                        {showResponseOptions && (
                          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 space-y-2">
                            <div className="text-white font-medium text-sm mb-3">Quick Response:</div>
                            <div className="space-y-2">
                              <button 
                                onClick={() => handleResponse("Evacuated")}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
                              >
                                Evacuated
                              </button>
                              <button 
                                onClick={() => handleResponse("Yet to evacuate")}
                                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
                              >
                                Yet to evacuate
                              </button>
                              <button 
                                onClick={() => handleResponse("Need assistance")}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
                              >
                                Need assistance
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Response Confirmation */
                      <div className={`backdrop-blur-md rounded-xl p-4 ${
                        responseState.response === "Evacuated" ? "bg-green-600/90" :
                        responseState.response === "Yet to evacuate" ? "bg-yellow-600/90" :
                        "bg-orange-600/90"
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <Bell className="w-3 h-3 text-current" />
                            </div>
                            <div>
                              <div className="text-white font-bold text-sm">RESPONSE RECEIVED</div>
                              <div className="text-white/90 text-xs">just now</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-white font-bold text-sm">{responseState.response.toUpperCase()}</div>
                        <div className="text-white text-sm">{responseState.message}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Regular Notification */
                  <div className="mx-4 mt-6 bg-white/20 backdrop-blur-md rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-2.5 h-2.5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">MESSAGES</div>
                          <div className="text-white/70 text-xs">2m ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-white font-medium text-sm">Armando Cajide</div>
                    <div className="text-white/90 text-sm">{alertCount} Messages</div>
                  </div>
                )}

                {/* Bottom indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                  <Camera className="w-4 h-4 text-white/70" />
                </div>
              </div>
            </div>
          </div>

          {/* Intimate User Button */}
          <div className="mt-6">
            <Button 
              onClick={handleIntimateUser}
              className="bg-black border-purple-600 text-purple-600 hover:bg-gray-900 px-6 py-3 rounded-lg font-medium transition-all duration-200 border"
            >
              Intimate User
            </Button>
          </div>
        </div>

        {/* Right side - Title */}
        <div className="flex flex-col justify-center items-end p-6 w-1/3">
          <div className="text-right text-gray-400">
            <h2 className="text-lg md:text-xl lg:text-2xl font-light">
              Messaging Interface
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
