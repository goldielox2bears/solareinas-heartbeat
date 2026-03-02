import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CommunityTestimonial {
  id: string;
  content: string;
  rating: number;
  photo_url: string | null;
  created_at: string;
  user_id: string;
}

const SanctuaryTestimonials = () => {
  const [communityTestimonials, setCommunityTestimonials] = useState<CommunityTestimonial[]>([]);

  useEffect(() => {
    fetchCommunityTestimonials();
  }, []);

  const fetchCommunityTestimonials = async () => {
    const { data } = await supabase
      .from('community_testimonials')
      .select('*')
      .eq('approval_status', 'approved')
      .order('created_at', { ascending: false });
    
    if (data) {
      setCommunityTestimonials(data);
    }
  };

  return (
    <section id="sanctuary-testimonials" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Stories from Our Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from the veterinarians, volunteers, and supporters who make our mission possible
          </p>
        </div>

        {/* Community Testimonials */}
        {communityTestimonials.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-light text-center mb-8 text-foreground">
              From Our Community
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {communityTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-card/80 backdrop-blur-sm shadow-gentle hover:shadow-warm transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        {testimonial.photo_url && <AvatarImage src={testimonial.photo_url} alt="Community member" />}
                        <AvatarFallback>🌾</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">Community Member</div>
                        <div className="text-sm text-primary font-medium">Free Herd / Steward</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Social Feed Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-light text-center mb-8 text-foreground">
            Follow Our Journey
          </h3>
          
          <div className="bg-card/50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">📱</div>
            <h4 className="text-lg font-medium mb-2 text-foreground">@SolareinasRanch</h4>
            <p className="text-muted-foreground mb-6">
              Daily updates, behind-the-scenes moments, and success stories from our sanctuary family
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium">
                📷 Instagram
              </button>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium">
                📝 Substack
              </button>
              <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium">
                📌 Pinterest
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-steward rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h3 className="text-2xl md:text-3xl font-light mb-4">
            Stay Connected
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get quarterly 'Sanctuary News' with exclusive photo updates, resident stories, and behind-the-scenes insights
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-foreground bg-white/90 placeholder:text-muted-foreground"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm opacity-75 mt-4">
            No spam, just heartwarming updates. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryTestimonials;
