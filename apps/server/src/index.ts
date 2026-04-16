import dotenv from "dotenv";
import path from "path";
import { app } from "./app";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = Number(process.env.PORT || 3001);
const provider = process.env.AI_PROVIDER || "mock";

app.listen(port, () => {
  console.log(`server ready on http://localhost:${port} (ai: ${provider})`);
});
