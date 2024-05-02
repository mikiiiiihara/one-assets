module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    // Next.jsのCSSモジュールのモッキング
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@server/(.*)$": "<rootDir>/server/$1",
    "^@frontend/(.*)$": "<rootDir>/frontend/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
  },
};
