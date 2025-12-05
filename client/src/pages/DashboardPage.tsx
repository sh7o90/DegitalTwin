import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface DigitalTwin {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [twins, setTwins] = useState<DigitalTwin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTwins();
  }, []);

  const fetchTwins = async () => {
    try {
      const response = await axios.get('/api/twins');
      setTwins(response.data);
    } catch (error) {
      console.error('Failed to fetch twins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('このデジタルツインを削除しますか？')) return;

    try {
      await axios.delete(`/api/twins/${id}`);
      fetchTwins();
    } catch (error) {
      console.error('Failed to delete twin:', error);
      alert('削除に失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">Digital Twin Generator</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">こんにちは、{user?.name}さん</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">デジタルツイン一覧</h2>
          <Link
            to="/twin/new"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-md"
          >
            + 新しいデジタルツインを作成
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">読み込み中...</div>
          </div>
        ) : twins.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">まだデジタルツインがありません</p>
            <Link
              to="/twin/new"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              最初のデジタルツインを作成
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {twins.map((twin) => (
              <div key={twin.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {twin.image_url && (
                  <img
                    src={twin.image_url}
                    alt={twin.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{twin.name}</h3>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      {twin.category}
                    </span>
                  </div>
                  {twin.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{twin.description}</p>
                  )}
                  <div className="flex gap-2">
                    <Link
                      to={`/twin/${twin.id}`}
                      className="flex-1 text-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                    >
                      詳細を見る
                    </Link>
                    <button
                      onClick={() => handleDelete(twin.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

