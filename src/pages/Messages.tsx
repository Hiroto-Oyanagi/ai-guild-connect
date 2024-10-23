import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Messages() {
  const navigate = useNavigate()

  // モックデータ
  const messages = [
    {
      id: 1,
      senderName: "山田 太郎",
      senderImage: "/avatars/user1.png",
      message: "プロジェクトの進捗について相談したいことがあります。",
      timestamp: "2024/03/15 14:30"
    },
    {
      id: 2,
      senderName: "佐藤 美咲",
      senderImage: "/avatars/user2.png",
      message: "新しいクエストについて詳しく教えていただけませんか？",
      timestamp: "2024/03/15 12:15"
    }
  ]

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

        <h2 className="text-2xl font-bold mb-6 text-[#a29dff]">メッセージ</h2>
        
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card 
              key={message.id}
              className="bg-[#2A0374] bg-opacity-30 border-[#4A0E82] hover:bg-opacity-50 cursor-pointer transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <Avatar>
                    <AvatarImage src={message.senderImage} alt={message.senderName} />
                    <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-[#a29dff]">{message.senderName}</h3>
                    <p className="text-sm text-[#d4d0ff]">{message.timestamp}</p>
                  </div>
                </div>
                <p className="text-[#d4d0ff] line-clamp-2">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}