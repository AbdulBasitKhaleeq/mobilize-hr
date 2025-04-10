import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PublicLayout from "../../layouts/public-layout"

// Sample job data
const job = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120,000 - $150,000",
  posted: "2 days ago",
  tags: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
  description: `
    <p>TechCorp is looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining web applications using modern JavaScript frameworks.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Develop new user-facing features using React.js</li>
      <li>Build reusable components and front-end libraries for future use</li>
      <li>Translate designs and wireframes into high-quality code</li>
      <li>Optimize components for maximum performance across devices and browsers</li>
      <li>Collaborate with back-end developers and designers</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>3+ years of experience with React.js</li>
      <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
      <li>Experience with TypeScript and modern JavaScript libraries and frameworks</li>
      <li>Familiarity with RESTful APIs and modern authorization mechanisms</li>
      <li>Experience with common front-end development tools such as Babel, Webpack, NPM, etc.</li>
      <li>Good understanding of asynchronous request handling, partial page updates, and AJAX</li>
    </ul>
    
    <h3>Benefits:</h3>
    <ul>
      <li>Competitive salary and equity package</li>
      <li>Health, dental, and vision insurance</li>
      <li>401(k) with company match</li>
      <li>Flexible work hours and remote work options</li>
      <li>Professional development budget</li>
      <li>Paid time off and parental leave</li>
    </ul>
  `,
  companyInfo: {
    name: "TechCorp",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "TechCorp is a leading technology company specializing in innovative software solutions for businesses of all sizes.",
    industry: "Technology",
    founded: 2010,
    employees: "500-1000",
    website: "https://techcorp.example.com",
    headquarters: "San Francisco, CA",
  },
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <Link href="/jobs" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
                ← Back to Jobs
              </Link>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <div className="text-lg text-muted-foreground mt-1">
                {job.company} • {job.location}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/jobs/${job.id}/apply`}>
                <Button size="lg">Apply Now</Button>
              </Link>
              <Button size="lg" variant="outline">
                Save Job
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Details</CardTitle>
                      <CardDescription>Posted {job.posted}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="company">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <img
                        src={job.companyInfo.logo || "/placeholder.svg"}
                        alt={job.companyInfo.name}
                        className="h-16 w-16 rounded-md border p-2"
                      />
                      <div>
                        <CardTitle>{job.companyInfo.name}</CardTitle>
                        <CardDescription>{job.companyInfo.industry}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{job.companyInfo.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Founded</div>
                          <div className="text-muted-foreground">{job.companyInfo.founded}</div>
                        </div>
                        <div>
                          <div className="font-medium">Employees</div>
                          <div className="text-muted-foreground">{job.companyInfo.employees}</div>
                        </div>
                        <div>
                          <div className="font-medium">Website</div>
                          <div className="text-muted-foreground">{job.companyInfo.website}</div>
                        </div>
                        <div>
                          <div className="font-medium">Headquarters</div>
                          <div className="text-muted-foreground">{job.companyInfo.headquarters}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai-insights">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Insights</CardTitle>
                      <CardDescription>Personalized analysis for this position</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Match Score</h3>
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                            92%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Based on your profile, you're a strong match for this position.
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Skill Analysis</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span>React.js</span>
                            <span className="text-green-600 font-medium">Strong Match</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>TypeScript</span>
                            <span className="text-green-600 font-medium">Strong Match</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Redux</span>
                            <span className="text-yellow-600 font-medium">Partial Match</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Suggested Preparation</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Based on the job requirements, consider focusing on these areas:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Review advanced React patterns and hooks</li>
                          <li>Prepare examples of performance optimization techniques</li>
                          <li>Brush up on state management with Redux</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Job Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Job Type</div>
                    <div className="text-muted-foreground">{job.type}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Salary Range</div>
                    <div className="text-muted-foreground">{job.salary}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-muted-foreground">{job.location}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Posted</div>
                    <div className="text-muted-foreground">{job.posted}</div>
                  </div>

                  <div className="pt-4">
                    <Link href={`/jobs/${job.id}/apply`}>
                      <Button className="w-full mb-3">Apply Now</Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      Save Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
