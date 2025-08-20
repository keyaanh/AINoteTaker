import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    {
      name: "Getting Started",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Privacy & Security",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Features",
      icon: <Search className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Support",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I get started with Context Keeper?",
      answer:
        "Getting started is easy! Simply sign up for a free account, connect your first integration (Slack, Gmail, or Zoom), and start asking questions about your conversations. Our AI will begin learning from your data immediately.",
    },
    {
      category: "Getting Started",
      question: "Which platforms do you integrate with?",
      answer:
        "We currently support Slack, Gmail, and Zoom with more integrations coming soon. Enterprise customers can request custom integrations for their specific tools.",
    },
    {
      category: "Getting Started",
      question: "How long does it take to set up integrations?",
      answer:
        "Most integrations take less than 2 minutes to set up. Simply click connect, authorize the integration, and we'll start capturing your conversations automatically.",
    },
    {
      category: "Privacy & Security",
      question: "How is my data protected?",
      answer:
        "We use enterprise-grade security including end-to-end encryption, SOC 2 compliance, and offer local storage options. Your data is never shared with third parties or used to train our AI models.",
    },
    {
      category: "Privacy & Security",
      question: "Can I delete my data?",
      answer:
        "Yes, you have complete control over your data. You can delete individual conversations, entire integrations, or your complete account at any time. Deletions are permanent and immediate.",
    },
    {
      category: "Privacy & Security",
      question: "Where is my data stored?",
      answer:
        "By default, data is stored in secure cloud servers. Enterprise customers can choose local storage options or private cloud deployment for additional security.",
    },
    {
      category: "Features",
      question: "How does the AI search work?",
      answer:
        "Our AI understands natural language queries and searches across all your connected platforms. Ask questions like 'What did John say about the project deadline?' and get instant, contextual answers.",
    },
    {
      category: "Features",
      question: "Can I search across multiple platforms at once?",
      answer:
        "Yes! Context Keeper searches across all your connected platforms simultaneously, giving you a unified view of all relevant conversations regardless of where they happened.",
    },
    {
      category: "Features",
      question: "What are weekly summaries?",
      answer:
        "Weekly summaries are AI-generated reports that highlight key discussions, action items, and important decisions from your conversations. They're automatically created every week and can be customized.",
    },
    {
      category: "Features",
      question: "Can I share conversations with my team?",
      answer:
        "Yes, you can share specific conversations or search results with team members while maintaining privacy controls. You decide what gets shared and with whom.",
    },
    {
      category: "Support",
      question: "What support options are available?",
      answer:
        "We offer email support for all users, priority support for Professional plans, and 24/7 support for Team plans. We also have comprehensive documentation and video tutorials.",
    },
    {
      category: "Support",
      question: "How do I report a bug or request a feature?",
      answer:
        "You can report bugs or request features through our support portal, email, or directly in the app. We actively review all feedback and prioritize based on user needs.",
    },
    {
      category: "Support",
      question: "Do you offer training or onboarding?",
      answer:
        "Yes! We provide onboarding sessions for Team plan customers and have extensive documentation, video tutorials, and best practices guides for all users.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4" variant="secondary">
              ❓ Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about Context Keeper
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div
                      className={`inline-flex p-3 rounded-full ${category.color} mb-3`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {
                        faqs.filter((faq) => faq.category === category.name)
                          .length
                      }{" "}
                      questions
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleItem(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                        <CardTitle className="text-lg">
                          {faq.question}
                        </CardTitle>
                      </div>
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  {openItems.includes(index) && (
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No FAQs found matching your search.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is here to help you get the most out of Context
              Keeper.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                Contact Support
              </Button>
              <Link to="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
