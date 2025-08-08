
import type { Timestamp } from 'firebase/firestore';

export type CaseAnalysis = {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string;
  successProbability: number;
  estimatedDuration: string;
  complexity: "simple" | "media" | "compleja";
};

// Represents the data structure as it is stored in Firestore
export type CaseFirestore = Omit<Case, 'createdAt' | 'updatedAt' | 'lawyerDecision' | 'conversation'> & {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lawyerDecision: Omit<Case['lawyerDecision'], 'timestamp'> & {
        timestamp: Timestamp;
    };
    conversation: Omit<Case['conversation'], 'messages'> & {
        messages: (Omit<Case['conversation']['messages'][0], 'timestamp'> & { timestamp: Timestamp })[];
    }
};


// Represents the data structure used in the application, with JS Date objects
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
      timestamp: Date; // Changed from Timestamp
      type: "text" | "audio" | "image" | "document";
    }[];
    status: "en curso" | "completado" | "abandonado";
  };
  lawyerDecision: {
    status: "pendiente" | "aceptado" | "rechazado";
    decision: string;
    timestamp: Date; // Changed from Timestamp
    notes: string;
  };
  createdAt: Date; // Changed from Timestamp
  updatedAt: Date; // Changed from Timestamp
};
