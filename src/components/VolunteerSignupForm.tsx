import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for your interest in volunteering. Your application is pending review by our team.',
      });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
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
  );
};