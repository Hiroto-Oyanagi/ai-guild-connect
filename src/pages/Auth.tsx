import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/integrations/supabase/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function AuthPage() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/home')
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120166] to-[#4A0E82] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4 text-white hover:text-[#a29dff]"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-[#120166]">AIギルドへようこそ</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4A0E82',
                    brandAccent: '#120166',
                  }
                }
              }
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/home`}
          />
        </div>
      </div>
    </div>
  )
}