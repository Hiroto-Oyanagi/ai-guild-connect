import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export function Header() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: "ログアウトしました",
        description: "ご利用ありがとうございました",
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "もう一度お試しください",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-[#120166] bg-opacity-80 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-serif text-white">AIギルド</h1>
        <Button 
          variant="ghost" 
          className="text-white hover:text-[#a29dff]"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          ログアウト
        </Button>
      </div>
    </header>
  )
}