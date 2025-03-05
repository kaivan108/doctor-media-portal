
import { toast } from 'sonner';

// Service account credentials
const SERVICE_ACCOUNT_CREDENTIALS = {
  "type": "service_account",
  "project_id": "always-care-451104",
  "private_key_id": "920fd0f1af2c51d7d4dcdc70510d77dd8d5b4ba4",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCi+humd2sYIgmV\nrdqc4eKXf3gJFRztgh1ZAjBYvC+q8qP3Q6VYZLAJxqc0CWpj1iR9e1j1SbDbSC4U\ndBCAwDxA51tFrYxXMf+Tvy0LKX3aJOm87flevS1RgeIlU7H4R/gSczpF6Sibs1U+\nTSFG3WQ/NxqXpFLiUGJTr1vTEQgbHmuOBYotKRBSciai8znLykPU8JelMmPcDWds\n5GqZfDVvwPjGgGSagLvDZ9/Tn/HIY9qmDn93cmqadFH6FJKYKZxbWfY2PzoH1avR\nNFhzbfKCj1L5kFDGJhBsCT6ztDaQg4gKG0rbU4nit5+ARI6pdLqWd2FY4CtrT3wL\nW/OY7extAgMBAAECggEAByY6GXTCdldN53/uJ7TSrsB+ffAsFJuBLpL67HWVkLtJ\nUpLoLrG8tYe+SiPXQ9m/FYsYQABeJAHCqw6GsniHBsuEtJCJqBc50IZ8fcbG7iTG\n5SJlA/vVVa6WgqUtLjNNWv/Xhf1q/4jf0SvAgojlOXmxGVxcb3BFHp8sw8b1kvzn\nX7/SEXXoYwC4eJZgQYQIthPGeYxd/RqxauJ/U+OrqN0G6UpSla0XKZdNCxhgfemf\nyuI2xroU+EHDahu7I9y3ccZE7geVnIE9MwY+dQ17GCyP97MaWyklf/Wpk6cay7bu\ncJo+yaGySwpshM7yEgPaHmX+Bg3sq/hY8h2OZa5JYQKBgQDhvxEmxt238BF50umu\n+glhahGB3GAM4GNr9DDoZsNxEL371yNithYb/eQ7GaUt8nJvoKrQEVmC7StNTYer\nKphBr4ZHOi8JrNGNCFS3me1JqjBKotQNT9/tTnYr+rfi9cK1R+rRLCum4LZg28Yb\nKBzQ58YBfUff/boGlH6GQ7x1zQKBgQC40Yq6p49O9A/xOXs+6s8W3tro/sKxrdQ3\nx0bvYtgIYIYPxvAV5AAM44TCaQs1X5Nd/W02s8Aq/OEKrmR/37zTbQXhQRKaU8Ws\nYayZYWRy0zFNXuYraTLldsT1PDGWj5wSEx+HfWkAPupRRQR571ZIgk0Kk8L42soo\nyqKFoPCxIQKBgQDGENsel6tfQH5E0f4AbRcf5m138ABCK/pvdHAY6Fkgcd0PAqLk\nb/iUFL5T8FtSJf+r218jcaWEz0yH5bdcQeIW98cr5Wvx5DRztlSGRsLAOFdolNbS\n2zsQvh/G1JLUymZMoc3wOv4Ny+mYsBtwJlCqJkE/e0k9ySOXtGASs4m+HQKBgC9A\nCxqrSf0icoz2aCbuuyEaupbEwxvP2CimfuEmwRprKvsPnkPKdaTV6hQV7PKpS7DE\n4M4SaHfVDOfBLBpxJgJbphwvmcTw0+G9WvYfqyGcEse4ElpY29VEZxhXWkomzvzj\n/LSUAGs6qoc6gOl3ofSJs46XtkoPDY4eOCy3t7FhAoGBANYspgEWglOHdmrDpP9p\nf+gMplagWiv0qzFsXekKb6BiurkPUVSkL6Wz7FyYeudwevjx7jH9DCtxNWpoQNNr\nGTz+/0kdrT6KAUQpaQf+6cWBvjlAiLtCsJQrhT3ek6coB1J/tFKJuS7piI+kLf3W\nPR6Sl/Myp2mG3Q/AI54gzccc\n-----END PRIVATE KEY-----\n",
  "client_email": "alwayscare@always-care-451104.iam.gserviceaccount.com",
  "client_id": "102803220550824562703",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/alwayscare%40always-care-451104.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

export interface FileUploadStatus {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  message?: string;
}

export interface UploadResult {
  success: boolean;
  folderLink?: string;
  message?: string;
}

// Mock implementation of finding or creating a case folder
export const findOrCreateCaseFolder = async (
  parentFolderId: string,
  caseNumber: string
): Promise<{ folderId: string; folderLink: string }> => {
  console.log(`Finding or creating folder for case ${caseNumber} in ${parentFolderId}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would:
  // 1. Check if folder with name caseNumber exists in parentFolderId
  // 2. If it exists, return its ID
  // 3. If not, create a new folder and return its ID
  
  // For simulation, we'll generate a mock case folder ID based on parent ID and case number
  const caseFolderId = `${parentFolderId}-case-${caseNumber}`;
  
  // Generate a folder link to the specific case folder
  const folderLink = `https://drive.google.com/drive/folders/${caseFolderId}?usp=sharing`;
  
  return { folderId: caseFolderId, folderLink };
};

// This is a mock implementation for demo purposes.
// In a real implementation, you would use the Google Drive API JS client.
export const uploadFilesToGoogleDrive = async (
  files: File[],
  locationFolderId: string,
  caseNumber: string,
  progressCallback: (statuses: FileUploadStatus[]) => void
): Promise<UploadResult> => {
  if (!files.length) {
    return { success: false, message: 'No files selected for upload' };
  }
  
  console.log(`Starting upload to folder ID: ${locationFolderId} for case: ${caseNumber}`);
  
  // Create file status objects
  const fileStatuses: FileUploadStatus[] = files.map(file => ({
    id: Math.random().toString(36).substring(2, 9),
    name: file.name,
    progress: 0,
    status: 'pending'
  }));
  
  progressCallback([...fileStatuses]);
  
  try {
    // Find or create case folder
    const { folderId: caseFolderId, folderLink } = await findOrCreateCaseFolder(locationFolderId, caseNumber);
    console.log(`Case folder ID: ${caseFolderId} with link: ${folderLink}`);
    
    // Update statuses to uploading
    fileStatuses.forEach(status => {
      status.status = 'uploading';
    });
    progressCallback([...fileStatuses]);
    
    // Simulate uploading files one by one to the case folder
    for (let i = 0; i < fileStatuses.length; i++) {
      const file = files[i];
      const status = fileStatuses[i];
      
      console.log(`Uploading file: ${file.name} to case folder: ${caseFolderId}`);
      
      // Simulate progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        status.progress = progress;
        progressCallback([...fileStatuses]);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      status.status = 'success';
      progressCallback([...fileStatuses]);
    }
    
    return {
      success: true,
      folderLink,
      message: `Successfully uploaded ${files.length} files to case ${caseNumber}`
    };
  } catch (error) {
    console.error('Upload error:', error);
    
    // Mark all pending uploads as failed
    fileStatuses.forEach(status => {
      if (status.status === 'uploading' || status.status === 'pending') {
        status.status = 'error';
        status.message = 'Upload failed';
      }
    });
    
    progressCallback([...fileStatuses]);
    
    return {
      success: false,
      message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
