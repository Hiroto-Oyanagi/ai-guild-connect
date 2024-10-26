import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">AIギルドへようこそ</h1>
        <p className="text-xl text-gray-600 mb-12">
          AIプログラマーと企業をつなぐマッチングプラットフォーム
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">AIプログラマー</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                あなたのAIスキルを活かして、革新的なプロジェクトに参加しませんか？
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate("/login?type=programmer")}
              >
                プログラマーとして参加
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">企業</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                優秀なAIプログラマーを見つけて、プロジェクトを成功に導きましょう。
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate("/login?type=company")}
              >
                企業として参加
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;