import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
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
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';

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

const AdminPanel = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  // Update application status mutation
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

  // Get status counts
  const statusCounts = {
    all: applications?.length || 0,
    pending: applications?.filter((a) => a.approval_status === 'pending').length || 0,
    approved: applications?.filter((a) => a.approval_status === 'approved').length || 0,
    rejected: applications?.filter((a) => a.approval_status === 'rejected').length || 0,
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">Manage volunteer applications</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
      </div>
    </div>
  );
};

export default AdminPanel;
