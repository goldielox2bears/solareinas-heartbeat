import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Upload, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TestimonialSubmissionFormProps {
  userId: string;
  userDisplayName?: string;
  onSubmitSuccess: () => void;
}

const TestimonialSubmissionForm = ({ userId, userDisplayName, onSubmitSuccess }: TestimonialSubmissionFormProps) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Please add your story",
        description: "Share your experience with us",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let photoUrl: string | null = null;

      // Upload photo if provided
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `testimonials/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('animal-photos')
          .upload(filePath, photoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('animal-photos')
          .getPublicUrl(filePath);
        
        photoUrl = publicUrl;
      }

      // Insert testimonial
      const { error } = await supabase
        .from('community_testimonials')
        .insert({
          user_id: userId,
          content: content.trim(),
          rating,
          photo_url: photoUrl,
        });

      if (error) throw error;

      setIsSubmitted(true);
      onSubmitSuccess();
      
      toast({
        title: "Thank you for sharing!",
        description: "Your story has been submitted and is awaiting approval.",
      });
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h4 className="text-xl font-medium text-foreground mb-2">Story Submitted!</h4>
        <p className="text-muted-foreground">
          Thank you for sharing your experience. Your testimonial will appear here once approved by our team.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8">
      <h4 className="text-xl font-medium text-foreground mb-2">Share Your Story</h4>
      <p className="text-muted-foreground mb-6">
        {userDisplayName ? `Hi ${userDisplayName}! ` : ""}Tell us about your experience with Solareinas Sanctuary
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Your Experience</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share what your experience at the sanctuary has meant to you..."
            className="min-h-[120px] bg-background/50"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-1">{content.length}/500 characters</p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Add Your Photo (Optional)</label>
          <div className="flex items-center gap-4">
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoFile(null);
                    setPhotoPreview(null);
                  }}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-sm text-muted-foreground">Upload a photo to personalize your testimonial</p>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Your Story"
          )}
        </Button>
      </form>
    </div>
  );
};

export default TestimonialSubmissionForm;
