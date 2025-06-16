
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Users, Heart } from "lucide-react";

interface FoodRequest {
  id: string;
  foodType: string;
  quantity: string;
  location: string;
  pickupTime: string;
  status: 'pending' | 'accepted' | 'completed';
  volunteer?: string;
}

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'post' | 'history'>('overview');
  const [requests, setRequests] = useState<FoodRequest[]>([
    {
      id: '1',
      foodType: 'Fresh vegetables and fruits',
      quantity: '20 servings',
      location: 'Green Garden Restaurant, MG Road',
      pickupTime: '2024-06-16 18:00',
      status: 'accepted',
      volunteer: 'Rajesh Kumar'
    },
    {
      id: '2',
      foodType: 'Cooked rice and curry',
      quantity: '50 servings',
      location: 'Wedding Hall, Koramangala',
      pickupTime: '2024-06-15 21:00',
      status: 'completed'
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    foodType: '',
    quantity: '',
    location: '',
    pickupTime: '',
    expiryTime: '',
    description: ''
  });

  const handlePostRequest = () => {
    const request: FoodRequest = {
      id: Date.now().toString(),
      foodType: newRequest.foodType,
      quantity: newRequest.quantity,
      location: newRequest.location,
      pickupTime: newRequest.pickupTime,
      status: 'pending'
    };
    
    setRequests([request, ...requests]);
    setNewRequest({
      foodType: '',
      quantity: '',
      location: '',
      pickupTime: '',
      expiryTime: '',
      description: ''
    });
    setActiveTab('overview');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-orange-500 rounded-lg p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Donor Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Food Donor
              </Badge>
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'post', label: 'Post Request' },
            { id: 'history', label: 'Request History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Donations</p>
                      <p className="text-2xl font-bold text-gray-900">23</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">People Fed</p>
                      <p className="text-2xl font-bold text-gray-900">890</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-orange-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-2xl font-bold text-gray-900">12 min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Requests</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Food Requests</CardTitle>
                <CardDescription>Your latest donation requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{request.foodType}</h4>
                        <p className="text-sm text-gray-600">{request.quantity} • {request.location}</p>
                        <p className="text-sm text-gray-500">Pickup: {request.pickupTime}</p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Post Request Tab */}
        {activeTab === 'post' && (
          <Card>
            <CardHeader>
              <CardTitle>Post New Food Request</CardTitle>
              <CardDescription>Share surplus food with those who need it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                  <Input
                    placeholder="e.g., Cooked rice, Fresh vegetables"
                    value={newRequest.foodType}
                    onChange={(e) => setNewRequest({...newRequest, foodType: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <Input
                    placeholder="e.g., 50 servings, 10 kg"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                  <Input
                    placeholder="Full address with landmarks"
                    value={newRequest.location}
                    onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Pickup Time</label>
                  <Input
                    type="datetime-local"
                    value={newRequest.pickupTime}
                    onChange={(e) => setNewRequest({...newRequest, pickupTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <Textarea
                  placeholder="Any special instructions, food preparation details, or access information"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handlePostRequest}
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!newRequest.foodType || !newRequest.quantity || !newRequest.location}
              >
                Post Food Request
              </Button>
            </CardContent>
          </Card>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
              <CardDescription>All your past food donation requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="p-6 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{request.foodType}</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <p><strong>Quantity:</strong> {request.quantity}</p>
                          <p><strong>Location:</strong> {request.location}</p>
                          <p><strong>Pickup Time:</strong> {request.pickupTime}</p>
                          {request.volunteer && (
                            <p><strong>Volunteer:</strong> {request.volunteer}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
