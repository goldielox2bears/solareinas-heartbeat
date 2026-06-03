import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const JoinTheRanchList = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email.trim(),
      name: name.trim() || null,
      source: "ranch_list",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Couldn't sign you up", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome to the Ranch List", description: "We'll be in touch with small-batch drops and farm stories." });
      setEmail("");
      setName("");
    }
  };

  return (
    <section id="ranch-list" className="py-20 md:py-28 bg-accent text-accent-foreground">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <p className="font-label uppercase tracking-[0.3em] text-[0.7rem] text-accent-foreground/75 mb-5">
          — Join the list
        </p>
        <h2 className="font-prairie-display text-4xl md:text-5xl leading-tight mb-5">
          Join the Ranch List
        </h2>
        <p className="font-prairie-body text-base md:text-lg text-accent-foreground/90 leading-relaxed mb-8">
          Get first access to small-batch drops, animal updates, farm impact
          stories, and volunteer openings.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input
            type="text"
            placeholder="First name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background/10 border-background/30 text-accent-foreground placeholder:text-accent-foreground/60 rounded-none"
          />
          <Input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/10 border-background/30 text-accent-foreground placeholder:text-accent-foreground/60 rounded-none"
          />
          <Button
            type="submit"
            disabled={loading}
            className="rounded-none font-label uppercase text-[0.74rem] tracking-[0.22em] bg-background text-foreground hover:bg-background/90 shrink-0"
          >
            {loading ? "Joining…" : "Join"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default JoinTheRanchList;
