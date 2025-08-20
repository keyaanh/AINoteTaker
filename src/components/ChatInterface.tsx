import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceProps {
  exampleQueries?: string[];
}

const ChatInterface = ({
  exampleQueries = [
    "What did I say about the Johnson project?",
    "Who's waiting for my response?",
    "Summarize my meeting from yesterday",
    "What action items do I have this week?",
  ],
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Context Keeper. Ask me anything about your conversations, emails, or meetings.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm searching for information about "${inputValue}" in your conversations and meetings. This is a placeholder response as the actual AI functionality would connect to your integrated services.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleExampleClick = (query: string) => {
    setInputValue(query);
  };

  return (
    <Card className="w-full h-full flex flex-col bg-background border rounded-xl overflow-hidden">
      <div className="p-4 border-b flex items-center">
        <Search className="h-5 w-5 text-muted-foreground mr-2" />
        <h2 className="text-lg font-medium">AI Context Keeper</h2>
      </div>

      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
              >
                <Avatar className="h-8 w-8">
                  {message.sender === "ai" ? (
                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=memory" />
                  ) : (
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  )}
                  <AvatarFallback>
                    {message.sender === "ai" ? "AI" : "You"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {messages.length === 1 && (
        <div className="px-4 py-3 bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-medium">Try asking about:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exampleQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-2 px-3"
                onClick={() => handleExampleClick(query)}
              >
                {query}
              </Button>
            ))}
          </div>
        </div>
      )}

      <CardContent className="p-4 border-t mt-auto">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Ask me anything about your conversations..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
