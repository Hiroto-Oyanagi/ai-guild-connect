import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function QuestDetails() {
  const { categoryId } = useParams()
  const { toast } = useToast()

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
    },
    // 他のクエストデータ
  ]

  const handleApply = (questId: number) => {
    toast({
      title: "応募完了",
      description: "クエストへの応募が完了しました",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120166] to-[#4A0E82] p-4">
      <div className="max-w-4xl mx-auto">
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
                      <Button 
                        onClick={() => handleApply(quest.id)}
                        className="bg-[#4A0E82] hover:bg-[#5A1E92] text-white"
                      >
                        応募する
                      </Button>
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