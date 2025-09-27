import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const SanctuaryTestimonials = () => {
  const testimonials = [
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

  const pressLogos = [
    { name: "Wildlife Today", logo: "🦅" },
    { name: "Conservation Weekly", logo: "🌿" },
    { name: "Local News 12", logo: "📺" },
    { name: "Ranch Life Magazine", logo: "📖" }
  ];

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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
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

        {/* Press & Recognition */}
        <div className="bg-gradient-peaceful rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-light mb-8 text-foreground">
            As Featured In
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {pressLogos.map((press, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{press.logo}</div>
                <div className="text-sm font-medium text-muted-foreground">{press.name}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <p className="text-muted-foreground mb-4">
              Recognized for excellence in wildlife rehabilitation and community engagement
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span className="bg-primary/10 px-3 py-1 rounded-full">Wildlife Sanctuary of the Year 2023</span>
              <span className="bg-secondary/20 px-3 py-1 rounded-full">Conservation Excellence Award</span>
              <span className="bg-accent/20 px-3 py-1 rounded-full">Community Partner Recognition</span>
            </div>
          </div>
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