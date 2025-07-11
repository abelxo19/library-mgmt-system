'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, Calendar, Clock, BarChart3 } from 'lucide-react'

export default function Dashboard() {
  const features = [
    {
      title: 'Books',
      description: 'Manage library books and catalog',
      icon: BookOpen,
      href: '/books',
      color: 'text-blue-600',
    },
    {
      title: 'Members',
      description: 'Manage library members',
      icon: Users,
      href: '/members',
      color: 'text-green-600',
    },
    {
      title: 'Loans',
      description: 'Track book loans and returns',
      icon: Calendar,
      href: '/loans',
      color: 'text-purple-600',
    },
    {
      title: 'Reservations',
      description: 'Manage book reservations',
      icon: Clock,
      href: '/reservations',
      color: 'text-orange-600',
    },
    {
      title: 'Reports',
      description: 'View library reports',
      icon: BarChart3,
      href: '/reports/loans',
      color: 'text-red-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Library Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your library management system
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <motion.div key={feature.href} variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <Card className="hover:shadow-lg transition-shadow">
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
                    <Link href={feature.href}>View {feature.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
