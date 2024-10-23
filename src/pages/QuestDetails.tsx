import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowLeft, Users } from "lucide-react"
import { useState } from "react"

export default function QuestDetails() {
  const { categoryId } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [appliedQuests, setAppliedQuests] = useState<number[]>([])
  const [searchingParty, setSearchingParty] = useState<number[]>([])

  // この部分は後でAPIから取得するデータに置き換えることができます
  const quests = [
    {
      id: 1,
      title: "新規プロジェクト開発",
      description: "革新的な機能の実装",
      reward: "100,000円",
      difficulty: "中級"
    },
    {
      id: 2,
      title: "既存システム改善",
      description: "パフォーマンス最適化",
      reward: "80,000円",
      difficulty: "初級"
    }
  ]

  const handleApply = (questId: number) => {
    setAppliedQuests(prev => [...prev, questId])
    toast({
      title: "応募完了",
      description: "クエストへの応募が完了しました",
    })
  }

  const handlePartySearch = (questId: number) => {
    setSearchingParty(prev => [...prev, questId])
    navigate(`/party-search/${questId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120166] to-[#4A0E82] p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 text-white hover:text-[#a29dff]"
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
        <Carousel className="w-full">
          <CarouselContent>
            {quests.map((quest) => (
              <CarouselItem key={quest.id}>
                <Card className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h2 className="text-2xl font-bold text-[#a29dff]">{quest.title}</h2>
                      <p className="text-[#d4d0ff]">{quest.description}</p>
                      <div className="space-y-2">
                        <p className="text-[#d4d0ff]">報酬: {quest.reward}</p>
                        <p className="text-[#d4d0ff]">難易度: {quest.difficulty}</p>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button 
                          onClick={() => handleApply(quest.id)}
                          disabled={appliedQuests.includes(quest.id)}
                          className={`bg-[#4A0E82] hover:bg-[#5A1E92] text-white ${
                            appliedQuests.includes(quest.id) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {appliedQuests.includes(quest.id) ? '応募済み' : '応募する'}
                        </Button>
                        <Button 
                          onClick={() => handlePartySearch(quest.id)}
                          variant="outline"
                          className="border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          パーティーを探す
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}