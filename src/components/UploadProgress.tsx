
import React from 'react';
import { CheckCircle, XCircle, Clock, ArrowUpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FileUploadStatus } from '@/lib/googleDrive';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UploadProgressProps {
  files: FileUploadStatus[];
}

const UploadProgress: React.FC<UploadProgressProps> = ({ files }) => {
  if (!files.length) return null;
  
  const renderStatusIcon = (status: FileUploadStatus['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500 animate-scale-in" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500 animate-scale-in" />;
      case 'uploading':
        return <ArrowUpCircle className="h-5 w-5 text-blue-500 animate-pulse-gentle" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-slide-up">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700">Upload Progress</h3>
      </div>
      
      <ScrollArea className="max-h-[300px]">
        <div className="p-3 space-y-3">
          {files.map((file) => (
            <div 
              key={file.id}
              className={cn(
                "p-3 rounded-md transition-all duration-300",
                file.status === 'success' && "bg-green-50",
                file.status === 'error' && "bg-red-50",
                (file.status === 'uploading' || file.status === 'pending') && "bg-gray-50"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 truncate">
                  <div className="flex-shrink-0">
                    {renderStatusIcon(file.status)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {file.name}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {file.progress}%
                </span>
              </div>
              
              <Progress 
                value={file.progress} 
                className={cn(
                  "h-1.5",
                  file.status === 'success' && "bg-green-100",
                  file.status === 'error' && "bg-red-100",
                  (file.status === 'uploading' || file.status === 'pending') && "bg-gray-100"
                )}
                indicatorClassName={cn(
                  file.status === 'success' && "bg-green-500",
                  file.status === 'error' && "bg-red-500",
                  file.status === 'uploading' && "bg-blue-500 animate-pulse-gentle",
                  file.status === 'pending' && "bg-gray-300"
                )}
              />
              
              {file.message && (
                <p className={cn(
                  "text-xs mt-1",
                  file.status === 'error' ? "text-red-500" : "text-gray-500"
                )}>
                  {file.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UploadProgress;
