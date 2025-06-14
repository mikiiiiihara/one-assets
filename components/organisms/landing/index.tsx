import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@components/atoms/button";
import { GoogleLoginButton } from "@components/molecules/social-login-button/google-login-button";
import { LineLoginButton } from "@components/molecules/social-login-button/line-login-button";

const Component = () => {
  const router = useRouter();

  const features = [
    {
      title: "多様な資産管理",
      description: "株式、暗号通貨、債券、現金など、あらゆる資産を一元管理",
      icon: "📊",
    },
    {
      title: "リアルタイム価格更新",
      description: "Yahoo Finance連携による最新の市場価格を自動取得",
      icon: "💹",
    },
    {
      title: "詳細な分析機能",
      description: "セクター別分析、配当管理、パフォーマンス追跡",
      icon: "📈",
    },
    {
      title: "セキュアな認証",
      description: "GoogleとLINEによる安全なソーシャルログイン",
      icon: "🔒",
    },
  ];

  const assetTypes = [
    { name: "米国株式", example: "AAPL, GOOGL, TSLA" },
    { name: "日本株式", example: "7203, 9984, 6758" },
    { name: "暗号通貨", example: "BTC, ETH, XRP" },
    { name: "投資信託", example: "国内・海外ファンド" },
    { name: "債券", example: "国債、社債" },
    { name: "現金", example: "複数通貨対応" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">One Assets</h1>
          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
            size="md"
          >
            ログイン
          </Button>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            すべての資産を
            <span className="gradient-text block mt-2">ひとつの場所で管理</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up">
            One
            Assetsは、株式、暗号通貨、債券など、あらゆる資産を統合的に管理できる
            次世代のポートフォリオ管理サービスです。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <GoogleLoginButton
              onClick={() => signIn("google")}
              text="Googleで始める"
            />
            <LineLoginButton
              onClick={() => signIn("line")}
              text="LINEで始める"
            />
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">One Assets</span>の特徴
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 対応資産タイプ */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-dark-900/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            対応する<span className="gradient-text">資産タイプ</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {assetTypes.map((asset, index) => (
              <div
                key={index}
                className="glass rounded-lg p-4 hover:border-primary/30 transition-all duration-300"
              >
                <h4 className="font-semibold text-white mb-1">{asset.name}</h4>
                <p className="text-sm text-gray-400">{asset.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* スクリーンショットセクション */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            直感的な<span className="gradient-text">ダッシュボード</span>
          </h3>
          <div className="max-w-6xl mx-auto">
            <div className="card p-2 glass overflow-hidden">
              {/* ブラウザ風のヘッダー */}
              <div className="bg-dark-800/50 p-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-dark-700/50 rounded-md px-4 py-1 text-xs text-gray-400 min-w-[200px] text-center">
                    one-assets.app
                  </div>
                </div>
              </div>

              {/* ダッシュボードのモックアップ */}
              <div className="p-6 bg-dark-950/30">
                {/* ヘッダー部分 */}
                <div className="card p-6 mb-8 bg-dark-900/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        M
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-white">
                          One Assets
                        </h1>
                        <p className="text-gray-400 text-sm">
                          Mickeyとしてログイン中
                        </p>
                      </div>
                    </div>
                    <nav className="flex gap-3">
                      <div className="px-4 py-2 bg-gradient-primary text-white rounded-lg text-sm">
                        資産推移
                      </div>
                      <div className="px-4 py-2 text-primary-400 text-sm">
                        ポートフォリオ
                      </div>
                    </nav>
                  </div>
                </div>

                {/* 期間フィルター */}
                <div className="card p-6 mb-8 bg-dark-900/50">
                  <h2 className="text-xl font-bold gradient-text mb-4">
                    期間フィルター
                  </h2>
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <label className="form-label">開始日</label>
                      <div className="h-10 bg-dark-800/70 border border-white/10 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <label className="form-label">終了日</label>
                      <div className="h-10 bg-dark-800/70 border border-white/10 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-20 bg-gradient-primary rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* 資産推移セクション */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold gradient-text mb-4">
                    資産推移
                  </h2>
                  <h1 className="text-xl mb-2">
                    現在の資産総額：¥
                    <span className="text-2xl">12,345,678</span>
                  </h1>
                  <p className="text-green-400 mb-1">
                    トータルリターン:¥+1,234,567(+11.11%)
                  </p>
                  <p className="text-green-400 mb-6">前日比:¥+23,456(+0.19%)</p>

                  {/* グラフカード */}
                  <div className="card p-6 mb-6 bg-dark-900/50">
                    <div className="relative h-64">
                      {/* グラフの波形 */}
                      <svg className="w-full h-full" viewBox="0 0 400 200">
                        <defs>
                          <linearGradient
                            id="areaGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="rgb(30, 204, 158)"
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="100%"
                              stopColor="rgb(30, 204, 158)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        {/* 上昇トレンドのライン */}
                        <path
                          d="M 0,160 Q 80,140 160,120 T 320,80 Q 360,70 400,60"
                          fill="none"
                          stroke="rgb(30, 204, 158)"
                          strokeWidth="2"
                        />
                        <path
                          d="M 0,160 Q 80,140 160,120 T 320,80 Q 360,70 400,60 L 400,200 L 0,200 Z"
                          fill="url(#areaGradient)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-8">
              リアルタイムで資産の推移を確認し、ポートフォリオを最適化
            </p>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="card glass p-12 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              今すぐ<span className="gradient-text">無料</span>で始める
            </h3>
            <p className="text-gray-400 mb-8">
              アカウント登録は簡単。今すぐ資産管理を始めましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GoogleLoginButton
                onClick={() => signIn("google")}
                text="Googleアカウントで登録"
              />
              <LineLoginButton
                onClick={() => signIn("line")}
                text="LINEアカウントで登録"
              />
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 One Assets. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

Component.displayName = "Landing";
export const Landing = React.memo(Component);
