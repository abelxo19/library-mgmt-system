import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, Calendar, Clock, BarChart3 } from 'lucide-react'

export default function Dashboard() {
  const features = [
    {
      title: 'Books',
      description: 'Manage library books and catalog',
      icon: BookOpen,
      href: '/books',
      color: 'text-blue-600'
    },
    {
      title: 'Members',
      description: 'Manage library members',
      icon: Users,
      href: '/members',
      color: 'text-green-600'
    },
    {
      title: 'Loans',
      description: 'Track book loans and returns',
      icon: Calendar,
      href: '/loans',
      color: 'text-purple-600'
    },
    {
      title: 'Reservations',
      description: 'Manage book reservations',
      icon: Clock,
      href: '/reservations',
      color: 'text-orange-600'
    },
    {
      title: 'Reports',
      description: 'View library reports',
      icon: BarChart3,
      href: '/reports/loans',
      color: 'text-red-600'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Library Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your library management system
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.href} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {feature.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${feature.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <Button asChild size="sm" className="w-full">
                  <Link href={feature.href}>
                    View {feature.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
