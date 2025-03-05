
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ResultLinkProps {
  link: string;
  className?: string;
}

const ResultLink: React.FC<ResultLinkProps> = ({ link, className }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const openLink = () => {
    window.open(link, '_blank');
  };
  
  return (
    <Card className={cn("w-full border-green-100 bg-green-50/50 shadow-sm animate-scale-in", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div>
            <span className="heading-chip bg-green-100 text-green-700">Ready to Share</span>
            <h3 className="text-sm font-medium text-gray-700 mt-1">
              Your uploads have been successfully processed
            </h3>
          </div>
          
          <div className="flex items-center gap-3 bg-white rounded-md border border-gray-100 p-2 pr-1 shadow-sm">
            <div className="flex-1 truncate">
              <p className="text-xs text-gray-500 font-medium truncate">
                {link}
              </p>
            </div>
            <div className="flex-shrink-0 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                onClick={openLink}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            className="w-full mt-2 bg-primary/90 hover:bg-primary"
            onClick={openLink}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Google Drive
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultLink;
