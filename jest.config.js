/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/tests/.*.test.ts",
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/", "/exmaples/"],
  collectCoverage: true,
  coverageThreshold: {
    "./src/**/*.ts": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
