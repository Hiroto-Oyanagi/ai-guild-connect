import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface QuestFormProps {
  onSubmit: (formData: FormData) => void;
}

export function QuestForm({ onSubmit }: QuestFormProps) {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    files.forEach(file => {
      formData.append('files', file)
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
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
        <Label htmlFor="files" className="text-[#d4d0ff]">添付ファイル</Label>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
            <Button
              type="button"
              onClick={() => document.getElementById('files')?.click()}
              variant="outline"
              className="w-full border-dashed border-2 border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white py-8"
            >
              <Upload className="mr-2 h-4 w-4" />
              クリックしてファイルを選択
              <span className="text-sm ml-2">(PDF, Word, テキスト)</span>
            </Button>
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#4A0E82] bg-opacity-30 p-2 rounded"
                >
                  <span className="text-[#d4d0ff] text-sm truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(file)}
                    className="text-red-300 hover:text-red-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
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
  )
}