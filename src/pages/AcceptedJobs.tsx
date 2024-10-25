import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AcceptedQuest {
  id: number;
  title: string;
  detail: string;
  skill: string;
  deadline: string;
  compensation: number;
  status: string;
}

export default function AcceptedJobs() {
  const navigate = useNavigate()

  const { data: acceptedQuests = [], isLoading } = useQuery({
    queryKey: ['accepted-quests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Quest')
        .select('*')
        .eq('status', 'accepted')
      
      if (error) throw error
      return data || []
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120166] to-[#4A0E82] p-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 text-white hover:text-[#a29dff]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <h2 className="text-2xl font-bold mb-6 text-[#a29dff]">引き受けた仕事一覧</h2>
        
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isLoading ? (
            <div className="text-center py-8 text-[#d4d0ff]">
              <p>読み込み中...</p>
            </div>
          ) : acceptedQuests.length === 0 ? (
            <div className="text-center py-8 text-[#d4d0ff]">
              <p>まだ引き受けた仕事はありません</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acceptedQuests.map((quest: AcceptedQuest) => (
                <Card 
                  key={quest.id}
                  className="bg-[#2A0374] bg-opacity-30 border-[#4A0E82] hover:bg-opacity-50 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-[#a29dff]">{quest.title}</h3>
                      <Badge 
                        variant="secondary"
                        className="bg-[#4A0E82] text-white"
                      >
                        {quest.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-[#d4d0ff]">
                      <p className="text-sm">{quest.detail}</p>
                      <p>必要スキル: {quest.skill}</p>
                      <p>締切: {quest.deadline}</p>
                      <p>報酬: {quest.compensation.toLocaleString()}円</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}