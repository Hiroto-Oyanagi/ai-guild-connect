import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "山田 太郎",
    image: "/placeholder.svg?height=200&width=200",
    introduction: "AIギルド3年生。機械学習を専攻しており、特にディープラーニングと自然言語処理に興味があります。チームワークを大切にし、新しいアイデアを生み出すことが得意です。",
    skills: ["機械学習", "自然言語処理", "データ分析", "プロジェクト管理"]
  })

  const handleEditProfile = (updatedProfile) => {
    setProfile(updatedProfile)
    setIsEditing(false)
    toast({
      title: "プロフィールを更新しました",
      description: "変更が正常に保存されました。",
    })
  }

  return isEditing ? (
    <EditProfileCard profile={profile} onSave={handleEditProfile} onCancel={() => setIsEditing(false)} />
  ) : (
    <ProfileCard
      profile={profile}
      onEdit={() => setIsEditing(true)}
    />
  )
}

function ProfileCard({ profile, onEdit }) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#2A0374] bg-opacity-50 backdrop-blur-sm border border-[#4A0E82] shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#120166] to-[#4A0E82] pb-10 relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-[#2A0374] rounded-full p-2 border-4 border-[#a29dff]">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profile.image} alt={profile.name} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-20 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#a29dff]">{profile.name}</h2>
          <p className="text-sm text-[#d4d0ff]">AIギルド会員</p>
        </div>
        <div className="bg-[#2A0374] bg-opacity-50 p-4 rounded-xl border border-[#4A0E82]">
          <h3 className="text-lg font-semibold mb-2 text-[#a29dff]">自己紹介</h3>
          <p className="text-[#d4d0ff]">{profile.introduction}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#a29dff]">スキル</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-[#4A0E82] text-white border border-[#a29dff]">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[#2A0374] bg-opacity-50 border-t border-[#4A0E82]">
        <Button onClick={onEdit} className="w-full bg-[#4A0E82] hover:bg-[#5A1E92] text-white">
          <Edit className="mr-2 h-4 w-4" />
          プロフィールを編集
        </Button>
      </CardFooter>
    </Card>
  )
}

function EditProfileCard({ profile, onSave, onCancel }) {
  const [editedProfile, setEditedProfile] = useState(profile)
  const [newSkill, setNewSkill] = useState("")

  const handleInputChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })
  }

  const handleAddSkill = () => {
    if (newSkill && !editedProfile.skills.includes(newSkill)) {
      setEditedProfile({ ...editedProfile, skills: [...editedProfile.skills, newSkill] })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setEditedProfile({ ...editedProfile, skills: editedProfile.skills.filter(skill => skill !== skillToRemove) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedProfile)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#2A0374] bg-opacity-50 backdrop-blur-sm border border-[#4A0E82] rounded-3xl">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl text-[#a29dff]">プロフィールを編集</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#d4d0ff]">名前</Label>
            <Input
              id="name"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image" className="text-[#d4d0ff]">プロフィール画像</Label>
            <div className="flex items-center space-x-4">
              <img
                src={editedProfile.image}
                alt="プロフィール画像プレビュー"
                className="w-16 h-16 rounded-full object-cover"
              />
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditedProfile({ ...editedProfile, image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="introduction" className="text-[#d4d0ff]">自己紹介</Label>
            <Textarea
              id="introduction"
              name="introduction"
              value={editedProfile.introduction}
              onChange={handleInputChange}
              rows={4}
              className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills" className="text-[#d4d0ff]">スキル</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editedProfile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-[#4A0E82] text-white">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-red-300 hover:text-red-100"
                    aria-label={`${skill}を削除`}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="新しいスキルを入力"
                className="bg-[#120166] bg-opacity-50 border-[#4A0E82] text-white"
              />
              <Button type="button" onClick={handleAddSkill} className="bg-[#4A0E82] hover:bg-[#5A1E92] text-white">追加</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} className="border-[#4A0E82] text-[#d4d0ff] hover:bg-[#2A0374] hover:text-white">キャンセル</Button>
          <Button type="submit" className="bg-[#4A0E82] hover:bg-[#5A1E92] text-white">保存</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
