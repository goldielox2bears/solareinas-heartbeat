import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, ImageIcon } from 'lucide-react';

interface AnimalPhotoUploadProps {
  animalId: string;
  animalName: string;
  onUploadSuccess?: (photoUrl: string) => void;
}

export const AnimalPhotoUpload: React.FC<AnimalPhotoUploadProps> = ({
  animalId,
  animalName,
  onUploadSuccess
}) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [folder, setFolder] = useState('');
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a photo to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('animal_id', animalId);
      if (folder.trim()) {
        formData.append('folder', folder.trim().endsWith('/') ? folder.trim() : folder.trim() + '/');
      }

      const { data, error } = await supabase.functions.invoke('upload-animal-photo', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast({
          title: "Upload successful",
          description: `Photo uploaded for ${animalName}`,
        });

        // Reset form
        setSelectedFile(null);
        setFolder('');
        const fileInput = document.getElementById('photo-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        // Notify parent component
        if (onUploadSuccess && data.public_url) {
          onUploadSuccess(data.public_url);
        }
      } else {
        throw new Error(data.error || 'Upload failed');
      }

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Upload Photo for {animalName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="folder-input">Folder (optional)</Label>
          <Input
            id="folder-input"
            type="text"
            placeholder="e.g. original/ or thumbnails/"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            disabled={uploading}
          />
        </div>

        <div>
          <Label htmlFor="photo-file-input">Select Photo</Label>
          <Input
            id="photo-file-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </div>

        {selectedFile && (
          <div className="text-sm text-muted-foreground">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          disabled={uploading || !selectedFile}
          className="w-full"
        >
          {uploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};