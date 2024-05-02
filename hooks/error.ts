import { NextRouter } from "next/router";

const handleApiError = async (
  response: Response, // ビルトイン型なのでインポート不要
  setError: (message: string) => void, // 関数型なのでインポート不要
  router: NextRouter // next/router からインポート
) => {
  console.error(response);
  if (response.status === 401) {
    router.push("/login");
    return;
  }
  const message = `HTTP error! status: ${response.status}`;
  setError(message);
};

export default handleApiError;
