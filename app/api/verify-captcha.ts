import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Token is required",
    });
  }

  try {
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "";

    const response = await fetch(
      "https://smartcaptcha.cloud.yandex.ru/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.SMART_CAPTCHA_SECRET_KEY!,
          token: token,
          ip: ip,
        }).toString(),
      },
    );

    const data = await response.json();

    if (data.status === "ok") {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid captcha",
        details: data.error,
      });
    }
  } catch (error) {
    console.error("Captcha verification error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
