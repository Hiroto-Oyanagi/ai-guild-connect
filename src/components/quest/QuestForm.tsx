import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface QuestFormProps {
  onSubmit: (formData: FormData) => void;
}

export function QuestForm({ onSubmit }: QuestFormProps) {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // スキルを FormData に追加
    skills.forEach(skill => {
      formData.append('skills', skill)
    })
    onSubmit(formData)
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
            <Badge
              key={index}
              className="bg-[#4A0E82] text-white flex items-center gap-2"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-red-300 hover:text-red-100"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
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
        <Label htmlFor="reward" className="text-[#d4d0ff]">報酬</Label>
        <Input
          id="reward"
          name="reward"
          type="number"
          required
          className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
          placeholder="例: 100000"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#4A0E82] hover:bg-[#5A1E92] text-white"
      >
        クエストを作成
      </Button>
    </form>
  )
}