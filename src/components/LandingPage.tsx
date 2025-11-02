import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MessageSquare,
  Calendar,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Slack,
  Mail,
  Video,
  Brain,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Memory",
      description:
        "Advanced AI that understands context and remembers everything important from your conversations.",
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Natural Language Search",
      description:
        "Ask questions in plain English and get instant answers from your conversation history.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Real-time Sync",
      description:
        "Automatically captures and syncs conversations from Slack, Gmail, and Zoom in real-time.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Privacy First",
      description:
        "Your data stays secure with end-to-end encryption and local storage options.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Team Collaboration",
      description:
        "Share context and insights with your team while maintaining privacy controls.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Smart Summaries",
      description:
        "Get AI-generated summaries of key discussions and action items automatically.",
    },
  ];

  const integrations = [
    {
      name: "Slack",
      icon: <Slack className="h-8 w-8" />,
      color: "text-green-600",
    },
    {
      name: "Gmail",
      icon: <Mail className="h-8 w-8" />,
      color: "text-red-600",
    },
    {
      name: "Zoom",
      icon: <Video className="h-8 w-8" />,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4" variant="secondary">
                🚀 Now in Beta - Join Early Access
              </Badge>
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Your Digital
                <span className="text-primary"> Memory Assistant</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Never lose track of important conversations again. Context
                Keeper captures, organizes, and recalls information from all
                your digital communications with the power of AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8 py-3">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-3"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seamlessly Integrates With Your Tools
            </h2>
            <p className="text-lg text-gray-600">
              Connect your favorite communication platforms in seconds
            </p>
          </div>
          <div className="flex justify-center items-center space-x-12">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center space-y-2"
              >
                <div
                  className={`${integration.color} p-4 rounded-full bg-gray-50`}
                >
                  {integration.icon}
                </div>
                <span className="font-medium text-gray-900">
                  {integration.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to capture, organize, and recall your digital
              conversations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Digital Memory?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who never miss important context
              again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 "
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
