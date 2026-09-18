import { app, bootstrap } from "./app.bootstrap.js";

// Initialize DB + middlewares, then start server or export handler
const initPromise = bootstrap().catch((err) => {
  console.error("Bootstrap failed:", err.message || err);
  process.exit(1);
});

// Local development: start the HTTP server
if (process.env.VERCEL !== "1") {
  const port = process.env.PORT || 3000;
  initPromise.then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
}

// Vercel: export the app as the default serverless handler
export default async (req, res) => {
  await initPromise;
  app(req, res);
};