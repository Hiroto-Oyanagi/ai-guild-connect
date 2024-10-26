import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/integrations/supabase/client'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function AuthPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const userType = searchParams.get('type') || 'programmer'

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        try {
          // ユーザータイプをプロフィールテーブルに保存
          const { error } = await supabase
            .from('profiles')
            .upsert({ 
              id: session.user.id,
              user_type: userType,
              created_at: new Date().toISOString()
            })

          if (error) throw error

          // ユーザータイプに基づいて適切な画面に遷移
          if (userType === 'company') {
            navigate('/company-dashboard')
          } else {
            navigate('/home')
          }
        } catch (error) {
          console.error('Error saving user type:', error)
          navigate('/home') // エラーの場合はデフォルトでhomeに遷移
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
          <h1 className="text-2xl font-bold text-center mb-8 text-[#120166]">
            {userType === 'company' ? '企業として参加' : 'プログラマーとして参加'}
          </h1>
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
          />
        </div>
      </div>
    </div>
  )
}