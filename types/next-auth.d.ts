// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  /**
   * 既存のセッションモデルの型を拡張します。
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      image?: string | null;
    };
  }
}
