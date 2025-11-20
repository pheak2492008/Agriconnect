import dotenv from "dotenv";
dotenv.config();

import { createServer } from "./server";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    const app = await createServer();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
