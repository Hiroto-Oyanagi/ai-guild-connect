import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"

export default function CreateQuest() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const questData = {
      title: formData.get("title"),
      description: formData.get("description"),
      skills: skills,
      duration: formData.get("duration"),
      location: formData.get("location"),
      reward: formData.get("reward"),
    }

    // ここでAPIを呼び出してクエストを保存する処理を追加予定
    console.log(questData)

    toast({
      title: "クエストを作成しました",
      description: "新しいクエストが正常に作成されました。",
    })

    navigate("/company-dashboard")
  }

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#d4d0ff]">タイトル</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
                  placeholder="クエストのタイトルを入力"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#d4d0ff]">詳細説明</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white min-h-[150px]"
                  placeholder="クエストの詳細な説明を入力"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#d4d0ff]">必要なスキル</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
                    placeholder="必要なスキルを入力"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddSkill}
                    className="bg-[#4A0E82] hover:bg-[#5A1E92] text-white"
                  >
                    追加
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#4A0E82] text-white px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-red-300 hover:text-red-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-[#d4d0ff]">期間</Label>
                <Input
                  id="duration"
                  name="duration"
                  required
                  className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
                  placeholder="例: 3ヶ月"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-[#d4d0ff]">勤務地</Label>
                <Input
                  id="location"
                  name="location"
                  required
                  className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
                  placeholder="例: リモート可"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward" className="text-[#d4d0ff]">報酬</Label>
                <Input
                  id="reward"
                  name="reward"
                  required
                  className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
                  placeholder="例: 100,000円"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#4A0E82] hover:bg-[#5A1E92] text-white"
              >
                クエストを作成
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}