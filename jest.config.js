/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: [
    "<rootDir>/src/"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.spec.ts',
  ],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@usecase/(.*)": "<rootDir>/src/usecase/$1",
    "@service/(.*)": "<rootDir>/src/service/$1",
    "@repository/(.*)": "<rootDir>/src/repository/$1",
    "@presentation/(.*)": "<rootDir>/src/presentation/$1"
  },
};