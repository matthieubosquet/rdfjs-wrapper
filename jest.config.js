module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/test/.*\\.test\\.ts$",
  testRunner: "jest-circus/runner",
  testTimeout: 1000,
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
