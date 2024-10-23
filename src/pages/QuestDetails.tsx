import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Users, Search } from "lucide-react"
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
      detailedDescription: "このプロジェクトでは、最新のAI技術を活用した革新的な機能の実装を行います。主な業務内容には、機械学習モデルの開発、APIの設計と実装、フロントエンドの開発が含まれます。",
      reward: "100,000円",
      difficulty: "中級",
      requiredSkills: ["Python", "機械学習", "React"],
      duration: "3ヶ月",
      location: "リモート可"
    },
    {
      id: 2,
      title: "既存システム改善",
      description: "パフォーマンス最適化",
      detailedDescription: "既存のシステムのパフォーマンスを改善し、レスポンス時間を50%削減することが目標です。データベースの最適化、キャッシュの実装、コードのリファクタリングなどが主な作業となります。",
      reward: "80,000円",
      difficulty: "初級",
      requiredSkills: ["SQL", "性能改善", "コードレビュー"],
      duration: "2ヶ月",
      location: "週2回オフィス"
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline"
                              className="border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white"
                            >
                              <Search className="mr-2 h-4 w-4" />
                              仕事の詳細を見る
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#2A0374] text-white border border-[#4A0E82]">
                            <DialogHeader>
                              <DialogTitle className="text-[#a29dff] text-xl">{quest.title}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh] pr-4">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-[#a29dff] font-semibold mb-2">詳細説明</h3>
                                  <p className="text-[#d4d0ff]">{quest.detailedDescription}</p>
                                </div>
                                <div>
                                  <h3 className="text-[#a29dff] font-semibold mb-2">必要なスキル</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {quest.requiredSkills.map((skill, index) => (
                                      <span key={index} className="bg-[#4A0E82] px-2 py-1 rounded text-sm text-white">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-[#a29dff] font-semibold mb-2">期間</h3>
                                    <p className="text-[#d4d0ff]">{quest.duration}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-[#a29dff] font-semibold mb-2">勤務地</h3>
                                    <p className="text-[#d4d0ff]">{quest.location}</p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-[#a29dff] font-semibold mb-2">報酬</h3>
                                  <p className="text-[#d4d0ff]">{quest.reward}</p>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
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