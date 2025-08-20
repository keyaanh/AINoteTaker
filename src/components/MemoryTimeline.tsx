import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  Slack,
  Mail,
  Video,
  User,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

interface Conversation {
  id: string;
  source: "slack" | "gmail" | "zoom";
  date: Date;
  contacts: string[];
  summary: string;
  content: string;
}

const MemoryTimeline: React.FC = () => {
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [contactFilter, setContactFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);

  // Mock data for conversations
  const mockConversations: Conversation[] = [
    {
      id: "1",
      source: "slack",
      date: new Date(2023, 5, 15, 14, 30),
      contacts: ["Alex Johnson", "Sarah Lee"],
      summary: "Discussion about the Johnson project timeline and deliverables",
      content:
        "Alex: Hey team, we need to finalize the Johnson project timeline by Friday.\nSarah: I can have the design assets ready by Wednesday.\nYou: Perfect, I'll prepare the presentation for the client meeting next week.",
    },
    {
      id: "2",
      source: "gmail",
      date: new Date(2023, 5, 14, 9, 15),
      contacts: ["Michael Chen"],
      summary: "Email about quarterly budget review meeting",
      content:
        "From: michael.chen@example.com\nSubject: Quarterly Budget Review\n\nHi there,\n\nJust a reminder that we have our quarterly budget review scheduled for next Monday at 10 AM. Please prepare your department's expense report and projections for the next quarter.\n\nBest regards,\nMichael",
    },
    {
      id: "3",
      source: "zoom",
      date: new Date(2023, 5, 13, 11, 0),
      contacts: ["Product Team", "Engineering Team"],
      summary: "Sprint planning meeting for the new feature rollout",
      content:
        "Meeting Transcript:\n\nProduct Manager: Let's discuss the roadmap for the new feature rollout.\nEngineer 1: We'll need at least two weeks for the backend implementation.\nYou: I suggest we prioritize the user authentication flow first.\nProduct Manager: Good point, let's adjust our timeline accordingly.",
    },
    {
      id: "4",
      source: "slack",
      date: new Date(2023, 5, 12, 16, 45),
      contacts: ["Marketing Team"],
      summary: "Discussion about the upcoming social media campaign",
      content:
        "Marketing Lead: We need to finalize the social media assets for the summer campaign.\nYou: I'll review the copy by tomorrow morning.\nDesigner: Great, I'll incorporate your feedback into the final designs.",
    },
    {
      id: "5",
      source: "gmail",
      date: new Date(2023, 5, 11, 13, 20),
      contacts: ["Client Support"],
      summary: "Client feedback on the latest product update",
      content:
        "From: support@clientcompany.com\nSubject: Feedback on Latest Update\n\nHello,\n\nWe've collected some initial feedback from users about the latest product update. Overall, the reception has been positive, but there are a few usability issues that need to be addressed.\n\nCan we schedule a call to discuss these points in detail?\n\nRegards,\nClient Support Team",
    },
  ];

  // Filter conversations based on selected filters and search query
  const filteredConversations = mockConversations.filter((conversation) => {
    // Date filter
    if (dateFilter !== "all") {
      const today = new Date();
      const conversationDate = conversation.date;

      if (
        dateFilter === "today" &&
        (conversationDate.getDate() !== today.getDate() ||
          conversationDate.getMonth() !== today.getMonth() ||
          conversationDate.getFullYear() !== today.getFullYear())
      ) {
        return false;
      }

      if (dateFilter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        if (conversationDate < oneWeekAgo) {
          return false;
        }
      }

      if (dateFilter === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        if (conversationDate < oneMonthAgo) {
          return false;
        }
      }
    }

    // Platform filter
    if (platformFilter !== "all" && conversation.source !== platformFilter) {
      return false;
    }

    // Contact filter (simplified for demo)
    if (contactFilter !== "all") {
      const hasContact = conversation.contacts.some((contact) =>
        contact.toLowerCase().includes(contactFilter.toLowerCase()),
      );
      if (!hasContact) {
        return false;
      }
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        conversation.summary.toLowerCase().includes(query) ||
        conversation.content.toLowerCase().includes(query) ||
        conversation.contacts.some((contact) =>
          contact.toLowerCase().includes(query),
        )
      );
    }

    return true;
  });

  // Function to get icon based on source
  const getSourceIcon = (source: string) => {
    switch (source) {
      case "slack":
        return <Slack className="h-4 w-4" />;
      case "gmail":
        return <Mail className="h-4 w-4" />;
      case "zoom":
        return <Video className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Function to format date
  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy h:mm a");
  };

  // Function to handle conversation click
  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsDialogOpen(true);
  };

  // Function to handle delete conversation
  const handleDeleteConversation = () => {
    // In a real app, this would call an API to delete the conversation
    console.log(`Deleting conversation: ${selectedConversation?.id}`);
    setIsDialogOpen(false);
    setSelectedConversation(null);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-2xl font-bold">
              Memory Timeline
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              >
                <Filter className="h-4 w-4" />
                {isFilterExpanded ? (
                  <ChevronUp className="ml-1 h-3 w-3" />
                ) : (
                  <ChevronDown className="ml-1 h-3 w-3" />
                )}
              </Button>
            </div>
          </div>

          {isFilterExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Date Range
                </label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Past Week</SelectItem>
                    <SelectItem value="month">Past Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Platform
                </label>
                <Select
                  value={platformFilter}
                  onValueChange={setPlatformFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="zoom">Zoom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Contact
                </label>
                <Select value={contactFilter} onValueChange={setContactFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Lee</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="team">Product Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleConversationClick(conversation)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {getSourceIcon(conversation.source)}
                            <span className="capitalize">
                              {conversation.source}
                            </span>
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(conversation.date)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="text-sm text-muted-foreground">
                            {conversation.contacts.join(", ")}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-medium mt-2">
                        {conversation.summary}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {conversation.content.split("\n")[0]}...
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No conversations found matching your filters.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="calendar" className="min-h-[400px]">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Calendar view coming soon...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Conversation Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedConversation && (
                <>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getSourceIcon(selectedConversation.source)}
                    <span className="capitalize">
                      {selectedConversation.source}
                    </span>
                  </Badge>
                  <span>{selectedConversation.summary}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              {selectedConversation && (
                <>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(selectedConversation.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{selectedConversation.contacts.join(", ")}</span>
                  </div>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-2" />

          <ScrollArea className="flex-1 p-4">
            {selectedConversation && (
              <div className="whitespace-pre-line">
                {selectedConversation.content}
              </div>
            )}
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button variant="destructive" onClick={handleDeleteConversation}>
              <X className="h-4 w-4 mr-1" /> Forget This Conversation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemoryTimeline;
