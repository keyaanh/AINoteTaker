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

const Home = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Context Keeper</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Chat</span>
            </div>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Memory Timeline</span>
            </div>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>Weekly Summary</span>
            </div>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
          </Button>
        </nav>

        <div className="pt-4 border-t">
          <IntegrationPanel />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b p-4 flex items-center justify-between bg-card">
          <div className="flex items-center gap-2 w-full max-w-2xl">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Ask anything about your conversations..."
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-3 py-1 border-green-500"
              >
                <Slack className="h-3 w-3 text-green-500" />
                <span className="text-green-500">Connected</span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-3 py-1 border-green-500"
              >
                <Mail className="h-3 w-3 text-green-500" />
                <span className="text-green-500">Connected</span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 px-3 py-1 border-red-500"
              >
                <Video className="h-3 w-3 text-red-500" />
                <span className="text-red-500">Disconnected</span>
              </Badge>
            </div>

            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="timeline">Memory Timeline</TabsTrigger>
              <TabsTrigger value="summary">Weekly Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Welcome to your AI Context Keeper</CardTitle>
                    <CardDescription>
                      Ask me anything about your conversations from Slack,
                      Gmail, or Zoom.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3"
                      >
                        <div>
                          <p className="font-medium">
                            What did I say about the Johnson project?
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Search across all platforms
                          </p>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3"
                      >
                        <div>
                          <p className="font-medium">
                            Who's waiting for my response?
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Find pending conversations
                          </p>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3"
                      >
                        <div>
                          <p className="font-medium">
                            Summarize yesterday's Zoom meeting
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Get key points from calls
                          </p>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-left h-auto py-3"
                      >
                        <div>
                          <p className="font-medium">
                            What action items do I have this week?
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Track your commitments
                          </p>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

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
  );
};

export default Home;
