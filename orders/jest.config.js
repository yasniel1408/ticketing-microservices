module.exports = {
  roots: ["<rootDir>/"],
  modulePaths: ["node_modules", "<rootDir>/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/test/setup.ts"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: 80
    },
    "./src/**/*.ts": {
      lines: 80,
    },
  },
};
