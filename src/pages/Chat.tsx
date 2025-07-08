import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ChatMessage } from "@/components/ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Send, ArrowLeft, Languages } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  responses?: {
    [key: string]: string;
  };
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
      // Keep input focused
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Please type a question before sending.",
        variant: "destructive",
      });
      return;
    }

    if (selectedLanguages.length === 0) {
      toast({
        title: "Please select at least one language.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        isUser: false,
        responses: {
          english: "As Lord Krishna teaches in the Bhagavad Gītā (Chapter 2, Verse 47): 'You have a right to perform your prescribed duty, but not to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.' This wisdom guides us to focus on our dharma while surrendering the outcomes.",
          hindi: "जैसा कि भगवान कृष्ण गीता में सिखाते हैं (अध्याय 2, श्लोक 47): 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।' यह ज्ञान हमें सिखाता है कि हमें अपने कर्तव्य पर ध्यान देना चाहिए और फल की चिंता नहीं करनी चाहिए।",
          telugu: "భగవద్గీతలో భగవాన్ కృష్ణుడు బోధిస్తున్నట్లు (అధ్యాయం 2, శ్లోకం 47): 'కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన। మా కర్మఫలహేతుర్భూర్మా తే సంగోఽస్త్వకర్మణి।' ఈ జ్ఞానం మనకు మన ధర్మంపై దృష్టి పెట్టి, ఫలితాలను వదులుకోవాలని చెబుతుంది।"
        }
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ChatSidebar = () => (
    <Sidebar className="w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 mb-4">
            <Languages className="h-4 w-4" />
            Language Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <LanguageSelector 
              selectedLanguages={selectedLanguages}
              onLanguageChange={setSelectedLanguages}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Show sidebar only when there are messages */}
        {messages.length > 0 && <ChatSidebar />}
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border/50 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild size="sm">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Link>
                </Button>
                <div className="flex items-center gap-3">
                  <span className="om-symbol">ॐ</span>
                  <h1 className="text-xl font-cinzel font-bold gradient-spiritual bg-clip-text text-transparent">
                    Gītā Wisdom
                  </h1>
                </div>
              </div>
              {/* Show sidebar trigger only when there are messages */}
              {messages.length > 0 && (
                <SidebarTrigger className="ml-auto" />
              )}
            </div>
          </header>

          {/* Language Selector - show only when no messages */}
          {messages.length === 0 && (
            <div className="border-b border-border/50 p-4">
              <div className="container mx-auto">
                <LanguageSelector 
                  selectedLanguages={selectedLanguages}
                  onLanguageChange={setSelectedLanguages}
                />
              </div>
            </div>
          )}

          {/* Chat Area */}
          <div ref={chatContainerRef} className="flex-1 container mx-auto p-4 max-w-4xl overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <Card className="p-8 text-center max-w-md shadow-gentle">
                  <div className="text-4xl mb-4">🙏</div>
                  <h3 className="text-lg font-cinzel font-semibold mb-2">
                    Ask anything about life, duty, or purpose
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    — and let the Gītā answer
                  </p>
                </Card>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    selectedLanguages={selectedLanguages}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <Card className="p-4 max-w-xs shadow-gentle">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Seeking wisdom...</span>
                      </div>
                    </Card>
                  </div>
                )}
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-4 bg-card">
            <div className="container mx-auto max-w-4xl">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your question about life, dharma, or spiritual guidance..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="gradient-spiritual shadow-divine"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Footer Attribution */}
              <div className="text-center mt-4 pt-4 border-t border-border/20">
                <p className="text-xs text-muted-foreground">
                  Designed and crafted by Rohith Kumar Singirikonda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Chat;