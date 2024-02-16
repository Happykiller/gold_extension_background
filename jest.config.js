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
    "@usecase/(.*)": "<rootDir>/src/usecases/$1",
    "@service/(.*)": "<rootDir>/src/services/$1",
    "@repository/(.*)": "<rootDir>/src/repository/$1",
    "@presentation/(.*)": "<rootDir>/src/presentation/$1"
  },
};