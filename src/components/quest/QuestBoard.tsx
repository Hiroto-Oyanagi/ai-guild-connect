import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

export function QuestBoard() {
  const navigate = useNavigate()

  const questCategories = [
    { id: "dify", title: "Dify関連のクエスト", color: "from-purple-500 to-indigo-500" },
    { id: "v0", title: "V0関連のクエスト", color: "from-blue-500 to-cyan-500" },
    { id: "cursor", title: "Cursor関連のクエスト", color: "from-emerald-500 to-teal-500" },
    { id: "bolt", title: "Bolt関連のクエスト", color: "from-orange-500 to-amber-500" }
  ]

  return (
    <div className="bg-[#2A0374] bg-opacity-30 p-8 rounded-3xl shadow-lg border border-[#4A0E82]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#a29dff]">QUEST BOARD</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {questCategories.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transform transition-all duration-300 hover:scale-105 overflow-hidden bg-gradient-to-br ${category.color}`}
            onClick={() => navigate(`/quests/${category.id}`)}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              <div className="mt-4 h-32 flex items-center justify-center">
                <span className="text-white/60 text-sm">クリックして詳細を見る</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}