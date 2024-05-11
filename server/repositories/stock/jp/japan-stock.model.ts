export type JapanStockModel = {
  /**
   * 一意の識別子
   */
  id: string;
  /**
   * ティッカーコード
   */
  code: string;
  /**
   * 銘柄名
   */
  name: string;
  /**
   * 現在の株価
   */
  getPrice: number;
  /**
   * 保有数量
   */
  quantity: number;
  /**
   * セクター
   */
  sector: string;
  /**
   * 現在価格
   */
  currentPrice: number;
  /**
   * １年当たり配当
   */
  dividends: number;
};
