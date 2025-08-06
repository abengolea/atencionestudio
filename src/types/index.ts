export type CaseAnalysis = {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string;
  successProbability: number;
  estimatedDuration: string;
  complexity: "simple" | "media" | "compleja";
};

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
    urgency: "baja" | "media" | "alta";
    estimatedValue: number;
    documents: { name: string; url: string }[];
    timeline: string;
  };
  aiAnalysis: CaseAnalysis;
  conversation: {
    messages: {
      sender: "client" | "ai";
      message: string;
      timestamp: Date;
      type: "text" | "audio" | "image" | "document";
    }[];
    status: "en curso" | "completado" | "abandonado";
  };
  lawyerDecision: {
    status: "pendiente" | "aceptado" | "rechazado";
    decision: string;
    timestamp: Date;
    notes: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
