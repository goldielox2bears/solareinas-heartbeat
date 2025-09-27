import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, BookOpen, Users, Leaf, Heart } from "lucide-react";

const SanctuaryResources = () => {
  const resources = [
    {
      id: 1,
      title: "Sanctuary Guide",
      description: "A comprehensive overview of our rescue process, regenerative practices, and how supporters can help",
      type: "PDF Download",
      icon: <Download className="w-5 h-5" />,
      size: "2.3 MB",
      pages: "12 pages",
      action: "Download Guide"
    },
    {
      id: 2,
      title: "Wildlife Care Manual",
      description: "Educational resource about wildlife rehabilitation, species-specific care, and conservation best practices",
      type: "PDF Download",
      icon: <BookOpen className="w-5 h-5" />,
      size: "5.1 MB",
      pages: "28 pages",
      action: "Download Manual"
    },
    {
      id: 3,
      title: "Volunteer Handbook",
      description: "Everything you need to know about volunteering, from daily routines to safety protocols",
      type: "PDF Download",
      icon: <Users className="w-5 h-5" />,
      size: "1.8 MB",
      pages: "16 pages",
      action: "Download Handbook"
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Regenerative Pasture Management: Healing the Land",
      excerpt: "How our innovative grazing rotation system restores soil health while providing natural habitats for wildlife recovery.",
      readTime: "8 min read",
      category: "Conservation",
      icon: <Leaf className="w-5 h-5" />,
      link: "#"
    },
    {
      id: 2,
      title: "Understanding Raptor Rehabilitation: Luna's Journey",
      excerpt: "A deep dive into the specialized care required for birds of prey, following Luna's remarkable recovery story.",
      readTime: "6 min read",
      category: "Animal Care",
      icon: <Heart className="w-5 h-5" />,
      link: "#"
    },
    {
      id: 3,
      title: "Educational Outreach: Inspiring the Next Generation",
      excerpt: "How our school programs are creating wildlife ambassadors and fostering environmental stewardship in young minds.",
      readTime: "5 min read",
      category: "Education",
      icon: <Users className="w-5 h-5" />,
      link: "#"
    }
  ];

  const educationalPrograms = [
    {
      title: "School Field Trips",
      description: "Interactive learning experiences for students K-12",
      duration: "2-3 hours",
      capacity: "Up to 30 students"
    },
    {
      title: "Adult Workshops",
      description: "Wildlife photography, conservation talks, and habitat restoration",
      duration: "Half or full day",
      capacity: "15-20 participants"
    },
    {
      title: "Virtual Tours",
      description: "Online sanctuary tours for remote learning",
      duration: "45 minutes",
      capacity: "Unlimited"
    }
  ];

  return (
    <section id="sanctuary-resources" className="py-24 px-6 bg-gradient-peaceful">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Educational Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about wildlife conservation, sanctuary operations, and how you can make a difference
          </p>
        </div>

        {/* Downloadable Resources */}
        <div className="mb-16">
          <h3 className="text-2xl font-light mb-8 text-center text-foreground">
            Download Our Guides
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="bg-background/80 backdrop-blur-sm shadow-gentle hover:shadow-warm transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {resource.icon}
                    </div>
                    <div className="text-sm text-muted-foreground">{resource.type}</div>
                  </div>
                  <CardTitle className="text-lg text-foreground">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{resource.size}</span>
                    <span>{resource.pages}</span>
                  </div>
                  
                  <Button variant="steward" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    {resource.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="mb-16">
          <h3 className="text-2xl font-light mb-8 text-center text-foreground">
            Latest Stories & Insights
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-background/80 backdrop-blur-sm shadow-gentle hover:shadow-warm transition-all duration-300 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary">
                      {post.icon}
                    </div>
                    <div className="text-sm font-medium text-secondary">{post.category}</div>
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              📚 View All Articles
            </Button>
          </div>
        </div>

        {/* Educational Programs */}
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-gentle">
          <h3 className="text-2xl md:text-3xl font-light mb-8 text-center text-foreground">
            Educational Programs
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {educationalPrograms.map((program, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-sanctuary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">
                    {index === 0 ? "🎓" : index === 1 ? "👥" : "💻"}
                  </span>
                </div>
                <h4 className="text-lg font-medium mb-2 text-foreground">{program.title}</h4>
                <p className="text-muted-foreground mb-4">{program.description}</p>
                <div className="text-sm text-muted-foreground">
                  <div>Duration: {program.duration}</div>
                  <div>Capacity: {program.capacity}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              All programs can be customized to meet specific learning objectives and age groups
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="steward" size="lg">
                📅 Schedule a Program
              </Button>
              <Button variant="outline" size="lg">
                📧 Request Information
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-light mb-6 text-foreground">
            Additional Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="sm">
              🌐 Wildlife Conservation Links
            </Button>
            <Button variant="outline" size="sm">
              📋 Research Publications
            </Button>
            <Button variant="outline" size="sm">
              🎥 Documentary Features
            </Button>
            <Button variant="outline" size="sm">
              📊 Annual Reports
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryResources;