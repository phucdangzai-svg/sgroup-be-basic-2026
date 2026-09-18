import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    const result = await authService.register({
      fullName,
      email,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//logout
export const logout = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("Access Token is required");
      error.statusCode = 401;
      throw error;
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      const error = new Error("Invalid Authorization header");
      error.statusCode = 401;
      throw error;
    }

    await authService.logout(token);

    return res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (err) {
    next(err);
  }
};
// cap access token
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const error = new Error("Refresh Token is required");
      error.statusCode = 401;
      throw error;
    }

    const accessToken = await authService.refreshAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      data: {
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};
