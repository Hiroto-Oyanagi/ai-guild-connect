import { Zap, Brain, Edit } from "lucide-react"
import { QuestCard } from "./QuestCard"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export function QuestBoard() {
  return (
    <div className="bg-[#2A0374] bg-opacity-30 p-8 rounded-3xl shadow-lg border border-[#4A0E82]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#a29dff]">QUEST BOARD</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <QuestCard
                  title="Difyを活用したAI開発"
                  description="Difyプラットフォームを使用して、革新的なAIアプリケーションを開発"
                  reward="開発されたアプリケーションの収益シェア"
                  difficulty="普通"
                  icon={<Zap className="h-6 w-6" />}
                  details="1. Difyプラットフォームの機能理解
2. AIアプリケーションの設計
3. プロトタイプの作成
4. ユーザーテストの実施
5. 改善と最適化
6. 本番環境へのデプロイ"
                />
              </CarouselItem>
              <CarouselItem>
                <QuestCard
                  title="Difyチャットボット開発"
                  description="カスタマーサポート用のAIチャットボットを開発"
                  reward="月間利用料の収益シェア"
                  difficulty="普通"
                  icon={<Zap className="h-6 w-6" />}
                  details="1. 要件定義とプランニング
2. チャットボットの設計
3. 対話シナリオの作成
4. テストと改善
5. 本番環境への展開
6. パフォーマンス分析"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        <div className="col-span-1">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <QuestCard
                  title="V0でのUI/UX改善"
                  description="V0のAI支援機能を活用したデザイン最適化"
                  reward="ユーザー満足度向上ボーナス"
                  difficulty="普通"
                  icon={<Edit className="h-6 w-6" />}
                  details="1. 現行UIの分析
2. V0による改善案生成
3. デザインの評価と選定
4. プロトタイプ作成
5. ユーザーテスト
6. 最終実装"
                />
              </CarouselItem>
              <CarouselItem>
                <QuestCard
                  title="V0デザインシステム構築"
                  description="V0を使用した新規デザインシステムの構築"
                  reward="採用実績に応じたボーナス"
                  difficulty="困難"
                  icon={<Edit className="h-6 w-6" />}
                  details="1. 要件収集と分析
2. デザインガイドライン作成
3. コンポーネント設計
4. プロトタイプ開発
5. ドキュメント作成
6. チーム研修の実施"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        <div className="col-span-1">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <QuestCard
                  title="Cursorでの開発効率化"
                  description="Cursorエディタを活用したコーディング効率の向上"
                  reward="生産性向上ボーナス"
                  difficulty="簡単"
                  icon={<Brain className="h-6 w-6" />}
                  details="1. Cursor機能の習得
2. ワークフロー最適化
3. チーム研修の実施
4. 効率測定と分析
5. ベストプラクティス共有
6. 継続的な改善"
                />
              </CarouselItem>
              <CarouselItem>
                <QuestCard
                  title="Cursorプラグイン開発"
                  description="カスタムCursorプラグインの開発と共有"
                  reward="ダウンロード数に応じたボーナス"
                  difficulty="普通"
                  icon={<Brain className="h-6 w-6" />}
                  details="1. プラグイン要件定義
2. 機能設計と実装
3. テストと改善
4. ドキュメント作成
5. 公開とフィードバック収集
6. 継続的なアップデート"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        <div className="col-span-1">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <QuestCard
                  title="Boltアプリ開発"
                  description="Boltを使用した業務効率化アプリケーションの開発"
                  reward="アプリ採用実績ボーナス"
                  difficulty="普通"
                  icon={<Zap className="h-6 w-6" />}
                  details="1. 要件定義と設計
2. プロトタイプ開発
3. テストと改善
4. ドキュメント作成
5. 展開とトレーニング
6. サポート体制構築"
                />
              </CarouselItem>
              <CarouselItem>
                <QuestCard
                  title="Boltワークフロー最適化"
                  description="既存のBoltワークフローの改善と自動化"
                  reward="効率化達成度ボーナス"
                  difficulty="困難"
                  icon={<Zap className="h-6 w-6" />}
                  details="1. 現行フロー分析
2. 改善案の策定
3. 自動化の実装
4. テストと検証
5. 移行計画の作成
6. チーム研修の実施"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}