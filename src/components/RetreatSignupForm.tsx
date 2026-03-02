import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Rider {
  name: string;
  age: string;
  ability: string;
}

interface RetreatSignupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const abilityOptions = ["Beginner", "Intermediate", "Experienced"];

const RetreatSignupForm = ({ open, onOpenChange }: RetreatSignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfRiders, setNumberOfRiders] = useState(1);
  const [riders, setRiders] = useState<Rider[]>([{ name: "", age: "", ability: "" }]);
  const [interestNote, setInterestNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateRiderCount = (count: number) => {
    setNumberOfRiders(count);
    setRiders((prev) => {
      if (count > prev.length) {
        return [...prev, ...Array.from({ length: count - prev.length }, () => ({ name: "", age: "", ability: "" }))];
      }
      return prev.slice(0, count);
    });
  };

  const updateRider = (index: number, field: keyof Rider, value: string) => {
    setRiders((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2 || !email.includes("@") || phone.trim().length < 6) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const incompleteRiders = riders.some((r) => !r.name.trim() || !r.age.trim() || !r.ability);
    if (incompleteRiders) {
      toast.error("Please complete details for all riders.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("retreat_signups" as any).insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        number_of_riders: numberOfRiders,
        riders: riders as any,
        interest_note: interestNote.trim() || null,
      } as any);

      if (error) throw error;
      setSubmitted(true);
      toast.success("Your retreat application has been received!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    if (submitted) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setNumberOfRiders(1);
        setRiders([{ name: "", age: "", ability: "" }]);
        setInterestNote("");
        setSubmitted(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Reserve Your Spot</DialogTitle>
          <DialogDescription>
            Founders Riding Retreat · July 2–5 · €1,500 per person (€450 deposit)
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-xl font-light text-foreground">Thank you!</p>
            <p className="text-muted-foreground">
              We've received your application. We'll be in touch within 48 hours
              with next steps and deposit details.
            </p>
            <Button variant="outline" onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact Info */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="signup-name">Your Name *</Label>
                <Input id="signup-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required maxLength={100} />
              </div>
              <div>
                <Label htmlFor="signup-email">Email *</Label>
                <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required maxLength={255} />
              </div>
              <div>
                <Label htmlFor="signup-phone">Phone Number *</Label>
                <Input id="signup-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+34 600 000 000" required maxLength={20} />
              </div>
            </div>

            {/* Number of Riders */}
            <div>
              <Label>Number of Riders *</Label>
              <Select value={String(numberOfRiders)} onValueChange={(v) => updateRiderCount(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "rider" : "riders"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rider Details */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Rider Details *</Label>
              {riders.map((rider, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 p-3 rounded-md bg-muted/50">
                  <div className="col-span-3 text-xs text-muted-foreground font-medium">
                    Rider {i + 1}
                  </div>
                  <Input
                    placeholder="Name"
                    value={rider.name}
                    onChange={(e) => updateRider(i, "name", e.target.value)}
                    required
                    maxLength={100}
                  />
                  <Input
                    placeholder="Age"
                    type="number"
                    min={5}
                    max={99}
                    value={rider.age}
                    onChange={(e) => updateRider(i, "age", e.target.value)}
                    required
                  />
                  <Select value={rider.ability} onValueChange={(v) => updateRider(i, "ability", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ability" />
                    </SelectTrigger>
                    <SelectContent>
                      {abilityOptions.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            {/* Interest Note */}
            <div>
              <Label htmlFor="interest-note">Why are you interested in this retreat?</Label>
              <Textarea
                id="interest-note"
                value={interestNote}
                onChange={(e) => setInterestNote(e.target.value)}
                placeholder="Tell us a little about yourself and what draws you to this experience..."
                rows={3}
                maxLength={1000}
              />
            </div>

            <Button type="submit" variant="steward" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center italic">
              This is an expression of interest. We'll confirm availability and
              share deposit details by email.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RetreatSignupForm;
