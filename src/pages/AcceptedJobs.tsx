import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AcceptedJobs() {
  const navigate = useNavigate()

  // モックデータ
  const acceptedJobs = [
    {
      id: 1,
      title: "AIモデルの最適化タスク",
      status: "進行中",
      deadline: "2024/03/31",
      reward: "120,000円"
    },
    {
      id: 2,
      title: "データ分析プロジェクト",
      status: "レビュー待ち",
      deadline: "2024/04/15",
      reward: "80,000円"
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

        <h2 className="text-2xl font-bold mb-6 text-[#a29dff]">引き受けた仕事一覧</h2>
        
        <div className="grid gap-4">
          {acceptedJobs.map((job) => (
            <Card 
              key={job.id}
              className="bg-[#2A0374] bg-opacity-30 border-[#4A0E82]"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-[#a29dff]">{job.title}</h3>
                  <Badge 
                    variant="secondary"
                    className="bg-[#4A0E82] text-white"
                  >
                    {job.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-[#d4d0ff]">
                  <p>締切: {job.deadline}</p>
                  <p>報酬: {job.reward}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}