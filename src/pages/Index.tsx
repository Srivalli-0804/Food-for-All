
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, Heart } from "lucide-react";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRole, setAuthRole] = useState<'donor' | 'volunteer' | 'admin'>('donor');

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    setAuthRole(role as 'donor' | 'volunteer' | 'admin');
    
    // For demo purposes, navigate directly to dashboards
    // In a real app, this would require authentication first
    switch (role) {
      case 'donor':
        navigate('/donor');
        break;
      case 'volunteer':
        navigate('/volunteer');
        break;
      case 'admin':
        navigate('/admin');
        break;
    }
  };

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const stats = [
    { label: "Meals Saved", value: "12,450", icon: Heart },
    { label: "Active Volunteers", value: "245", icon: Users },
    { label: "Partner Restaurants", value: "67", icon: MapPin },
    { label: "Avg Response Time", value: "18 min", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-orange-500 rounded-lg p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                Food for All
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Turning Food Waste Into
            <span className="block bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
              Hope & Nourishment
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect surplus food from restaurants and events with people in need. 
            Join our community of volunteers making a difference, one meal at a time.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h3>
            <p className="text-lg text-gray-600">
              Whether you have food to donate, time to volunteer, or need to coordinate - we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Donor Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-700">Food Donor</CardTitle>
                <CardDescription>
                  Restaurants, hotels, events, or households with surplus food
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Post food pickup requests</li>
                  <li>• Set pickup times & locations</li>
                  <li>• Track donation impact</li>
                  <li>• Build community partnerships</li>
                </ul>
                <Button 
                  onClick={() => handleRoleSelection('donor')}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Join as Donor
                </Button>
              </CardContent>
            </Card>

            {/* Volunteer Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-200">
              <CardHeader className="text-center">
                <div className="mx-auto bg-orange-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-orange-700">Volunteer</CardTitle>
                <CardDescription>
                  Pickup and deliver food to those who need it most
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Find nearby pickup requests</li>
                  <li>• Get real-time notifications</li>
                  <li>• Navigate with integrated maps</li>
                  <li>• Make a direct impact</li>
                </ul>
                <Button 
                  onClick={() => handleRoleSelection('volunteer')}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Volunteer Now
                </Button>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-200">
              <CardHeader className="text-center">
                <div className="mx-auto bg-purple-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-purple-700">Administrator</CardTitle>
                <CardDescription>
                  Oversee operations and coordinate the entire network
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>• Monitor all activities</li>
                  <li>• Generate impact reports</li>
                  <li>• Manage user accounts</li>
                  <li>• Optimize distribution routes</li>
                </ul>
                <Button 
                  onClick={() => handleRoleSelection('admin')}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  Admin Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-lg text-gray-600">Simple steps to make a big difference</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Post Request", desc: "Donors post surplus food details with location and timing" },
              { step: "2", title: "Find Volunteer", desc: "Nearby volunteers get notified and accept the pickup task" },
              { step: "3", title: "Coordinate Pickup", desc: "Real-time tracking and communication for smooth coordination" },
              { step: "4", title: "Deliver Impact", desc: "Food reaches those in need, creating measurable community impact" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto bg-gradient-to-r from-green-500 to-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Role Display */}
      {selectedRole && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-green-50 border-t-4 border-green-500">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2 text-lg">
              Navigating to: {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Dashboard
            </Badge>
            <p className="mt-4 text-gray-600">
              Welcome! You're now viewing the {selectedRole} dashboard with all relevant features.
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-orange-500 rounded-lg p-2">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Food for All</h3>
          </div>
          <p className="text-gray-400">
            Together, we can end hunger and reduce waste, one meal at a time.
          </p>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultRole={authRole}
      />
    </div>
  );
};

export default Index;
