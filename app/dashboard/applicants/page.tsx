'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Download, FileText, FileTextIcon, FileIcon } from 'lucide-react';
import { applicantService, type Applicant, type ApplicantStatus } from '@/lib/firebase/db';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/app/layouts/dashboard-layout';

export default function ApplicantsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<ApplicantStatus>('new');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplicants();
  }, [status, searchTerm]);

  const loadApplicants = async () => {
    try {
      setLoading(true);
      const data = await applicantService.getApplicants({
        status,
        searchTerm: searchTerm || undefined,
      });
      setApplicants(data);
    } catch (error) {
      console.error('Error loading applicants:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applicants',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (newStatus: ApplicantStatus) => {
    setStatus(newStatus);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleViewApplicant = (id: string) => {
    router.push(`/dashboard/applicants/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Applicants</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => {}}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search applicants..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={status} onValueChange={(value) => handleStatusChange(value as ApplicantStatus)}>
          <TabsList>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="review">In Review</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="offer">Offer</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value={status}>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : applicants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No applicants found
                      </TableCell>
                    </TableRow>
                  ) : (
                    applicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell className="font-medium">{applicant.name}</TableCell>
                        <TableCell>{applicant.position}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(applicant.status)}>
                            {applicant.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={applicant.matchScore} className="w-[100px]" />
                            <span className="text-sm">{applicant.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {applicant.resume && (
                              <FileText className="h-4 w-4 text-blue-500" title="Resume" />
                            )}
                            {applicant.coverLetter && (
                              <FileTextIcon className="h-4 w-4 text-green-500" title="Cover Letter" />
                            )}
                            {applicant.portfolio && (
                              <FileIcon className="h-4 w-4 text-purple-500" title="Portfolio" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {applicant.appliedDate.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            onClick={() => handleViewApplicant(applicant.id)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function getStatusVariant(status: ApplicantStatus) {
  switch (status) {
    case 'new':
      return 'default';
    case 'review':
      return 'secondary';
    case 'interview':
      return 'warning';
    case 'offer':
      return 'success';
    case 'rejected':
      return 'destructive';
    default:
      return 'default';
  }
}
