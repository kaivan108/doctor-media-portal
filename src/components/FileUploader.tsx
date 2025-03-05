
import React, { useCallback, useState } from 'react';
import { Upload, X, File, Image, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFilesSelected,
  disabled = false 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles(prev => [...prev, ...newFiles]);
      onFilesSelected([...files, ...newFiles]);
    }
  };
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
    onFilesSelected([...files, ...droppedFiles]);
  }, [disabled, files, onFilesSelected]);
  
  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };
  
  const renderFileIcon = (file: File) => {
    const fileType = file.type.split('/')[0];
    
    if (fileType === 'image') {
      return <Image className="w-5 h-5 text-blue-500" />;
    } else if (fileType === 'video') {
      return <Video className="w-5 h-5 text-purple-500" />;
    } else {
      return <File className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const getFilePreview = (file: File) => {
    const fileType = file.type.split('/')[0];
    
    if (fileType === 'image') {
      return URL.createObjectURL(file);
    }
    return null;
  };
  
  return (
    <div className="w-full space-y-4">
      <div
        className={cn(
          "file-upload-area",
          isDragging && "dragging",
          disabled && "opacity-60 cursor-not-allowed",
          files.length > 0 ? "border-primary/30 bg-primary/5" : "border-gray-200 bg-gray-50/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={handleFileInput}
          disabled={disabled}
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3 animate-pulse-gentle" />
          <p className="text-sm font-medium text-gray-700 mb-1">
            Drag and drop files here
          </p>
          <p className="text-xs text-gray-500 mb-3">
            or
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={disabled}
            className="mt-2 mx-auto"
          >
            Browse Files
          </Button>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="animate-slide-up">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Selected Files ({files.length})
          </div>
          <div className="grid gap-2 max-h-[200px] overflow-y-auto p-1">
            {files.map((file, index) => (
              <div 
                key={`${file.name}-${index}`}
                className="group flex items-center justify-between p-2 rounded-md bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className="flex-shrink-0">
                    {getFilePreview(file) ? (
                      <div className="h-8 w-8 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img 
                          src={getFilePreview(file) || ''} 
                          alt={file.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        {renderFileIcon(file)}
                      </div>
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors duration-200"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
