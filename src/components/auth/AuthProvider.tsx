import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

// 認証コンテキストの型定義
interface AuthContextType {
  session: Session | null      // ユーザーセッション情報
  loading: boolean            // 読み込み状態
  userRole: string | null     // ユーザーロール（programmer または company）
}

// 認証コンテキストの初期値を設定
const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  userRole: null,
})

// 認証プロバイダーコンポーネント
// このコンポーネントで認証状態を管理し、子コンポーネントに提供します
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 状態管理用のステート
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // プロフィールテーブルからユーザーロールを取得する関数
    async function getProfile(userId: string) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .maybeSingle()

        if (error) {
          console.error('Error fetching user role:', error)
          return null
        }

        return data?.role || null
      } catch (error) {
        console.error('Error in getProfile:', error)
        return null
      }
    }

    // 初回レンダリング時にセッション情報を取得
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        // セッションが存在する場合、ユーザーロールを取得
        const role = await getProfile(session.user.id)
        setUserRole(role)
      }
      setLoading(false)
    })

    // 認証状態の変更を監視するリスナーを設定
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session?.user) {
        // 認証状態が変更された場合、ユーザーロールを再取得
        const role = await getProfile(session.user.id)
        setUserRole(role)
      }
      setLoading(false)
    })

    // コンポーネントのアンマウント時にリスナーを解除
    return () => subscription.unsubscribe()
  }, [])

  // コンテキストプロバイダーを通じて認証状態を提供
  return (
    <AuthContext.Provider value={{ session, loading, userRole }}>
      {children}
    </AuthContext.Provider>
  )
}

// 認証状態を使用するためのカスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}