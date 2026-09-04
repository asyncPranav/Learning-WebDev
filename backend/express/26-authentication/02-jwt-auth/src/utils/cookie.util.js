const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // Set to true in production
    sameSite: "strict", // strict does not allow cross-site requests, while lax allows some cross-site requests
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  });
};

const clearRefreshTokenCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true, // Set to true in production
    sameSite: "strict", // strict does not allow cross-site requests, while lax allows some cross-site requests
    path: "/api/auth", // Ensure the path matches where the cookie was set
  });
};

export { setRefreshTokenCookie, clearRefreshTokenCookie };
