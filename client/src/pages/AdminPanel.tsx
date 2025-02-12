import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch submissions');
      return response.json();
    },
    enabled: isAuthenticated
  });

  const handleAction = useMutation({
    mutationFn: async ({ id, action, audioFile }: { id: number; action: 'approve' | 'reject'; audioFile?: File }) => {
      if (action === 'approve' && !audioFile) {
        throw new Error('Audio file is required for approval');
      }

      const formData = new FormData();
      if (audioFile) {
        formData.append('audio', audioFile);
      }

      const response = await fetch(`/api/admin/submissions/${id}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`Failed to ${action} submission`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      toast({
        title: "Success",
        description: "Submission updated successfully",
      });
      setSelectedSubmissionId(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleApprove = async (id: number) => {
    if (!audioFileRef.current?.files?.[0]) {
      toast({
        title: "Error",
        description: "Please select an audio file",
        variant: "destructive",
      });
      return;
    }

    await handleAction.mutate({
      id,
      action: 'approve',
      audioFile: audioFileRef.current.files[0]
    });
  };

  const handleLogin = () => {
    if (password === 'deadforever') {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onBack();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-box">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          </div>
          <div className="mt-8 space-y-6">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-white/10 text-white"
            />
            <div className="flex gap-2">
              <Button onClick={handleLogin} className="flex-1">
                Login
              </Button>
              <Button onClick={onBack} variant="outline" className="flex-1">
                Back to Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-black/60">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Submissions</h1>
          <div className="flex gap-2">
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-black/40 rounded-lg p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Artist</TableHead>
                <TableHead className="text-white">Song</TableHead>
                <TableHead className="text-white">Quote</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions?.map((submission: any) => (
                <TableRow key={submission.id}>
                  <TableCell className="text-white">{submission.artistName}</TableCell>
                  <TableCell className="text-white">{submission.songName}</TableCell>
                  <TableCell className="text-white">{submission.quote}</TableCell>
                  <TableCell className="text-white">{submission.status}</TableCell>
                  <TableCell className="space-x-2">
                    {submission.status === 'pending' && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="default"
                            >
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload Audio File</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                ref={audioFileRef}
                                type="file"
                                accept="audio/*"
                                className="bg-white/10 text-white"
                              />
                              <Button
                                onClick={() => handleApprove(submission.id)}
                                disabled={handleAction.isPending}
                              >
                                {handleAction.isPending ? "Processing..." : "Confirm Approval"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          onClick={() => handleAction.mutate({ id: submission.id, action: 'reject' })}
                          size="sm"
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}