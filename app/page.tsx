import Link from "next/link"
import { Button } from "@/components/ui/button"
import PublicLayout from "./layouts/public-layout"

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your <span className="text-primary">Perfect Role</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            MobilizeHR helps connect talented professionals with innovative companies using AI-powered matching.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link href="/jobs">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Open Positions
              </Button>
            </Link>
            <Link href="/employers">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                For Employers
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { number: "500+", label: "Companies" },
              { number: "10,000+", label: "Jobs Posted" },
              { number: "25,000+", label: "Candidates" },
              { number: "95%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Job Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Technology", count: 120, icon: "💻" },
              { title: "Marketing", count: 64, icon: "📊" },
              { title: "Design", count: 43, icon: "🎨" },
              { title: "Sales", count: 92, icon: "📈" },
              { title: "Customer Support", count: 35, icon: "🤝" },
              { title: "Finance", count: 51, icon: "💰" },
            ].map((category, index) => (
              <Link
                href={`/jobs?category=${category.title.toLowerCase()}`}
                key={index}
                className="group block p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {category.count} jobs
                  </span>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <p className="text-muted-foreground mb-12">
              Our AI-powered platform makes the hiring process seamless for both candidates and employers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Create Your Profile",
                description: "Upload your resume and let our AI analyze your skills and experience.",
                step: "01",
              },
              {
                title: "Get Matched",
                description: "Our intelligent system matches you with jobs that fit your profile.",
                step: "02",
              },
              {
                title: "Apply with Ease",
                description: "Apply to positions with a single click and track your applications.",
                step: "03",
              },
            ].map((item, index) => (
              <div key={index} className="relative p-6 bg-background rounded-lg border">
                <div className="absolute -top-4 left-6 bg-primary text-primary-foreground text-sm font-bold py-1 px-3 rounded">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
