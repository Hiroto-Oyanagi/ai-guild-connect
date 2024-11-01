import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Scroll, User, Trophy, Zap, Brain, Edit, X, Users, BarChart, Menu, MessageSquare, Briefcase } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { QuestBoard } from "@/components/quest/QuestBoard"
import { UserList } from "@/components/profile/UserList"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [activeTab, setActiveTab] = useState("quests")
  const [activeProfileTab, setActiveProfileTab] = useState("myProfile")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "山田 太郎",
    image: "/placeholder.svg?height=200&width=200",
    introduction: "AIギルド3年生。機械学習を専攻しており、特にディープラーニングと自然言語処理に興味があります。チームワークを大切にし、新しいアイデアを生み出すことが得意です。",
    skills: ["機械学習", "自然言語処理", "データ分析", "プロジェクト管理"]
  })

  const navigate = useNavigate()

  const handleQuestClick = () => {
    setActiveTab("quests")
  }

  const handleProfileClick = () => {
    setActiveTab("profile")
    setActiveProfileTab("myProfile")
  }

  const handleEditProfile = (updatedProfile) => {
    setProfile(updatedProfile)
    setIsEditing(false)
    toast({
      title: "プロフィールを更新しました",
      description: "変更が正常に保存されました。",
    })
  }

  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#120166] via-[#2A0374] to-[#4A0E82] text-white">
      <NodeAnimation />
      <header className="sticky top-0 z-10 bg-[#120166] bg-opacity-80 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold font-serif">AIギルド</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">メニュー</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#2A0374] border-[#4A0E82] text-white">
            <DropdownMenuItem 
              className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
              onClick={() => handleMenuItemClick('/home')}
            >
              <Scroll className="mr-2 h-4 w-4" />
              <span>クエスト</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
              onClick={() => setActiveTab('profile')}
            >
              <User className="mr-2 h-4 w-4" />
              <span>プロフィール</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
              onClick={() => handleMenuItemClick('/accepted-jobs')}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              <span>引き受けた仕事</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
              onClick={() => handleMenuItemClick('/party-requests')}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>パーティーの依頼</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer hover:bg-[#4A0E82]"
              onClick={() => handleMenuItemClick('/messages')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>メッセージ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#2A0374] bg-opacity-50 backdrop-blur-sm rounded-full">
              <TabsTrigger value="quests" className="data-[state=active]:bg-[#4A0E82] rounded-full">業務内容</TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#4A0E82] rounded-full">プロフィール</TabsTrigger>
            </TabsList>
            <TabsContent value="quests">
              <QuestBoard />
            </TabsContent>
            <TabsContent value="profile">
              <Tabs value={activeProfileTab} onValueChange={setActiveProfileTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#2A0374] bg-opacity-50 backdrop-blur-sm rounded-full">
                  <TabsTrigger value="myProfile" className="data-[state=active]:bg-[#4A0E82] rounded-full">自分のプロフィール</TabsTrigger>
                  <TabsTrigger value="otherProfiles" className="data-[state=active]:bg-[#4A0E82] rounded-full">他のユーザー</TabsTrigger>
                </TabsList>
                <TabsContent value="myProfile">
                  {isEditing ? (
                    <EditProfileCard profile={profile} onSave={handleEditProfile} onCancel={() => setIsEditing(false)} />
                  ) : (
                    <ProfileCard
                      profile={profile}
                      onEdit={() => setIsEditing(true)}
                    />
                  )}
                </TabsContent>
                <TabsContent value="otherProfiles">
                  <UserList />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </main>
      </ScrollArea>

      <nav className="sticky bottom-0 bg-[#120166] bg-opacity-80 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <NavButton icon={<Scroll className="h-6 w-6" />} label="クエスト" onClick={handleQuestClick} />
            <NavButton icon={<User className="h-6 w-6" />} label="プロフィール" onClick={handleProfileClick} />
          </div>
        </div>
      </nav>
    </div>
  )
}

function NodeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    const numNodes = 50
    const connectionDistance = 100

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(100, 100, 255, 0.5)'
        ctx.fill()
      })

      ctx.strokeStyle = 'rgba(100, 100, 255, 0.2)'
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
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

function NavButton({ icon, label, onClick }) {
  return (
    <Button variant="ghost" className="flex flex-col items-center p-2 text-[#d4d0ff] hover:text-[#a29dff]" onClick={onClick}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Button>
  )
}
