import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { useToast } from '@/components/ui/use-toast'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { session, loading, userRole } = useAuth()
  const location = useLocation()
  const { toast } = useToast()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(userRole || '')) {
    toast({
      title: "アクセス権限がありません",
      description: "このページにアクセスする権限がありません。",
      variant: "destructive",
    })
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}