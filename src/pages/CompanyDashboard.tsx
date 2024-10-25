import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, FileText, MessageSquare, Settings, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QuestCarousel } from "@/components/quest/QuestCarousel"
import { supabase } from "@/integrations/supabase/client"

interface Quest {
  id: number;
  title: string;
  detail: string;
  skill: string;
  deadline: string;
  compensation: number;
}

export default function CompanyDashboard() {
  const navigate = useNavigate()
  const [ongoingQuests, setOngoingQuests] = useState<Quest[]>([])

  useEffect(() => {
    fetchQuests()
  }, [])

  const fetchQuests = async () => {
    try {
      const { data, error } = await supabase
        .from('Quest')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOngoingQuests(data || [])
    } catch (error) {
      console.error('Error fetching quests:', error)
    }
  }

  // モックデータ
  const stats = [
    {
      title: "登録済みAIプログラマー",
      value: "150+",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "進行中のプロジェクト",
      value: String(ongoingQuests.length),
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "未読メッセージ",
      value: "3",
      icon: <MessageSquare className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120166] via-[#2A0374] to-[#4A0E82] text-white">
      <header className="sticky top-0 z-10 bg-[#120166] bg-opacity-80 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-serif">AIギルド 企業ダッシュボード</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white"
              onClick={() => navigate('/create-quest')}
            >
              <Plus className="mr-2 h-4 w-4" />
              新規クエスト作成
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-[#4A0E82] rounded-lg">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-[#d4d0ff]">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-[#a29dff]">{stat.value}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82] mb-8">
            <CardHeader>
              <CardTitle className="text-[#a29dff]">進行中のプロジェクト</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ongoingQuests.map((quest) => (
                  <Card key={quest.id} className="bg-[#2A0374] bg-opacity-30 border-[#4A0E82]">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-[#a29dff] mb-2">{quest.title}</h3>
                      <p className="text-sm text-[#d4d0ff] mb-2">{quest.detail}</p>
                      <div className="space-y-1 text-sm text-[#d4d0ff]">
                        <p>必要スキル: {quest.skill}</p>
                        <p>期間: {quest.deadline}</p>
                        <p>報酬: {quest.compensation}円</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {ongoingQuests.length === 0 && (
                <div className="text-center py-8 text-[#d4d0ff]">
                  <p>進行中のプロジェクトはありません</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white"
                    onClick={() => navigate('/create-quest')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    新規クエストを作成
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
            <CardHeader>
              <CardTitle className="text-[#a29dff]">最近の応募</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#4A0E82] bg-opacity-30 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[#d4d0ff]">AIモデル最適化プロジェクト</h4>
                      <p className="text-sm text-[#d4d0ff]">3名の応募があります</p>
                    </div>
                    <Button variant="outline" className="border-[#a29dff] text-[#a29dff] hover:bg-[#4A0E82]">
                      詳細を見る
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </ScrollArea>
    </div>
  )
}