export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$":
      "<rootDir>/tests/unit/presentation/mocks/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
