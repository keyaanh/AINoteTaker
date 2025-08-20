import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Video,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface WeeklySummaryProps {
  summaries?: SummaryData;
  onViewOriginal?: (id: string, source: string) => void;
}

interface SummaryData {
  week: string;
  discussions: DiscussionItem[];
  tasks: TaskItem[];
  followUps: FollowUpItem[];
}

interface DiscussionItem {
  id: string;
  title: string;
  date: string;
  source: "slack" | "gmail" | "zoom";
  participants: string[];
  summary: string;
}

interface TaskItem {
  id: string;
  title: string;
  dueDate?: string;
  source: "slack" | "gmail" | "zoom";
  assignedBy: string;
  status: "pending" | "completed";
}

interface FollowUpItem {
  id: string;
  person: string;
  topic: string;
  date: string;
  source: "slack" | "gmail" | "zoom";
  priority: "high" | "medium" | "low";
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({
  summaries = {
    week: "May 13 - May 19, 2024",
    discussions: [
      {
        id: "d1",
        title: "Johnson Project Kickoff",
        date: "2024-05-15",
        source: "zoom",
        participants: ["Alex Johnson", "Sarah Miller", "You"],
        summary:
          "Discussed project timeline and deliverables. Alex will handle design, Sarah will manage client communication. You agreed to prepare technical specifications by next Monday.",
      },
      {
        id: "d2",
        title: "Marketing Strategy Update",
        date: "2024-05-16",
        source: "slack",
        participants: ["Marketing Team", "You"],
        summary:
          "Team presented Q2 results. Social media campaign exceeded expectations with 32% engagement. You suggested focusing more on LinkedIn for B2B outreach.",
      },
      {
        id: "d3",
        title: "Client Feedback on Prototype",
        date: "2024-05-17",
        source: "gmail",
        participants: ["Client X", "Product Team", "You"],
        summary:
          "Client provided positive feedback on the prototype but requested changes to the dashboard layout. You agreed to implement changes by end of next week.",
      },
    ],
    tasks: [
      {
        id: "t1",
        title: "Prepare technical specifications for Johnson Project",
        dueDate: "2024-05-22",
        source: "zoom",
        assignedBy: "Alex Johnson",
        status: "pending",
      },
      {
        id: "t2",
        title: "Review marketing analytics report",
        dueDate: "2024-05-20",
        source: "slack",
        assignedBy: "Marketing Team",
        status: "pending",
      },
      {
        id: "t3",
        title: "Update dashboard layout based on client feedback",
        dueDate: "2024-05-24",
        source: "gmail",
        assignedBy: "Product Manager",
        status: "completed",
      },
    ],
    followUps: [
      {
        id: "f1",
        person: "Alex Johnson",
        topic: "Design assets for Johnson Project",
        date: "2024-05-18",
        source: "slack",
        priority: "high",
      },
      {
        id: "f2",
        person: "Client X",
        topic: "Approval on revised timeline",
        date: "2024-05-19",
        source: "gmail",
        priority: "medium",
      },
      {
        id: "f3",
        person: "Sarah Miller",
        topic: "Client communication plan",
        date: "2024-05-17",
        source: "zoom",
        priority: "low",
      },
    ],
  },
  onViewOriginal = () => {},
}) => {
  const getSourceIcon = (source: string) => {
    switch (source) {
      case "slack":
        return <MessageSquare className="h-4 w-4" />;
      case "gmail":
        return <Mail className="h-4 w-4" />;
      case "zoom":
        return <Video className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Weekly Summary</h2>
          <p className="text-gray-500">{summaries.week}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Previous Week
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email Summary
          </Button>
        </div>
      </div>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="discussions">Key Discussions</TabsTrigger>
          <TabsTrigger value="tasks">Tasks & Action Items</TabsTrigger>
          <TabsTrigger value="followups">Follow-ups</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-4">
          {summaries.discussions.map((discussion) => (
            <Card key={discussion.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{discussion.title}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getSourceIcon(discussion.source)}
                    <span className="capitalize">{discussion.source}</span>
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(discussion.date).toLocaleDateString()}
                  <span className="mx-1">•</span>
                  <span>{discussion.participants.join(", ")}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{discussion.summary}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    onViewOriginal(discussion.id, discussion.source)
                  }
                >
                  View Original
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          {summaries.tasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>Assigned by: {task.assignedBy}</span>
                        <span className="mx-1">•</span>
                        {getSourceIcon(task.source)}
                        <span className="capitalize">{task.source}</span>
                      </CardDescription>
                    </div>
                  </div>
                  {task.dueDate && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewOriginal(task.id, task.source)}
                >
                  View Original
                </Button>
                {task.status === "pending" && (
                  <Button variant="outline" size="sm" className="ml-2">
                    Mark Complete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="followups" className="space-y-4">
          {summaries.followUps.map((followUp) => (
            <Card key={followUp.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Follow up with {followUp.person}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(followUp.date).toLocaleDateString()}
                      <span className="mx-1">•</span>
                      {getSourceIcon(followUp.source)}
                      <span className="capitalize">{followUp.source}</span>
                    </CardDescription>
                  </div>
                  <Badge
                    className={`${getPriorityColor(followUp.priority)} border`}
                    variant="outline"
                  >
                    {followUp.priority} priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">Topic: {followUp.topic}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewOriginal(followUp.id, followUp.source)}
                >
                  View Original
                </Button>
                <Button variant="outline" size="sm" className="ml-2">
                  Send Reminder
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeeklySummary;
