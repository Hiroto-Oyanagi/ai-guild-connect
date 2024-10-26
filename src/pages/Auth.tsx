import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/integrations/supabase/client'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export default function AuthPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const userType = searchParams.get('type') || 'programmer'
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage(userType === 'programmer' 
      ? 'プログラマーとしてログインしてください' 
      : '企業としてログインしてください')

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ user_type: userType })
            .eq('id', session.user.id)

          if (error) throw error

          toast({
            title: "ログイン成功",
            description: userType === 'programmer' 
              ? "プログラマーとしてログインしました" 
              : "企業としてログインしました",
          })

          navigate(userType === 'programmer' ? '/home' : '/company-dashboard')
        } catch (error) {
          console.error('Error updating profile:', error)
          toast({
            title: "エラー",
            description: "プロフィールの更新中にエラーが発生しました",
            variant: "destructive",
          })
        }
      }
    })
  }, [navigate, userType])

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
          <h1 className="text-2xl font-bold text-center mb-2 text-[#120166]">AIギルドへようこそ</h1>
          <p className="text-center mb-8 text-gray-600">{message}</p>
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
            redirectTo={`${window.location.origin}${userType === 'programmer' ? '/home' : '/company-dashboard'}`}
          />
        </div>
      </div>
    </div>
  )
}