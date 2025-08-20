import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, Check, Info, Loader2 } from "lucide-react";

interface IntegrationStatus {
  connected: boolean;
  loading: boolean;
  error: string | null;
}

interface IntegrationPanelProps {
  onToggleIntegration?: (platform: string, enabled: boolean) => void;
}

const IntegrationPanel = ({
  onToggleIntegration = () => {},
}: IntegrationPanelProps) => {
  const [integrations, setIntegrations] = useState<
    Record<string, IntegrationStatus>
  >({
    slack: { connected: false, loading: false, error: null },
    gmail: { connected: false, loading: false, error: null },
    zoom: { connected: false, loading: false, error: null },
  });

  const handleToggle = (platform: string) => {
    // Set loading state
    setIntegrations((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], loading: true, error: null },
    }));

    // Simulate API call with timeout
    setTimeout(() => {
      const newConnectedState = !integrations[platform].connected;

      setIntegrations((prev) => ({
        ...prev,
        [platform]: {
          connected: newConnectedState,
          loading: false,
          error: null,
        },
      }));

      onToggleIntegration(platform, newConnectedState);
    }, 1000);
  };

  const handleRetry = (platform: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], error: null },
    }));
    handleToggle(platform);
  };

  return (
    <Card className="w-full max-w-md bg-background">
      <CardHeader>
        <CardTitle className="text-xl">Integrations</CardTitle>
        <CardDescription>
          Connect your accounts to enable memory capture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Slack Integration */}
        <div className="flex items-center justify-between p-2 rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="bg-[#4A154B] p-2 rounded-md">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.8 10.5C19.1 10.5 18.6 10 18.6 9.3C18.6 8.6 19.1 8.1 19.8 8.1C20.5 8.1 21 8.6 21 9.3C21 10 20.5 10.5 19.8 10.5Z"
                  fill="white"
                />
                <path
                  d="M14.7 10.5C14 10.5 13.5 10 13.5 9.3V4.2C13.5 3.5 14 3 14.7 3C15.4 3 15.9 3.5 15.9 4.2V9.3C15.9 10 15.4 10.5 14.7 10.5Z"
                  fill="white"
                />
                <path
                  d="M14.7 21C14 21 13.5 20.5 13.5 19.8V14.7C13.5 14 14 13.5 14.7 13.5C15.4 13.5 15.9 14 15.9 14.7V19.8C15.9 20.5 15.4 21 14.7 21Z"
                  fill="white"
                />
                <path
                  d="M9.3 15.9H4.2C3.5 15.9 3 15.4 3 14.7C3 14 3.5 13.5 4.2 13.5H9.3C10 13.5 10.5 14 10.5 14.7C10.5 15.4 10 15.9 9.3 15.9Z"
                  fill="white"
                />
                <path
                  d="M19.8 15.9H14.7C14 15.9 13.5 15.4 13.5 14.7C13.5 14 14 13.5 14.7 13.5H19.8C20.5 13.5 21 14 21 14.7C21 15.4 20.5 15.9 19.8 15.9Z"
                  fill="white"
                />
                <path
                  d="M9.3 10.5C8.6 10.5 8.1 10 8.1 9.3C8.1 8.6 8.6 8.1 9.3 8.1C10 8.1 10.5 8.6 10.5 9.3C10.5 10 10 10.5 9.3 10.5Z"
                  fill="white"
                />
                <path
                  d="M9.3 21C8.6 21 8.1 20.5 8.1 19.8V14.7C8.1 14 8.6 13.5 9.3 13.5C10 13.5 10.5 14 10.5 14.7V19.8C10.5 20.5 10 21 9.3 21Z"
                  fill="white"
                />
                <path
                  d="M9.3 10.5C8.6 10.5 8.1 10 8.1 9.3V4.2C8.1 3.5 8.6 3 9.3 3C10 3 10.5 3.5 10.5 4.2V9.3C10.5 10 10 10.5 9.3 10.5Z"
                  fill="white"
                />
                <path
                  d="M4.2 10.5C3.5 10.5 3 10 3 9.3C3 8.6 3.5 8.1 4.2 8.1H9.3C10 8.1 10.5 8.6 10.5 9.3C10.5 10 10 10.5 9.3 10.5H4.2Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Slack</h3>
              <div className="flex items-center space-x-2">
                {integrations.slack.connected ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    <Check size={12} className="mr-1" /> Connected
                  </Badge>
                ) : (
                  <Badge variant="outline">Disconnected</Badge>
                )}
                {integrations.slack.error && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle size={16} className="text-destructive" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{integrations.slack.error}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
          <div>
            {integrations.slack.loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : integrations.slack.error ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRetry("slack")}
              >
                Retry
              </Button>
            ) : (
              <Switch
                checked={integrations.slack.connected}
                onCheckedChange={() => handleToggle("slack")}
              />
            )}
          </div>
        </div>

        {/* Gmail Integration */}
        <div className="flex items-center justify-between p-2 rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-md border">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Gmail</h3>
              <div className="flex items-center space-x-2">
                {integrations.gmail.connected ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    <Check size={12} className="mr-1" /> Connected
                  </Badge>
                ) : (
                  <Badge variant="outline">Disconnected</Badge>
                )}
                {integrations.gmail.error && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle size={16} className="text-destructive" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{integrations.gmail.error}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
          <div>
            {integrations.gmail.loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : integrations.gmail.error ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRetry("gmail")}
              >
                Retry
              </Button>
            ) : (
              <Switch
                checked={integrations.gmail.connected}
                onCheckedChange={() => handleToggle("gmail")}
              />
            )}
          </div>
        </div>

        {/* Zoom Integration */}
        <div className="flex items-center justify-between p-2 rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="bg-[#2D8CFF] p-2 rounded-md">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8V16L10 12L16 8Z" fill="white" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Zoom</h3>
              <div className="flex items-center space-x-2">
                {integrations.zoom.connected ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    <Check size={12} className="mr-1" /> Connected
                  </Badge>
                ) : (
                  <Badge variant="outline">Disconnected</Badge>
                )}
                {integrations.zoom.error && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle size={16} className="text-destructive" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{integrations.zoom.error}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
          <div>
            {integrations.zoom.loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : integrations.zoom.error ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRetry("zoom")}
              >
                Retry
              </Button>
            ) : (
              <Switch
                checked={integrations.zoom.connected}
                onCheckedChange={() => handleToggle("zoom")}
              />
            )}
          </div>
        </div>

        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <Info size={14} className="mr-2" />
          <p>
            Toggle integrations to start capturing context from your
            conversations
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationPanel;
