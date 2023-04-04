// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  testRunner_comment:
    "Take a look at https://stryker-mutator.io/docs/stryker-js/jest-runner for information about the jest plugin.",
  coverageAnalysis: "perTest",
  checkers: ["typescript"],
  tsconfigFile: "tsconfig.json",
  typescriptChecker: {
    prioritizePerformanceOverAccuracy: true,
  },
  compilerOptions: {
    allowUnreachableCode: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
  },
};
export default config;
