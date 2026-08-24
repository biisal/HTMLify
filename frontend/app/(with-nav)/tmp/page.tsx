"use client";

import { TmpForm } from "@/components/tmp/tmp-form";
import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TmpPage = () => {
  return (
    <PageShell
      title="Temporary File Links"
      description="Upload files and generate secure, self-destructing links with custom expiry."
      titleClassName="text-left"
    >
      <Card className="border-border/50 shadow-xl bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Generate Link</CardTitle>
          <CardDescription>
            Your files will be automatically deleted after the specified time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TmpForm />
        </CardContent>
      </Card>
    </PageShell>
  );
};

export default TmpPage;
