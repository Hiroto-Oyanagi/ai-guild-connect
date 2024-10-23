import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, FileText, MessageSquare, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CompanyDashboard() {
  const navigate = useNavigate()

  // モックデータ
  const stats = [
    {
      title: "登録済みAIプログラマー",
      value: "150+",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "進行中のプロジェクト",
      value: "12",
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
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
              <CardHeader>
                <CardTitle className="text-[#a29dff]">最近の応募</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#4A0E82] bg-opacity-30 rounded-lg">
                      <div>
                        <h4 className="font-semibold">AIモデル最適化プロジェクト</h4>
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

            <Card className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
              <CardHeader>
                <CardTitle className="text-[#a29dff]">進行中のプロジェクト</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#4A0E82] bg-opacity-30 rounded-lg">
                      <div>
                        <h4 className="font-semibold">データ分析システム開発</h4>
                        <p className="text-sm text-[#d4d0ff]">進捗率: 65%</p>
                      </div>
                      <Button variant="outline" className="border-[#a29dff] text-[#a29dff] hover:bg-[#4A0E82]">
                        進捗を確認
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </ScrollArea>
    </div>
  )
}