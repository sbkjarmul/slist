export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$":
      "<rootDir>/src/tests/unit/presentation/mocks/file.mock.ts",
    "\\.(css|scss|less)$":
      "<rootDir>/src/tests/unit/presentation/mocks/style.mock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
