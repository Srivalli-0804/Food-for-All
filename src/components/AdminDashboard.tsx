
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Users, Heart, BarChart3, TrendingUp } from "lucide-react";

interface User {
  id: string;
  name: string;
  role: 'donor' | 'volunteer';
  status: 'active' | 'inactive';
  totalContributions: number;
  lastActive: string;
}

interface Request {
  id: string;
  donor: string;
  volunteer?: string;
  foodType: string;
  quantity: string;
  location: string;
  status: 'pending' | 'accepted' | 'completed';
  createdAt: string;
  completedAt?: string;
}

const AdminDashboard = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Green Garden Restaurant',
      role: 'donor',
      status: 'active',
      totalContributions: 23,
      lastActive: '2024-06-16'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'volunteer',
      status: 'active',
      totalContributions: 18,
      lastActive: '2024-06-16'
    },
    {
      id: '3',
      name: 'Royal Wedding Hall',
      role: 'donor',
      status: 'active',
      totalContributions: 12,
      lastActive: '2024-06-15'
    },
    {
      id: '4',
      name: 'Priya Sharma',
      role: 'volunteer',
      status: 'inactive',
      totalContributions: 9,
      lastActive: '2024-06-14'
    }
  ]);

  const [requests] = useState<Request[]>([
    {
      id: '1',
      donor: 'Green Garden Restaurant',
      volunteer: 'Rajesh Kumar',
      foodType: 'Fresh vegetables and fruits',
      quantity: '20 servings',
      location: 'MG Road, Bangalore',
      status: 'completed',
      createdAt: '2024-06-16 17:30',
      completedAt: '2024-06-16 18:45'
    },
    {
      id: '2',
      donor: 'Royal Wedding Hall',
      foodType: 'Cooked meals (rice, dal, curry)',
      quantity: '100 servings',
      location: 'Koramangala, Bangalore',
      status: 'pending',
      createdAt: '2024-06-16 20:00'
    },
    {
      id: '3',
      donor: 'Sunset Cafe',
      volunteer: 'Priya Sharma',
      foodType: 'Sandwiches and pastries',
      quantity: '15 servings',
      location: 'Indiranagar, Bangalore',
      status: 'accepted',
      createdAt: '2024-06-16 18:30'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDonors = users.filter(u => u.role === 'donor').length;
  const totalVolunteers = users.filter(u => u.role === 'volunteer').length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const totalMealsServed = requests
    .filter(r => r.status === 'completed')
    .reduce((total, r) => total + parseInt(r.quantity.split(' ')[0]), 0);

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
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Administrator
              </Badge>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                  <p className="text-xs text-gray-500">{activeUsers} active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Meals Served</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMealsServed}</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedRequests}</p>
                  <p className="text-xs text-gray-500">{pendingRequests} pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-xs text-gray-500">+5% vs last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest food rescue activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.slice(0, 5).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{request.donor}</p>
                          <p className="text-xs text-gray-600">{request.foodType}</p>
                          <p className="text-xs text-gray-500">{request.createdAt}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                  <CardDescription>Most active donors and volunteers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users
                      .sort((a, b) => b.totalContributions - a.totalContributions)
                      .slice(0, 5)
                      .map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{user.totalContributions}</p>
                          <Badge className={getStatusColor(user.status)} size="sm">
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Food Requests</CardTitle>
                <CardDescription>Monitor and manage all food pickup requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{request.donor}</h4>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-2">{request.foodType}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <p><strong>Quantity:</strong> {request.quantity}</p>
                            <p><strong>Location:</strong> {request.location}</p>
                            <p><strong>Created:</strong> {request.createdAt}</p>
                            {request.volunteer && (
                              <p><strong>Volunteer:</strong> {request.volunteer}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donors ({totalDonors})</CardTitle>
                  <CardDescription>Restaurants, events, and individual donors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.filter(u => u.role === 'donor').map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.totalContributions} donations</p>
                        </div>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Volunteers ({totalVolunteers})</CardTitle>
                  <CardDescription>Active community volunteers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.filter(u => u.role === 'volunteer').map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.totalContributions} deliveries</p>
                        </div>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                  <CardDescription>Measuring our community impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Food Waste Prevented</span>
                    <span className="text-2xl font-bold text-green-600">2.3 tons</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Families Fed</span>
                    <span className="text-2xl font-bold text-blue-600">450+</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">CO2 Saved</span>
                    <span className="text-2xl font-bold text-purple-600">1.2 tons</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Community Partners</span>
                    <span className="text-2xl font-bold text-orange-600">67</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>Key operational metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Average Response Time</span>
                    <span className="text-xl font-bold">15 min</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Request Completion Rate</span>
                    <span className="text-xl font-bold">94%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Active Volunteer Ratio</span>
                    <span className="text-xl font-bold">78%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Peak Activity Hours</span>
                    <span className="text-xl font-bold">6-9 PM</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
