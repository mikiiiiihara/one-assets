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
   * 現在価格
   */
  currentPrice: number;
  /**
   * 変化額
   */
  priceGets: number;
  /**
   * 変化率
   */
  currentRate: number;
  /**
   * １年当たり配当
   */
  dividends: Dividend[];
};

type Dividend = {
  /**
   * 配当権利落日
   */
  fixedDate: Date;
  /**
   * 配当支払日
   */
  paymentDate: Date;
  /**
   * 配当金額
   */
  price: number;
};
