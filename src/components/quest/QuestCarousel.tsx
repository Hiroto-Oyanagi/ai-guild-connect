import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface Quest {
  id: number;
  title: string;
  progress: number;
}

interface QuestCarouselProps {
  quests: Quest[];
  onViewProgress: (questId: number) => void;
}

export function QuestCarousel({ quests, onViewProgress }: QuestCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {quests.map((quest) => (
          <CarouselItem key={quest.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-[#2A0374] bg-opacity-50 border-[#4A0E82]">
                <CardContent className="flex flex-col p-6">
                  <h3 className="text-lg font-semibold text-[#a29dff] mb-2">{quest.title}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-2 flex-1 bg-[#120166] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#a29dff]"
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#d4d0ff]">{quest.progress}%</span>
                  </div>
                  <Button
                    onClick={() => onViewProgress(quest.id)}
                    variant="outline"
                    className="mt-auto border-[#a29dff] text-[#a29dff] hover:bg-[#4A0E82]"
                  >
                    進捗を確認
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}