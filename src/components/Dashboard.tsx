import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  MessageSquare,
  Calendar,
  Settings,
  Bell,
  Zap,
  Slack,
  Mail,
  Video,
  Plus,
  Activity,
  Users,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ChatInterface from "./ChatInterface";
import IntegrationPanel from "./IntegrationPanel";
import MemoryTimeline from "./MemoryTimeline";
import WeeklySummary from "./WeeklySummary";

const Dashboard = () => {
  const stats = [
    {
      title: "Conversations Captured",
      value: "2,847",
      change: "+12%",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Active Integrations",
      value: "3",
      change: "100%",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: "Team Members",
      value: "8",
      change: "+2",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Weekly Queries",
      value: "156",
      change: "+23%",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  const recentActivity = [
    {
      type: "slack",
      message: "New conversation captured from #marketing channel",
      time: "2 minutes ago",
      icon: <Slack className="h-4 w-4 text-green-500" />,
    },
    {
      type: "gmail",
      message: "Email thread with client archived",
      time: "15 minutes ago",
      icon: <Mail className="h-4 w-4 text-red-500" />,
    },
    {
      type: "zoom",
      message: "Meeting summary generated for Product Review",
      time: "1 hour ago",
      icon: <Video className="h-4 w-4 text-blue-500" />,
    },
    {
      type: "system",
      message: "Weekly summary report is ready",
      time: "2 hours ago",
      icon: <Bell className="h-4 w-4 text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <Zap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Keyper</h1>
            </div>

            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start bg-primary/10 text-primary"
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                Chat
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="h-5 w-5 mr-3" />
                Memory Timeline
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="h-5 w-5 mr-3" />
                Weekly Summary
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Button>
            </nav>
          </div>

          <div className="mt-auto p-6 border-t">
            <IntegrationPanel />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Ask anything about your conversations..."
                  className="flex-1 border-0 bg-gray-50 focus-visible:ring-0"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-600"
                  >
                    <Slack className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-600"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-red-500 text-red-600"
                  >
                    <Video className="h-3 w-3 mr-1" />
                    Disconnected
                  </Badge>
                </div>

                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                </Button>

                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </CardTitle>
                      {stat.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-green-600 mt-1">
                        {stat.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Quick Actions */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>
                        Common queries to get you started
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="justify-start text-left h-auto py-4"
                        >
                          <div>
                            <p className="font-medium">
                              What did I say about the Johnson project?
                            </p>
                            <p className="text-sm text-gray-500">
                              Search across all platforms
                            </p>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start text-left h-auto py-4"
                        >
                          <div>
                            <p className="font-medium">
                              Who's waiting for my response?
                            </p>
                            <p className="text-sm text-gray-500">
                              Find pending conversations
                            </p>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start text-left h-auto py-4"
                        >
                          <div>
                            <p className="font-medium">
                              Summarize yesterday's meetings
                            </p>
                            <p className="text-sm text-gray-500">
                              Get key points from calls
                            </p>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start text-left h-auto py-4"
                        >
                          <div>
                            <p className="font-medium">
                              What are my action items?
                            </p>
                            <p className="text-sm text-gray-500">
                              Track your commitments
                            </p>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest updates from your integrations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="p-1">{activity.icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {activity.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full">
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="chat">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatInterface />
                </motion.div>
              </TabsContent>

              <TabsContent value="timeline">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MemoryTimeline />
                </motion.div>
              </TabsContent>

              <TabsContent value="summary">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <WeeklySummary />
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
