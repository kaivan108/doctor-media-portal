
import React, { useState } from 'react';
import { locations } from '@/data/locations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUploader from './FileUploader';
import UploadProgress from './UploadProgress';
import ResultLink from './ResultLink';
import { Check, UploadCloud, AlertCircle } from 'lucide-react';
import { uploadFilesToGoogleDrive, FileUploadStatus } from '@/lib/googleDrive';
import { toast } from 'sonner';

const UploadForm: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [caseNumber, setCaseNumber] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatuses, setUploadStatuses] = useState<FileUploadStatus[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; folderLink?: string }>({
    success: false
  });
  
  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };
  
  const validateForm = () => {
    if (!location) {
      toast.error('Please select an ambulance or clinic');
      return false;
    }
    
    if (!caseNumber || caseNumber.trim() === '') {
      toast.error('Please enter a case number');
      return false;
    }
    
    if (files.length === 0) {
      toast.error('Please select at least one file to upload');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const selectedLocation = locations.find(loc => loc.id === location);
    
    if (!selectedLocation) {
      toast.error('Invalid location selected');
      return;
    }
    
    setIsUploading(true);
    setUploadResult({ success: false });
    
    try {
      toast.info('Starting upload process...', {
        description: `Uploading ${files.length} files to case ${caseNumber}`
      });
      
      const result = await uploadFilesToGoogleDrive(
        files,
        selectedLocation.folderId,
        caseNumber,
        (statuses) => setUploadStatuses([...statuses])
      );
      
      if (result.success) {
        setUploadResult({
          success: true,
          folderLink: result.folderLink
        });
        toast.success('Upload completed successfully', {
          description: `All files have been uploaded to case ${caseNumber}`
        });
      } else {
        toast.error('Upload failed', {
          description: result.message
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An unexpected error occurred', {
        description: error instanceof Error ? error.message : 'Failed to upload files'
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const resetForm = () => {
    setLocation('');
    setCaseNumber('');
    setFiles([]);
    setUploadStatuses([]);
    setUploadResult({ success: false });
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="glass-morphism glass-morphism-hover shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Ambulance / Clinic Location
                </Label>
                <Select
                  value={location}
                  onValueChange={setLocation}
                  disabled={isUploading || uploadResult.success}
                >
                  <SelectTrigger id="location" className="w-full focus-ring">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="caseNumber" className="text-sm font-medium">
                  Case Number
                </Label>
                <Input
                  id="caseNumber"
                  placeholder="Enter case number"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="focus-ring"
                  disabled={isUploading || uploadResult.success}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Upload Files
                </Label>
                <FileUploader
                  onFilesSelected={handleFilesSelected}
                  disabled={isUploading || uploadResult.success}
                />
              </div>
            </div>
            
            {!uploadResult.success && (
              <Button
                type="submit"
                className="w-full bg-primary/90 hover:bg-primary transition-all duration-300"
                disabled={isUploading || files.length === 0}
              >
                {isUploading ? (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4 animate-pulse" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload {files.length > 0 && `${files.length} Files`}
                  </>
                )}
              </Button>
            )}
            
            {uploadStatuses.length > 0 && !uploadResult.success && (
              <UploadProgress files={uploadStatuses} />
            )}
            
            {uploadResult.success && uploadResult.folderLink && (
              <div className="space-y-4">
                <ResultLink link={uploadResult.folderLink} />
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={resetForm}
                >
                  <Check className="mr-2 h-4 w-4" /> Upload More Files
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadForm;
