
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Heart, Users } from "lucide-react";

interface FoodRequest {
  id: string;
  donor: string;
  foodType: string;
  quantity: string;
  location: string;
  pickupTime: string;
  distance: string;
  status: 'available' | 'accepted' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'my-tasks' | 'completed'>('available');
  const [requests, setRequests] = useState<FoodRequest[]>([
    {
      id: '1',
      donor: 'Green Garden Restaurant',
      foodType: 'Fresh vegetables and fruits',
      quantity: '20 servings',
      location: 'MG Road, Bangalore',
      pickupTime: '2024-06-16 18:00',
      distance: '1.2 km',
      status: 'available',
      priority: 'high'
    },
    {
      id: '2',
      donor: 'Royal Wedding Hall',
      foodType: 'Cooked meals (rice, dal, curry)',
      quantity: '100 servings',
      location: 'Koramangala, Bangalore',
      pickupTime: '2024-06-16 20:30',
      distance: '2.8 km',
      status: 'available',
      priority: 'medium'
    },
    {
      id: '3',
      donor: 'Sunset Cafe',
      foodType: 'Sandwiches and pastries',
      quantity: '15 servings',
      location: 'Indiranagar, Bangalore',
      pickupTime: '2024-06-16 19:00',
      distance: '0.8 km',
      status: 'accepted',
      priority: 'high'
    }
  ]);

  const handleAcceptRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
  };

  const handleCompleteTask = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'completed' } : req
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const availableRequests = requests.filter(req => req.status === 'available');
  const myTasks = requests.filter(req => req.status === 'accepted' || req.status === 'in-progress');
  const completedTasks = requests.filter(req => req.status === 'completed');

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
              <h1 className="text-xl font-bold text-gray-900">Volunteer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Volunteer
              </Badge>
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lives Impacted</p>
                  <p className="text-2xl font-bold text-gray-900">145</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-gray-900">8 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{myTasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'available', label: `Available (${availableRequests.length})` },
            { id: 'my-tasks', label: `My Tasks (${myTasks.length})` },
            { id: 'completed', label: `Completed (${completedTasks.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Available Requests Tab */}
        {activeTab === 'available' && (
          <div className="space-y-4">
            {availableRequests.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests available</h3>
                  <p className="text-gray-600">Check back soon for new food pickup opportunities!</p>
                </CardContent>
              </Card>
            ) : (
              availableRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{request.donor}</h4>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority} priority
                          </Badge>
                        </div>
                        <p className="text-lg text-gray-700 mb-2">{request.foodType}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <p><strong>Quantity:</strong> {request.quantity}</p>
                          <p><strong>Distance:</strong> {request.distance}</p>
                          <p><strong>Location:</strong> {request.location}</p>
                          <p><strong>Pickup Time:</strong> {request.pickupTime}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          onClick={() => handleAcceptRequest(request.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Accept Task
                        </Button>
                        <Button variant="outline" size="sm">
                          View Map
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* My Tasks Tab */}
        {activeTab === 'my-tasks' && (
          <div className="space-y-4">
            {myTasks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active tasks</h3>
                  <p className="text-gray-600">Accept some requests to get started!</p>
                </CardContent>
              </Card>
            ) : (
              myTasks.map((request) => (
                <Card key={request.id} className="border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{request.donor}</h4>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-lg text-gray-700 mb-2">{request.foodType}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <p><strong>Quantity:</strong> {request.quantity}</p>
                          <p><strong>Distance:</strong> {request.distance}</p>
                          <p><strong>Location:</strong> {request.location}</p>
                          <p><strong>Pickup Time:</strong> {request.pickupTime}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          Navigate
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Donor
                        </Button>
                        <Button 
                          onClick={() => handleCompleteTask(request.id)}
                          className="bg-purple-500 hover:bg-purple-600"
                          size="sm"
                        >
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Completed Tab */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedTasks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed tasks yet</h3>
                  <p className="text-gray-600">Your completed food deliveries will appear here!</p>
                </CardContent>
              </Card>
            ) : (
              completedTasks.map((request) => (
                <Card key={request.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{request.donor}</h4>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-lg text-gray-700 mb-2">{request.foodType}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <p><strong>Quantity:</strong> {request.quantity}</p>
                          <p><strong>Distance:</strong> {request.distance}</p>
                          <p><strong>Location:</strong> {request.location}</p>
                          <p><strong>Completed:</strong> {request.pickupTime}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
