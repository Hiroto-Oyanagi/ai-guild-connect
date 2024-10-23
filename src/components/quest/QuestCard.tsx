import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { LucideIcon, ChevronDown, Users, Search } from "lucide-react"
import { useState } from "react"

interface QuestCardProps {
  title: string
  description: string
  reward: string
  difficulty: string
  details: string
  icon: React.ReactNode
}

export function QuestCard({ title, description, reward, difficulty, details, icon }: QuestCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all bg-[#2A0374] bg-opacity-50 border-[#4A0E82] shadow-md transform hover:-translate-y-1 hover:rotate-1 rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle className="text-lg text-[#B8A2FF]">{title}</CardTitle>
          </div>
          <Badge variant={difficulty === "簡単" ? "secondary" : difficulty === "普通" ? "default" : "destructive"} className="bg-[#4A0E82] text-white">
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-20'} overflow-hidden`}>
            <p className="mb-2 text-sm text-[#D8CCFF]">{description}</p>
            {isExpanded && (
              <ScrollArea className="h-64 w-full rounded-md border border-[#4A0E82] p-4 bg-[#2A0374] bg-opacity-50">
                <p className="text-sm text-[#D8CCFF] whitespace-pre-line">{details}</p>
              </ScrollArea>
            )}
          </div>
          <Button 
            variant="ghost" 
            className="w-full text-[#B8A2FF] hover:text-[#D8CCFF]"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? '閉じる' : 'もっと見る'}
          </Button>
          <p className="font-semibold text-sm text-[#B8A2FF]">報酬: {reward}</p>
          <div className="flex gap-2 justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white">
                  <Search className="mr-2 h-4 w-4" />
                  詳細を見る
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#120166] text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2 text-[#a29dff]">
                    {icon}
                    <span>{title}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-[#d4d0ff]">難易度:</h4>
                  <Badge variant={difficulty === "簡単" ? "secondary" : difficulty === "普通" ? "default" : "destructive"} className="bg-[#4A0E82] text-white">
                    {difficulty}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-[#d4d0ff]">報酬:</h4>
                  <p className="text-[#a29dff]">{reward}</p>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-[#d4d0ff]">詳細:</h4>
                  <ScrollArea className="h-[200px] w-full rounded-md border border-[#4A0E82] p-4 bg-[#2A0374]">
                    <p className="whitespace-pre-line text-[#d4d0ff]">{details}</p>
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white">
              <Users className="mr-2 h-4 w-4" />
              パーティーを探す
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}