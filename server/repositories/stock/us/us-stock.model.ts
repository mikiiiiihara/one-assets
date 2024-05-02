export type UsStockModel = {
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
   * セクター
   */
  sector: string;
  /**
   * USD/JPY為替レート
   */
  usdjpy: number;
  /**
   * 保有ユーザーのID
   */
  userId: string;
};
