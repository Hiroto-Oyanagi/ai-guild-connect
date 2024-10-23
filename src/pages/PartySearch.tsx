import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function PartySearch() {
  const { questId } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()

  // この部分は後でAPIから取得するデータに置き換えることができます
  const recommendedUsers = [
    {
      id: "1",
      name: "鈴木 一郎",
      image: "/avatars/user1.png",
      skills: ["Python", "機械学習", "自然言語処理"],
      introduction: "機械学習エンジニアとして3年の経験があります。"
    },
    {
      id: "2",
      name: "佐藤 花子",
      image: "/avatars/user2.png",
      skills: ["データ分析", "統計学", "R言語"],
      introduction: "データサイエンティストとして活動しています。"
    }
  ]

  const handleInvite = (userId: string) => {
    toast({
      title: "招待を送信しました",
      description: "ユーザーに招待通知が送られました。"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120166] to-[#4A0E82] p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 text-white hover:text-[#a29dff]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <h2 className="text-2xl font-bold mb-6 text-[#a29dff]">推奨パーティーメンバー</h2>
        
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedUsers.map((user) => (
              <Card 
                key={user.id}
                className="bg-[#2A0374] bg-opacity-30 border-[#4A0E82]"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-[#a29dff]">{user.name}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#d4d0ff] mb-4">{user.introduction}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.skills.map((skill, index) => (
                      <Badge 
                        key={index}
                        className="bg-[#4A0E82] bg-opacity-50 text-white border border-[#a29dff]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleInvite(user.id)}
                    className="w-full bg-[#4A0E82] hover:bg-[#5A1E92] text-white"
                  >
                    パーティーに招待する
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}