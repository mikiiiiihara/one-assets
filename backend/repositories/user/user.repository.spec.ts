import * as PrismaClient from "@backend/lib/prisma-client";
import { findById } from "./user.repository";

// モックのセットアップを行う
jest.mock("@backend/lib/prisma-client", () => ({
  __esModule: true, // ESModuleとして扱うために必要
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

// TypeScriptで型を明示的にキャストする
const mockFindUnique = PrismaClient.default.user
  .findUnique as jest.MockedFunction<
  typeof PrismaClient.default.user.findUnique
>;

describe("findById", () => {
  // 各テストの前にモックをリセットする
  beforeEach(() => {
    mockFindUnique.mockReset();
  });

  // 各テスト後にモックのクリーンアップを行う
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data if user exists", async () => {
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      emailVerified: null, // Date型またはnull
      image: null, // string型またはnull
      createdAt: new Date(), // Date型
      updatedAt: new Date(), // Date型
    };

    mockFindUnique.mockResolvedValue(mockUser);

    const result = await findById("1");
    expect(result).toEqual({ name: "John Doe", email: "john@example.com" });
  });

  it("should throw an error if user does not exist", async () => {
    mockFindUnique.mockResolvedValue(null);
    await expect(findById("999")).rejects.toThrow("User not found");
  });
});
