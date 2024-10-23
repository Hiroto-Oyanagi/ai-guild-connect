import { Zap, Brain, Edit } from "lucide-react"
import { QuestCard } from "./QuestCard"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export function QuestBoard() {
  return (
    <div className="bg-[#2A0374] bg-opacity-30 p-8 rounded-3xl shadow-lg border border-[#4A0E82]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#a29dff]">QUEST BOARD</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#a29dff]">Dify関連のクエスト</h3>
        </div>

        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#a29dff]">V0関連のクエスト</h3>
        </div>

        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#a29dff]">Cursor関連のクエスト</h3>
        </div>

        <div className="col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#a29dff]">Bolt関連のクエスト</h3>
        </div>
      </div>
    </div>
  )
}