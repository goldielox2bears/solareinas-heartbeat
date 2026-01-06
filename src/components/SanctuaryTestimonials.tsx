import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import TestimonialSubmissionForm from "./TestimonialSubmissionForm";

interface CommunityTestimonial {
  id: string;
  content: string;
  rating: number;
  photo_url: string | null;
  created_at: string;
  user_id: string;
}

const SanctuaryTestimonials = () => {
  const { user, loading: authLoading } = useAuth();
  const [communityTestimonials, setCommunityTestimonials] = useState<CommunityTestimonial[]>([]);
  const [userProfile, setUserProfile] = useState<{ display_name: string | null; first_name: string | null } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const staticTestimonials = [
    {
      id: 1,
      name: "Dr. Maria Santos",
      role: "Wildlife Veterinarian",
      avatar: "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png",
      quote: "The level of care and dedication at Solareinas Ranch is extraordinary. Every animal receives individualized treatment plans and the rehabilitation success rate speaks for itself.",
      rating: 5,
      location: "Local Wildlife Clinic"
    },
    {
      id: 2,
      name: "James Thompson",
      role: "Monthly Donor",
      avatar: "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png",
      quote: "Seeing the monthly updates from Luna's recovery journey has been incredible. The transparency and love in every report makes me proud to support this sanctuary.",
      rating: 5,
      location: "Phoenix, Arizona"
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Weekend Volunteer",
      avatar: "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png",
      quote: "Volunteering here has changed my life. The staff's knowledge and the animals' personalities create an environment where both healing and learning happen naturally.",
      rating: 5,
      location: "Local Community"
    }
  ];

  useEffect(() => {
    fetchCommunityTestimonials();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

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

  const fetchUserProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('display_name, first_name')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (data) {
      setUserProfile(data);
    }
  };

  const handleSubmitSuccess = () => {
    setShowForm(false);
    fetchCommunityTestimonials();
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

        {/* Share Your Story Section */}
        <div className="mb-16">
          {authLoading ? null : user ? (
            showForm ? (
              <TestimonialSubmissionForm
                userId={user.id}
                userDisplayName={userProfile?.display_name || userProfile?.first_name || undefined}
                onSubmitSuccess={handleSubmitSuccess}
              />
            ) : (
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 text-center">
                <h4 className="text-xl font-medium text-foreground mb-2">Share Your Story</h4>
                <p className="text-muted-foreground mb-6">
                  Are you a Free Herd participant or Steward? We'd love to hear about your experience!
                </p>
                <Button onClick={() => setShowForm(true)}>Share My Experience</Button>
              </div>
            )
          ) : (
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <h4 className="text-xl font-medium text-foreground mb-2">Share Your Story</h4>
              <p className="text-muted-foreground mb-6">
                Sign in to share your experience as a Free Herd participant or Steward
              </p>
              <Link to="/auth">
                <Button>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In to Share
                </Button>
              </Link>
            </div>
          )}
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

        {/* Static Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {staticTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card/80 backdrop-blur-sm shadow-gentle hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-muted-foreground mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* Social Feed Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-light text-center mb-8 text-foreground">
            Follow Our Journey
          </h3>
          
          <div className="bg-card/50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">📱</div>
            <h4 className="text-lg font-medium mb-2 text-foreground">@SolareinasSanctuary</h4>
            <p className="text-muted-foreground mb-6">
              Daily updates, behind-the-scenes moments, and success stories from our sanctuary family
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium">
                📷 Instagram
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium">
                🐦 Twitter
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium">
                📘 Facebook
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
          
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-foreground bg-white/90 placeholder:text-muted-foreground"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors">
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