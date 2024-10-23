import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

interface User {
  id: string
  name: string
  image: string
  skills: string[]
  introduction: string
}

// 仮のユーザーデータ（後でAPIから取得するように変更可能）
const mockUsers: User[] = [
  {
    id: "1",
    name: "鈴木 一郎",
    image: "/avatars/user1.png",
    skills: ["Python", "機械学習", "自然言語処理"],
    introduction: "機械学習エンジニアとして3年の経験があります。"
  },
  {
    id: "2",
    name: "佐藤 花子",
    image: "/avatars/user2.png",
    skills: ["データ分析", "統計学", "R言語"],
    introduction: "データサイエンティストとして活動しています。"
  },
  {
    id: "3",
    name: "田中 太郎",
    image: "/avatars/user3.png",
    skills: ["深層学習", "Computer Vision", "PyTorch"],
    introduction: "画像認識の研究開発に従事しています。"
  }
]

export function UserList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <>
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {mockUsers.map((user) => (
            <Card 
              key={user.id} 
              className="bg-[#2A0374] bg-opacity-30 border-[#4A0E82] hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => setSelectedUser(user)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-[#a29dff]">{user.name}</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#d4d0ff] mb-4">{user.introduction}</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge 
                      key={index}
                      className="bg-[#4A0E82] bg-opacity-50 text-white border border-[#a29dff]"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="bg-[#2A0374] border-[#4A0E82] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#a29dff] flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={selectedUser?.image} alt={selectedUser?.name} />
                <AvatarFallback>{selectedUser?.name?.[0]}</AvatarFallback>
              </Avatar>
              <span>{selectedUser?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-[#a29dff] mb-2">自己紹介</h4>
              <p className="text-[#d4d0ff]">{selectedUser?.introduction}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#a29dff] mb-2">スキル</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUser?.skills.map((skill, index) => (
                  <Badge 
                    key={index}
                    className="bg-[#4A0E82] bg-opacity-50 text-white border border-[#a29dff]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}