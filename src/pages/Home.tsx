import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestBoard } from "@/components/quest/QuestBoard"
import { UserList } from "@/components/profile/UserList"
import { Header } from "@/components/layout/Header"
import { Navigation } from "@/components/layout/Navigation"
import { ProfileSection } from "@/components/profile/ProfileSection"

export default function Home() {
  const [activeTab, setActiveTab] = useState("quests")
  const [activeProfileTab, setActiveProfileTab] = useState("myProfile")

  const handleQuestClick = () => {
    setActiveTab("quests")
  }

  const handleProfileClick = () => {
    setActiveTab("profile")
    setActiveProfileTab("myProfile")
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#120166] via-[#2A0374] to-[#4A0E82] text-white">
      <NodeAnimation />
      <Header />

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
                  <ProfileSection />
                </TabsContent>
                <TabsContent value="otherProfiles">
                  <UserList />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </main>
      </ScrollArea>

      <Navigation 
        onQuestClick={handleQuestClick}
        onProfileClick={handleProfileClick}
      />
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
