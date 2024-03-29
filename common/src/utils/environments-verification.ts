class EnvironmentsVerification {
  isTest = () => process.env.NODE_ENV === "test";
  isDevelopment = () => process.env.NODE_ENV === "development";
  isProduction = () => process.env.NODE_ENV === "production";
}

export default new EnvironmentsVerification();
