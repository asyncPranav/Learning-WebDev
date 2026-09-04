import "dotenv/config";

// if (!process.env.MONGO_URI) {
//   throw new Error("MONGO_URI is not defined in the environment variables");
// }
// if (!process.env.JWT_TOKEN_SECRET) {
//   throw new Error(
//     "JWT_TOKEN_SECRET is not defined in the environment variables",
//   );
// }
// if (!process.env.REFRESH_TOKEN_SECRET) {
//   throw new Error(
//     "REFRESH_TOKEN_SECRET is not defined in the environment variables",
//   );
// }
// if (!process.env.PORT) {
//   throw new Error("PORT is not defined in the environment variables");
// }

const requiredEnv = [
  "MONGO_URI",
  "JWT_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "PORT",
  "API_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN",
  "GOOGLE_USER",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined in environment variables`);
  }
}

const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  apiUrl: process.env.API_URL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  googleUser: process.env.GOOGLE_USER,
};

export default config;
