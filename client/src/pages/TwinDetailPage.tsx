import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface TwinDetail {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  attributes: any[];
  history: any[];
}

export default function TwinDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [twin, setTwin] = useState<TwinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [appGenerated, setAppGenerated] = useState(false);

  useEffect(() => {
    fetchTwin();
    checkAppStatus();
  }, [id]);

  const fetchTwin = async () => {
    try {
      const response = await axios.get(`/api/twins/${id}`);
      setTwin(response.data);
    } catch (error) {
      console.error('Failed to fetch twin:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAppStatus = async () => {
    try {
      const response = await axios.get(`/api/apps/${id}`);
      setAppGenerated(response.data.status === 'generated');
    } catch (error) {
      // App not generated yet
      setAppGenerated(false);
    }
  };

  const handleGenerateApp = async () => {
    setGenerating(true);
    try {
      await axios.post(`/api/apps/generate/${id}`);
      setAppGenerated(true);
      alert('アプリケーションが生成されました！');
    } catch (error: any) {
      console.error('Failed to generate app:', error);
      alert(error.response?.data?.error || '生成に失敗しました');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (!twin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">デジタルツインが見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/dashboard" className="text-primary-600 hover:text-primary-700">
              ← ダッシュボードに戻る
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{twin.name}</h1>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                {twin.category}
              </span>
            </div>
            {!appGenerated && (
              <button
                onClick={handleGenerateApp}
                disabled={generating}
                className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition disabled:opacity-50"
              >
                {generating ? '生成中...' : 'アプリを生成'}
              </button>
            )}
          </div>

          {twin.image_url && (
            <img
              src={twin.image_url}
              alt={twin.name}
              className="w-full max-w-md h-64 object-cover rounded-lg mb-6"
            />
          )}

          {twin.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">説明</h2>
              <p className="text-gray-700">{twin.description}</p>
            </div>
          )}

          {appGenerated && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">✓ アプリケーションが生成されました</p>
            </div>
          )}
        </div>

        {/* Attributes Section */}
        {twin.attributes && twin.attributes.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">属性</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {twin.attributes.map((attr) => (
                <div key={attr.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">{attr.attribute_name}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {attr.attribute_value || '未設定'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">型: {attr.data_type}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Section */}
        {twin.history && twin.history.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">履歴</h2>
            <div className="space-y-4">
              {twin.history.map((item) => (
                <div key={item.id} className="border-l-4 border-primary-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">{item.action_type}</div>
                      {item.action_details && (
                        <div className="text-sm text-gray-600 mt-1">
                          {JSON.parse(item.action_details).name || '詳細なし'}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleString('ja-JP')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

