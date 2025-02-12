import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubmissionSchema } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertSubmissionSchema),
    defaultValues: {
      artistName: "",
      songName: "",
      quote: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast({
        title: "Success!",
        description: "Your submission has been sent for review.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-box">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Submit an Artist</h2>
          <p className="mt-2 text-white/80">
            Suggest a new artist and song to be featured
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="artistName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Artist Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="songName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Song Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Favorite Quote/Lyric</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
