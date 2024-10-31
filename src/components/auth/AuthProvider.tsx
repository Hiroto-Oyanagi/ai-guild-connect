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
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // プロフィールテーブルからユーザーロールを取得する関数
    async function getProfile(userId: string) {
      try {
        // レスポンスを一度変数に格納して処理
        const response = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .maybeSingle()

        if (response.error) {
          console.error('Error fetching user role:', response.error)
          return null
        }

        // レスポンスデータから必要な情報のみを抽出
        return response.data?.role || null
      } catch (error) {
        console.error('Error in getProfile:', error)
        return null
      }
    }

    // 初回レンダリング時にセッション情報を取得
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const role = await getProfile(session.user.id)
        setUserRole(role)
      }
      setSession(session)
      setLoading(false)
    })

    // 認証状態の変更を監視するリスナーを設定
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        // セッション状態が変更された場合のみ処理を実行
        if (newSession !== session) {
          setSession(newSession)
          
          if (newSession?.user) {
            // ユーザーが存在する場合のみロール取得を実行
            const role = await getProfile(newSession.user.id)
            setUserRole(role)
          } else {
            // セッションが無効な場合はロールをクリア
            setUserRole(null)
          }
        }
        setLoading(false)
      }
    )

    // コンポーネントのアンマウント時にリスナーを解除
    return () => subscription.unsubscribe()
  }, [])

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