import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Users } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useState } from "react"

interface Quest {
  id: number;
  title: string;
  detail: string;
  skill: string;
  deadline: string;
  compensation: number;
}

const fetchQuests = async () => {
  const { data, error } = await supabase
    .from('Quest')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

const getCategorySkill = (categoryId: string): string => {
  const categoryMap: { [key: string]: string } = {
    'dify': 'Dify',
    'v0': 'V0',
    'cursor': 'Cursor',
    'bolt': 'Bolt'
  }
  return categoryMap[categoryId] || ''
}

export default function QuestDetails() {
  const { categoryId } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [appliedQuests, setAppliedQuests] = useState<number[]>([])
  const [searchingParty, setSearchingParty] = useState<number[]>([])

  const { data: allQuests = [], isLoading } = useQuery({
    queryKey: ['quests'],
    queryFn: fetchQuests,
  })

  const filteredQuests = allQuests.filter((quest: Quest) => 
    quest.skill === getCategorySkill(categoryId || '')
  )

  const handleApply = async (questId: number) => {
    try {
      const { error } = await supabase
        .from('Quest')
        .update({ status: 'accepted' })
        .eq('id', questId)

      if (error) throw error

      setAppliedQuests(prev => [...prev, questId])
      toast({
        title: "応募完了",
        description: "クエストへの応募が完了しました",
      })
    } catch (error) {
      toast({
        title: "エラー",
        description: "応募に失敗しました",
        variant: "destructive"
      })
    }
  }

  const handlePartySearch = (questId: number) => {
    setSearchingParty(prev => [...prev, questId])
    navigate(`/party-search/${questId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120166] to-[#4A0E82] p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 text-white hover:text-[#a29dff]"
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <h2 className="text-2xl font-bold mb-6 text-[#a29dff]">
          {getCategorySkill(categoryId || '')}関連のクエスト
        </h2>

        {isLoading ? (
          <div className="text-center py-8 text-[#d4d0ff]">
            <p>クエストを読み込み中...</p>
          </div>
        ) : filteredQuests.length === 0 ? (
          <div className="text-center py-8 text-[#d4d0ff]">
            <p>このカテゴリーのクエストはまだありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuests.map((quest: Quest) => (
              <Card key={quest.id} className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-[#a29dff]">{quest.title}</h2>
                    <p className="text-[#d4d0ff]">{quest.detail}</p>
                    <div className="space-y-2">
                      <p className="text-[#d4d0ff]">報酬: {quest.compensation}円</p>
                      <p className="text-[#d4d0ff]">期間: {quest.deadline}</p>
                      <p className="text-[#d4d0ff]">必要スキル: {quest.skill}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button 
                        onClick={() => handleApply(quest.id)}
                        disabled={appliedQuests.includes(quest.id)}
                        className={`bg-[#4A0E82] hover:bg-[#5A1E92] text-white ${
                          appliedQuests.includes(quest.id) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {appliedQuests.includes(quest.id) ? '応募済み' : '応募する'}
                      </Button>
                      <Button 
                        onClick={() => handlePartySearch(quest.id)}
                        variant="outline"
                        className="border-[#4A0E82] text-[#a29dff] hover:bg-[#4A0E82] hover:text-white"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        パーティーを探す
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}