import { Button } from "@/components/ui/button"
import { Menu, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Header = () => {
  const navigate = useNavigate()

  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

  return (
    <header className="sticky top-0 z-10 bg-[#120166] bg-opacity-80 p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          className="text-white hover:text-[#a29dff]"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページへ
        </Button>
        <h1 className="text-2xl font-bold font-serif">AIギルド</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">メニュー</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#2A0374] border-[#4A0E82] text-white">
          <DropdownMenuItem 
            className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
            onClick={() => handleMenuItemClick('/home')}
          >
            <Scroll className="mr-2 h-4 w-4" />
            <span>クエスト</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
            onClick={() => setActiveTab('profile')}
          >
            <User className="mr-2 h-4 w-4" />
            <span>プロフィール</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
            onClick={() => handleMenuItemClick('/accepted-jobs')}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            <span>引き受けた仕事</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
            onClick={() => handleMenuItemClick('/party-requests')}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>パーティーの依頼</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
            onClick={() => handleMenuItemClick('/messages')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>メッセージ</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}