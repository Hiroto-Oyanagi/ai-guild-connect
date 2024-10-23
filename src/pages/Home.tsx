import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Scroll, Settings, User, Trophy, Zap, Brain, Edit, X, Users, BarChart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

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

      // Update node positions
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

      // Draw connections
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#120166] via-[#2A0374] to-[#4A0E82] text-white">
      <NodeAnimation />
      <header className="sticky top-0 z-10 bg-[#120166] bg-opacity-80 p-4 shadow-md flex justify-between items-center backdrop-blur-sm">
        <h1 className="text-2xl font-bold font-serif">AIギルド</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
          <span className="sr-only">設定</span>
        </Button>
      </header>

      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#2A0374] bg-opacity-50 backdrop-blur-sm rounded-full">
              <TabsTrigger value="quests" className="data-[state=active]:bg-[#4A0E82] rounded-full">業務内容</TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#4A0E82] rounded-full">プロフィール</TabsTrigger>
            </TabsList>
            <TabsContent value="quests">
              <div className="bg-[#2A0374] bg-opacity-30 p-8 rounded-3xl shadow-lg border border-[#4A0E82]">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#a29dff]">QUEST BOARD</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <QuestCard
                    title="新規AI開発プロジェクト"
                    description="最新の機械学習技術を活用した新規AIプロジェクトの立ち上げと開発"
                    reward="プロジェクト成功報酬 + 特許取得ボーナス"
                    difficulty="困難"
                    icon={<Zap className="h-6 w-6" />}
                    details="1. 最新の機械学習アルゴリズムの調査と選定
2. データセットの収集と前処理
3. モデルの設計と実装
4. トレーニングとファインチューニング
5. 性能評価と改善
6. デプロイメントと運用計画の策定"
                  />
                  <QuestCard
                    title="自然言語処理システム改善"
                    description="既存の自然言語処理システムの精度向上と新機能追加"
                    reward="性能向上率に応じたボーナス"
                    difficulty="普通"
                    icon={<Brain className="h-6 w-6" />}
                    details="1. 現行システムの分析と課題抽出
2. 最新のNLP技術の調査と適用検討
3. モデルのアップデートと再学習
4. 新機能の設計と実装
5. テストと性能評価
6. ドキュメンテーションの更新"
                  />
                  <QuestCard
                    title="AI倫理ガイドライン策定"
                    description="AIの開発と運用における倫理的ガイドラインの策定"
                    reward="ガイドライン採用ボーナス"
                    difficulty="普通"
                    icon={<Users className="h-6 w-6" />}
                    details="1. AI倫理に関する最新の研究と事例の調査
2. ステークホルダーへのヒアリングと要件収集
3. ガイドライン草案の作成
4. 内部レビューと修正
5. 外部専門家によるレビュー
6. 最終版の策定と組織内への展開"
                  />
                  <QuestCard
                    title="機械学習モデル最適化"
                    description="既存の機械学習モデルのパフォーマンス改善と計算コスト削減"
                    reward="効率化達成度に応じたボーナス"
                    difficulty="困難"
                    icon={<Settings className="h-6 w-6" />}
                    details="1. 現行モデルの性能分析
2. ボトルネックの特定
3. モデルアーキテクチャの最適化
4. ハイパーパラメータのチューニング
5. 量子化やプルーニングの適用
6. 改善後の性能評価とドキュメント化"
                  />
                  <QuestCard
                    title="Difyを活用したAIアプリケーション開発"
                    description="Difyプラットフォームを使用して、革新的なAIアプリケーションを設計・開発する"
                    reward="開発されたアプリケーションの収益シェア"
                    difficulty="普通"
                    icon={<Zap className="h-6 w-6" />}
                    details="1. Difyプラットフォームの機能と特徴の理解
2. AIアプリケーションのコンセプト立案
3. Difyを使用したプロトタイプの作成
4. ユーザーフィードバックの収集と分析
5. アプリケーションの改善と最適化
6. 本番環境へのデプロイと運用"
                  />
                  <QuestCard
                    title="V0を用いたUI/UXデザイン最適化"
                    description="V0のAI支援機能を活用して、既存アプリケーションのUI/UXを改善する"
                    reward="ユーザー満足度向上ボーナス"
                    difficulty="普通"
                    icon={<Edit className="h-6 w-6" />}
                    details="1. 現行アプリケーションのUI/UX分析
2. V0を使用した改善案の生成
3. 生成された案の評価と選定
4. 選定された改善案の実装
5. A/Bテストの実施
6. テスト結果に基づく最終的な改善の適用"
                  />
                  <QuestCard
                    title="Cursorを活用したコーディング効率化"
                    description="Cursorエディタを使用してコーディング作業の効率を大幅に向上させる"
                    reward="生産性向上ボーナス"
                    difficulty="簡単"
                    icon={<Brain className="h-6 w-6" />}
                    details="1. Cursorエディタの機能と使用方法の習得
2. チーム内でのCursor活用ワークショップの開催
3. 既存プロジェクトへのCursor導入
4. コーディング速度と品質の測定
5. Cursor使用前後の生産性比較
6. ベストプラクティスの文書化と共有"
                  />
                  <QuestCard
                    title="Voltを使用したデータ分析プロジェクト"
                    description="Voltプラットフォームを利用して大規模データセットの分析と可視化を行う"
                    reward="データインサイト発見ボーナス"
                    difficulty="困難"
                    icon={<BarChart className="h-6 w-6" />}
                    details="1. 分析対象のデータセット選定
2. Voltプラットフォームへのデータ取り込み
3. データクレンジングと前処理
4. 高度な分析モデルの構築
5. インサイトの抽出と可視化
6. 分析結果のプレゼンテーション作成
7. 意思決定者へのレポート提出"
                  />
                </div>
              </div>
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

function QuestCard({ title, description, reward, difficulty, details, icon }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-all bg-[#2A0374] bg-opacity-50 border-[#4A0E82] shadow-md transform hover:-translate-y-1 hover:rotate-1 rounded-xl overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {icon}
                <CardTitle className="text-lg text-[#B8A2FF]">{title}</CardTitle>
              </div>
              <Badge variant={difficulty === "簡単" ? "secondary" : difficulty === "普通" ? "default" : "destructive"} className="bg-[#4A0E82] text-white">
                {difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-[#D8CCFF]">{description}</p>
            <p className="font-semibold text-sm text-[#B8A2FF]">報酬: {reward}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#120166] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-[#a29dff]">
            {icon}
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-[#d4d0ff]">難易度:</h4>
          <Badge variant={difficulty === "簡単" ? "secondary" : difficulty === "普通" ? "default" : "destructive"} className="bg-[#4A0E82] text-white">
            {difficulty}
          </Badge>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-[#d4d0ff]">報酬:</h4>
          <p className="text-[#a29dff]">{reward}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-[#d4d0ff]">詳細:</h4>
          <ScrollArea className="h-[200px] w-full rounded-md border border-[#4A0E82] p-4 bg-[#2A0374] ">
            <p className="whitespace-pre-line text-[#d4d0ff]">{details}</p>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button onClick={() => toast({ title: "クエストを受注しました", description: "頑張ってください！" })} className="w-full mt-4 bg-[#4A0E82] hover:bg-[#5A1E92] text-white">
            クエストを受注する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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

function NavButton({ icon, label, onClick }) {
  return (
    <Button variant="ghost" className="flex flex-col items-center p-2 text-[#d4d0ff] hover:text-[#a29dff]" onClick={onClick}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Button>
  )
}
