import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestForm } from "@/components/quest/QuestForm"
import { useToast } from "@/components/ui/use-toast"

export default function CreateQuest() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = (formData: FormData) => {
    // ここでAPIを呼び出してクエストを保存する処理を追加予定
    console.log(formData)

    toast({
      title: "クエストを作成しました",
      description: "新しいクエストが正常に作成されました。",
    })

    navigate("/company-dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120166] via-[#2A0374] to-[#4A0E82] p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 text-white hover:text-[#a29dff]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <Card className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
          <CardHeader>
            <CardTitle className="text-2xl text-[#a29dff]">新規クエスト作成</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
