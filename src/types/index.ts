export type Case = {
  id: string;
  lawyerId: string;
  clientInfo: {
    name: string;
    phone: string;
    email: string;
    location: string;
  };
  caseDetails: {
    type: string;
    description: string;
    urgency: "low" | "medium" | "high";
    estimatedValue: number;
    documents: { name: string; url: string }[];
    timeline: string;
  };
  aiAnalysis: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string;
    successProbability: number;
    estimatedDuration: string;
    complexity: "simple" | "medium" | "complex";
  };
  conversation: {
    messages: {
      sender: "client" | "ai";
      message: string;
      timestamp: Date;
      type: "text" | "audio" | "image" | "document";
    }[];
    status: "ongoing" | "completed" | "abandoned";
  };
  lawyerDecision: {
    status: "pending" | "accepted" | "rejected";
    decision: string;
    timestamp: Date;
    notes: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
