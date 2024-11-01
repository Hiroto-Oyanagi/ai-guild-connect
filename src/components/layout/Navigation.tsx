import { Button } from "@/components/ui/button"
import { Scroll, User } from "lucide-react"

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

const NavButton = ({ icon, label, onClick }: NavButtonProps) => {
  return (
    <Button variant="ghost" className="flex flex-col items-center p-2 text-[#d4d0ff] hover:text-[#a29dff]" onClick={onClick}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Button>
  )
}

interface NavigationProps {
  onQuestClick: () => void
  onProfileClick: () => void
}

export const Navigation = ({ onQuestClick, onProfileClick }: NavigationProps) => {
  return (
    <nav className="sticky bottom-0 bg-[#120166] bg-opacity-80 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          <NavButton icon={<Scroll className="h-6 w-6" />} label="クエスト" onClick={onQuestClick} />
          <NavButton icon={<User className="h-6 w-6" />} label="プロフィール" onClick={onProfileClick} />
        </div>
      </div>
    </nav>
  )
}