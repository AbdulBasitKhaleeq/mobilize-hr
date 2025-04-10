import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import PublicLayout from "../../../layouts/public-layout"

export default function ApplicationSuccessPage({ params }: { params: { id: string } }) {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-green-200">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Application Submitted!</CardTitle>
              <CardDescription>Thank you for applying</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>
                Your application has been successfully submitted. We'll review your application and get back to you
                soon.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Application Reference: <span className="font-medium">APP-{Date.now().toString().slice(-8)}</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                You should receive a confirmation email shortly with more details about the application process.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Link href="/jobs" className="w-full">
                <Button className="w-full">Browse More Jobs</Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
