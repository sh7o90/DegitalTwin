import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">Digital Twin Generator</h1>
            <div className="flex gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  ダッシュボード
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-primary-600 hover:text-primary-700 transition"
                  >
                    ログイン
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                  >
                    今すぐ始める
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            AIと協働してデジタルツインを作成
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            あなたの所有する現実世界のモノをデジタル空間で再現し、
            AIとの対話を通じて専用のWebアプリケーションを自動生成します。
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-accent-600 text-white text-lg font-semibold rounded-lg hover:bg-accent-700 transition shadow-lg"
            >
              今すぐ始める
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          主な機能
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold mb-2">対象物の登録</h4>
            <p className="text-gray-600">
              コーヒーメーカー、楽器、植物など、あなたの所有するモノの情報を簡単に入力できます。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-xl font-semibold mb-2">AI自動生成</h4>
            <p className="text-gray-600">
              AIがあなたの入力に基づいて、データモデルとWebアプリケーションを自動的に生成します。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-semibold mb-2">データ管理</h4>
            <p className="text-gray-600">
              生成されたアプリで、対象物の状態、履歴、属性を管理できます。
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          AI協働開発プロセス
        </h3>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">対象物の登録と要件定義</h4>
                <p className="text-gray-600">
                  デジタルツイン化したい対象物の名前、カテゴリ、属性、追跡したいデータを入力します。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Webアプリケーションの自動生成</h4>
                <p className="text-gray-600">
                  AIがデータモデルと機能リストを生成し、フロントエンドとバックエンドのコードを自動生成します。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">デバッグと調整</h4>
                <p className="text-gray-600">
                  生成されたアプリを実行し、AIに修正を指示して、要件に合わせて調整します。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">公開と共有</h4>
                <p className="text-gray-600">
                  完成したアプリケーションを他者と共有したり、ポートフォリオに含めたりできます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Digital Twin App Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

