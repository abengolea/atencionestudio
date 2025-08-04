'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Case } from '@/types';

interface WhatsAppChatProps {
  caseData: Case;
}

export function WhatsAppChat({ caseData }: WhatsAppChatProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Conversación con el Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
          {caseData.conversation.messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex w-full max-w-xs flex-col gap-1',
                msg.sender === 'ai' ? 'ml-auto items-end' : 'mr-auto items-start'
              )}
            >
              <div
                className={cn(
                  'rounded-lg px-3 py-2 text-sm',
                  msg.sender === 'ai'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card'
                )}
              >
                {msg.message}
              </div>
              <span className="text-xs text-muted-foreground">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
