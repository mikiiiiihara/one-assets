export type JapanFundModel = {
  id: string;
  /**
   * 投資信託名（自分で自由に付けられる）
   */
  name: string;
  /**
   * コード
   */
  code: string;
  /**
   * 取得総額
   */
  getPriceTotal: number;
  /**
   * 取得価格
   */
  getPrice: number;
  /**
   * 現在価格
   */
  currentPrice: number;
};
