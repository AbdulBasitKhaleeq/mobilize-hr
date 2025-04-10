import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import PublicLayout from "../layouts/public-layout"

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    description: "We are looking for an experienced Frontend Developer to join our team...",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "1 week ago",
    tags: ["Product Strategy", "Agile", "User Research"],
    description: "Join our product team to lead the development of innovative solutions...",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    salary: "$80 - $100/hr",
    posted: "3 days ago",
    tags: ["Figma", "User Testing", "Design Systems"],
    description: "We need a talented designer to create beautiful and functional interfaces...",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    posted: "5 days ago",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    description: "Help us build and maintain our cloud infrastructure and deployment pipelines...",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $155,000",
    posted: "1 day ago",
    tags: ["Python", "Machine Learning", "SQL"],
    description: "Join our data science team to extract insights from complex datasets...",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "GrowthMarketing",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$60,000 - $75,000",
    posted: "1 week ago",
    tags: ["Digital Marketing", "SEO", "Content Strategy"],
    description: "Help us grow our online presence and generate leads through marketing campaigns...",
  },
]

export default function JobsPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Open Positions</h1>

          <div className="bg-muted/30 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="text-sm font-medium mb-1 block">
                  Search
                </label>
                <Input id="search" placeholder="Job title, skills, or keywords" className="w-full" />
              </div>
              <div>
                <label htmlFor="location" className="text-sm font-medium mb-1 block">
                  Location
                </label>
                <Input id="location" placeholder="City, state, or remote" className="w-full" />
              </div>
              <div>
                <label htmlFor="job-type" className="text-sm font-medium mb-1 block">
                  Job Type
                </label>
                <Select>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>Search Jobs</Button>
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <Link href={`/jobs/${job.id}`}>
                        <h2 className="text-xl font-semibold hover:text-primary transition-colors">{job.title}</h2>
                      </Link>
                      <div className="text-muted-foreground mt-1">
                        {job.company} • {job.location}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                    </div>
                    <div className="md:text-right">
                      <div className="text-sm font-medium">{job.type}</div>
                      <div className="text-sm text-muted-foreground mt-1">{job.salary}</div>
                      <div className="text-xs text-muted-foreground mt-1">Posted {job.posted}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 px-6 py-3 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    AI Match Score: <span className="font-medium text-primary">92%</span>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
