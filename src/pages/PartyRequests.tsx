import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PartyRequests() {
  const navigate = useNavigate()

  // モックデータ
  const partyRequests = [
    {
      id: 1,
      requesterName: "田中 花子",
      requesterImage: "/avatars/user1.png",
      questTitle: "大規模AIモデルの開発",
      status: "pending",
      requestedAt: "2024/03/15"
    },
    {
      id: 2,
      requesterName: "鈴木 一郎",
      requesterImage: "/avatars/user2.png",
      questTitle: "データ分析基盤の構築",
      status: "pending",
      requestedAt: "2024/03/14"
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

        <h2 className="text-2xl font-bold mb-6 text-[#a29dff]">パーティーの依頼</h2>
        
        <div className="grid gap-4">
          {partyRequests.map((request) => (
            <Card 
              key={request.id}
              className="bg-[#2A0374] bg-opacity-30 border-[#4A0E82]"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={request.requesterImage} alt={request.requesterName} />
                    <AvatarFallback>{request.requesterName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-[#a29dff]">{request.requesterName}</h3>
                    <p className="text-sm text-[#d4d0ff]">{request.requestedAt}</p>
                  </div>
                </div>
                <p className="text-[#d4d0ff] mb-4">クエスト: {request.questTitle}</p>
                <div className="flex gap-2">
                  <Button 
                    className="bg-[#4A0E82] hover:bg-[#5A1E92] text-white"
                  >
                    承認する
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-[#4A0E82] text-[#d4d0ff] hover:bg-[#4A0E82] hover:text-white"
                  >
                    断る
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}