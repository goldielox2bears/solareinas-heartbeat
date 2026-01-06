import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle2, Heart, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import SanctuaryNavigation from '@/components/SanctuaryNavigation';

const volunteerInterests = [
  'Animal Care',
  'Gardening',
  'Construction/Repairs',
  'Cooking/Kitchen Help',
  'Event Support',
  'General Maintenance',
  'Other'
];

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  applicationType: z.enum(['individual', 'family'], {
    required_error: 'Please select if you are applying as an individual or family',
  }),
  volunteerInterests: z.array(z.string()).min(1, 'Please select at least one volunteer interest'),
  dateJoined: z.date(),
  hoursPerWeek: z.number().min(1, 'Please enter at least 1 hour per week').max(168, 'Cannot exceed 168 hours per week'),
  availableFrom: z.date(),
  availableTo: z.date(),
}).refine((data) => {
  const diffTime = Math.abs(data.availableTo.getTime() - data.availableFrom.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 21;
}, {
  message: "Minimum 3 weeks (21 days) commitment required",
  path: ["availableTo"],
});

type FormData = z.infer<typeof formSchema>;

export const VolunteerSignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      applicationType: 'individual',
      volunteerInterests: [],
      dateJoined: new Date(),
      hoursPerWeek: 4,
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from today
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .insert({
          full_name: data.fullName,
          application_type: data.applicationType,
          volunteer_interests: data.volunteerInterests,
          date_joined: format(data.dateJoined, 'yyyy-MM-dd'),
          hours_per_week: data.hoursPerWeek,
          available_from: format(data.availableFrom, 'yyyy-MM-dd'),
          available_to: format(data.availableTo, 'yyyy-MM-dd'),
        });

      if (error) throw error;

      setSubmittedName(data.fullName);
      setIsSubmitted(true);
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Submission Failed',
        description: error.message || 'An error occurred while submitting your application.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success confirmation view
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
        <SanctuaryNavigation />
        <div className="py-12 px-4 pt-24">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
              <CardContent className="pt-12 pb-10 px-8">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                </div>

                {/* Main Message */}
                <h1 className="text-3xl font-bold text-center text-foreground mb-3">
                  Welcome to the Free Herd, {submittedName}!
                </h1>
                <p className="text-center text-muted-foreground text-lg mb-8">
                  Your application has been received and is now pending review.
                </p>

                {/* Timeline Steps */}
                <div className="space-y-6 mb-10">
                  <h2 className="text-xl font-semibold text-center text-foreground mb-4">
                    What Happens Next
                  </h2>
                  
                  <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Review Period: 3-5 Business Days</h3>
                      <p className="text-muted-foreground text-sm">
                        Our stewardship team will review your application and assess the best fit for your interests and availability.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Approval Notification</h3>
                      <p className="text-muted-foreground text-sm">
                        Once approved, you will receive details about orientation, scheduling, and how to prepare for your first day at the sanctuary.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Join the Community</h3>
                      <p className="text-muted-foreground text-sm">
                        As an active volunteer, you will become part of our Free Herd community—helping animals heal and reconnecting families with the land.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="default" size="lg">
                    <Link to="/">Return to Sanctuary</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/sponsor-animal">Become a Steward</Link>
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Questions? Reach out to our team—we are here to help you step into this journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SanctuaryNavigation />
      <div className="py-12 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Join The Free Herd Community</CardTitle>
            <CardDescription className="text-center text-lg">
              Help us create a sanctuary where animals roam free and volunteers make the difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you applying as an Individual or a Family?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="individual" id="individual" />
                            <label htmlFor="individual">Individual</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="family" id="family" />
                            <label htmlFor="family">Family</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="volunteerInterests"
                  render={() => (
                    <FormItem>
                      <FormLabel>Volunteer Interests</FormLabel>
                      <FormDescription>Select all areas you're interested in helping with</FormDescription>
                      <div className="grid grid-cols-2 gap-3">
                        {volunteerInterests.map((interest) => (
                          <FormField
                            key={interest}
                            control={form.control}
                            name="volunteerInterests"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(interest)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, interest])
                                        : field.onChange(field.value?.filter((value) => value !== interest));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{interest}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateJoined"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Joined</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn('p-3 pointer-events-auto')}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hoursPerWeek"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potential Hours Contributed per Week</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="168"
                          placeholder="4"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="availableFrom"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Available From</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn('p-3 pointer-events-auto')}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availableTo"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Available To</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn('p-3 pointer-events-auto')}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>Minimum 3 weeks commitment required</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};