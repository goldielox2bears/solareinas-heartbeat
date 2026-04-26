import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, Clock, Users, Heart, Brain, ShoppingCart, Github, ExternalLink } from 'lucide-react';

// Paste your GitHub repo URL here once connected via Lovable → Connectors → GitHub
const GITHUB_REPO_URL = '';

type VolunteerApplication = {
  id: string;
  full_name: string;
  application_type: string;
  volunteer_interests: string[];
  hours_per_week: number;
  available_from: string;
  available_to: string;
  approval_status: string;
  created_at: string;
  date_joined: string;
};

type Sponsorship = {
  id: string;
  sponsor_name: string;
  sponsor_email: string;
  animal_id: string;
  amount_cents: number;
  sponsorship_type: string;
  status: string;
  admin_verified: boolean;
  created_at: string;
  special_requests: string | null;
  animals?: {
    name: string;
    species: string;
  };
};

type MarketOrder = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  notes: string | null;
  items: { name: string; qty: number; price: number }[];
  total_eur: string;
  status: string;
  created_at: string;
};

const AdminPanel = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sponsorshipFilter, setSponsorshipFilter] = useState<string>('pending');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Fetch volunteer applications
  const { data: applications, isLoading } = useQuery({
    queryKey: ['volunteer-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('volunteer_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as VolunteerApplication[];
    },
    enabled: isAdmin,
  });

  // Fetch sponsorships
  const { data: sponsorships, isLoading: sponsorshipsLoading } = useQuery({
    queryKey: ['admin-sponsorships'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sponsorships')
        .select(`
          *,
          animals (
            name,
            species
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Sponsorship[];
    },
    enabled: isAdmin,
  });

  // Fetch quiz completions
  const { data: quizCompletions, isLoading: quizLoading } = useQuery({
    queryKey: ['admin-quiz-completions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_completions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data as { id: string; primary_result: string; secondary_result: string; is_blended: boolean; answers: Record<string, number>; created_at: string }[];
    },
    enabled: isAdmin,
  });

  // Fetch market orders
  const { data: marketOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-market-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('market_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as MarketOrder[];
    },
    enabled: isAdmin,
  });

  // Update market order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('market_orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-market-orders'] });
      toast({ title: 'Success', description: 'Order status updated' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update order status', variant: 'destructive' });
    },
  });

  // Update volunteer application status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('volunteer_applications')
        .update({ approval_status: status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteer-applications'] });
      toast({
        title: 'Success',
        description: 'Application status updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive',
      });
      console.error('Error updating status:', error);
    },
  });

  // Verify sponsorship mutation
  const verifySponsorshipMutation = useMutation({
    mutationFn: async ({ id, verified }: { id: string; verified: boolean }) => {
      const { error } = await supabase
        .from('sponsorships')
        .update({ 
          admin_verified: verified,
          verified_at: verified ? new Date().toISOString() : null,
          verified_by: verified ? user?.id : null,
          status: verified ? 'active' : 'rejected'
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-sponsorships'] });
      toast({
        title: 'Success',
        description: variables.verified 
          ? 'Sponsorship verified successfully' 
          : 'Sponsorship rejected',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update sponsorship',
        variant: 'destructive',
      });
      console.error('Error updating sponsorship:', error);
    },
  });

  // Redirect if not admin
  if (adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  // Filter applications
  const filteredApplications = applications?.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.approval_status === statusFilter;
  });

  // Filter sponsorships
  const filteredSponsorships = sponsorships?.filter((s) => {
    if (sponsorshipFilter === 'pending') return !s.admin_verified && s.status !== 'rejected';
    if (sponsorshipFilter === 'verified') return s.admin_verified;
    if (sponsorshipFilter === 'rejected') return s.status === 'rejected';
    return true;
  });

  // Get status counts
  const statusCounts = {
    all: applications?.length || 0,
    pending: applications?.filter((a) => a.approval_status === 'pending').length || 0,
    approved: applications?.filter((a) => a.approval_status === 'approved').length || 0,
    rejected: applications?.filter((a) => a.approval_status === 'rejected').length || 0,
  };

  // Get sponsorship counts
  const sponsorshipCounts = {
    pending: sponsorships?.filter((s) => !s.admin_verified && s.status !== 'rejected').length || 0,
    verified: sponsorships?.filter((s) => s.admin_verified).length || 0,
    rejected: sponsorships?.filter((s) => s.status === 'rejected').length || 0,
  };

  // Filter market orders
  const filteredOrders = marketOrders?.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  // Get order counts
  const orderCounts = {
    all: marketOrders?.length || 0,
    pending: marketOrders?.filter((o) => o.status === 'pending').length || 0,
    fulfilled: marketOrders?.filter((o) => o.status === 'fulfilled').length || 0,
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
      pending: { variant: 'outline', icon: <Clock className="h-3 w-3 mr-1" /> },
      approved: { variant: 'default', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      rejected: { variant: 'destructive', icon: <XCircle className="h-3 w-3 mr-1" /> },
    };

    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className="flex items-center w-fit">
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getVerificationBadge = (verified: boolean, status: string) => {
    if (status === 'rejected') {
      return (
        <Badge variant="destructive" className="flex items-center w-fit">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    }
    if (verified) {
      return (
        <Badge variant="default" className="flex items-center w-fit">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="flex items-center w-fit">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const formatCurrency = (cents: number) => {
    return `€${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">Manage volunteers and sponsorships</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="volunteers" className="space-y-6">
           <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Volunteers
              {statusCounts.pending > 0 && (
                <Badge variant="secondary" className="ml-1">{statusCounts.pending}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sponsorships" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Sponsorships
              {sponsorshipCounts.pending > 0 && (
                <Badge variant="secondary" className="ml-1">{sponsorshipCounts.pending}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Quiz
              {quizCompletions && (
                <Badge variant="secondary" className="ml-1">{quizCompletions.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
              {orderCounts.pending > 0 && (
                <Badge variant="secondary" className="ml-1">{orderCounts.pending}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Applications</CardDescription>
                  <CardTitle className="text-3xl">{statusCounts.all}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending Review</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{statusCounts.pending}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Approved</CardDescription>
                  <CardTitle className="text-3xl text-green-600">{statusCounts.approved}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rejected</CardDescription>
                  <CardTitle className="text-3xl text-red-600">{statusCounts.rejected}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Applications Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Volunteer Applications</CardTitle>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredApplications?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No applications found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Interests</TableHead>
                          <TableHead>Hours/Week</TableHead>
                          <TableHead>Availability</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications?.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.full_name}</TableCell>
                            <TableCell className="capitalize">{app.application_type}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {app.volunteer_interests.slice(0, 2).map((interest, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {interest}
                                  </Badge>
                                ))}
                                {app.volunteer_interests.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{app.volunteer_interests.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{app.hours_per_week}</TableCell>
                            <TableCell className="text-sm">
                              {new Date(app.available_from).toLocaleDateString()} -{' '}
                              {new Date(app.available_to).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{getStatusBadge(app.approval_status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {app.approval_status !== 'approved' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateStatusMutation.mutate({
                                        id: app.id,
                                        status: 'approved',
                                      })
                                    }
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
                                {app.approval_status !== 'rejected' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      updateStatusMutation.mutate({
                                        id: app.id,
                                        status: 'rejected',
                                      })
                                    }
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sponsorships Tab */}
          <TabsContent value="sponsorships" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending Verification</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{sponsorshipCounts.pending}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Verified</CardDescription>
                  <CardTitle className="text-3xl text-green-600">{sponsorshipCounts.verified}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rejected</CardDescription>
                  <CardTitle className="text-3xl text-red-600">{sponsorshipCounts.rejected}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Sponsorships Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sponsorship Requests</CardTitle>
                  <Select value={sponsorshipFilter} onValueChange={setSponsorshipFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {sponsorshipsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredSponsorships?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No sponsorships found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sponsor</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Animal</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Special Requests</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSponsorships?.map((sponsorship) => (
                          <TableRow key={sponsorship.id}>
                            <TableCell className="font-medium">{sponsorship.sponsor_name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {sponsorship.sponsor_email}
                            </TableCell>
                            <TableCell>
                              <div>
                                <span className="font-medium">{sponsorship.animals?.name}</span>
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({sponsorship.animals?.species})
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(sponsorship.amount_cents)}
                            </TableCell>
                            <TableCell className="capitalize">{sponsorship.sponsorship_type}</TableCell>
                            <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                              {sponsorship.special_requests || '—'}
                            </TableCell>
                            <TableCell>
                              {getVerificationBadge(sponsorship.admin_verified, sponsorship.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {!sponsorship.admin_verified && sponsorship.status !== 'rejected' && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                      onClick={() =>
                                        verifySponsorshipMutation.mutate({
                                          id: sponsorship.id,
                                          verified: true,
                                        })
                                      }
                                      disabled={verifySponsorshipMutation.isPending}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                      onClick={() =>
                                        verifySponsorshipMutation.mutate({
                                          id: sponsorship.id,
                                          verified: false,
                                        })
                                      }
                                      disabled={verifySponsorshipMutation.isPending}
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                {sponsorship.admin_verified && (
                                  <span className="text-xs text-muted-foreground">Verified</span>
                                )}
                                {sponsorship.status === 'rejected' && (
                                  <span className="text-xs text-muted-foreground">Rejected</span>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Completions Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Completions</CardDescription>
                  <CardTitle className="text-3xl">{quizCompletions?.length || 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Blended Results</CardDescription>
                  <CardTitle className="text-3xl">{quizCompletions?.filter(q => q.is_blended).length || 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Most Common Result</CardDescription>
                  <CardTitle className="text-xl capitalize">
                    {(() => {
                      if (!quizCompletions?.length) return '—';
                      const counts: Record<string, number> = {};
                      quizCompletions.forEach(q => { counts[q.primary_result] = (counts[q.primary_result] || 0) + 1; });
                      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]?.replace(/-/g, ' ') || '—';
                    })()}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Quiz Completions</CardTitle>
                <CardDescription>Anonymous quiz results from visitors</CardDescription>
              </CardHeader>
              <CardContent>
                {quizLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : !quizCompletions?.length ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No quiz completions yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Primary Result</TableHead>
                          <TableHead>Secondary Result</TableHead>
                          <TableHead>Blended</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quizCompletions.map((completion) => (
                          <TableRow key={completion.id}>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(completion.created_at).toLocaleDateString()} {new Date(completion.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </TableCell>
                            <TableCell className="font-medium capitalize">{completion.primary_result.replace(/-/g, ' ')}</TableCell>
                            <TableCell className="capitalize">{completion.secondary_result.replace(/-/g, ' ')}</TableCell>
                            <TableCell>
                              {completion.is_blended ? (
                                <Badge variant="secondary">Blended</Badge>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Orders</CardDescription>
                  <CardTitle className="text-3xl">{orderCounts.all}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{orderCounts.pending}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Fulfilled</CardDescription>
                  <CardTitle className="text-3xl text-green-600">{orderCounts.fulfilled}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Market Orders</CardTitle>
                  <Select value={orderFilter} onValueChange={setOrderFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredOrders?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No orders found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders?.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="font-medium">
                              {order.customer_name}
                              {order.customer_phone && (
                                <span className="block text-xs text-muted-foreground">{order.customer_phone}</span>
                              )}
                            </TableCell>
                            <TableCell className="text-sm">
                              <a href={`mailto:${order.customer_email}`} className="text-primary hover:underline">
                                {order.customer_email}
                              </a>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="text-sm">
                                    {item.name} ×{item.qty}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">€{order.total_eur}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              {order.status === 'pending' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateOrderStatusMutation.mutate({ id: order.id, status: 'fulfilled' })}
                                  disabled={updateOrderStatusMutation.isPending}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Fulfill
                                </Button>
                              )}
                              {order.status === 'fulfilled' && (
                                <span className="text-xs text-muted-foreground">Fulfilled</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {filteredOrders?.some(o => o.notes) && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Order Notes</h4>
                    {filteredOrders?.filter(o => o.notes).map(o => (
                      <div key={o.id} className="text-sm border rounded p-2">
                        <span className="font-medium">{o.customer_name}:</span> {o.notes}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
