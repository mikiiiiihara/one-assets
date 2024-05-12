export type CryptoModel = {
  /**
   * 一意の識別子
   */
  id: string;
  /**
   * ティッカーコード
   */
  code: string;
  /**
   * 現在の株価
   */
  getPrice: number;
  /**
   * 保有数量
   */
  quantity: number;
  /**
   * 現在価格
   */
  currentPrice: number;
};
