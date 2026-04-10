import DashboardLayout from '@/components/DashboardLayout'

export default function DashboardWrapperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
