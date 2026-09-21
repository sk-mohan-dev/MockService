const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR =
  process.env.MOCK_DATA_DIR ||
  "/Users/selvakumar.mohan/VSCode/BCCI/Fixtures-Results/test-sim2";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
};

const routes = new Map([
  ["/match/fixtures", handleFixtures],
  ["/fixtures", handleFixtures],
  ["/match/results", handleResults],
  ["/results", handleResults],
  ["/match/live_scores", handleLiveScores],
  ["/match/live_score", handleLiveScores],
  ["/live_scores", handleLiveScores],
  ["/live_score", handleLiveScores],
]);

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method !== "GET") {
    sendJson(response, 405, {
      error: "Method not allowed",
      method: request.method,
    });
    return;
  }

  if (url.pathname === "/health") {
    sendJson(response, 200, {
      ok: true,
      dataDir: DATA_DIR,
    });
    return;
  }

  const routeHandler = routes.get(url.pathname);

  if (!routeHandler) {
    sendJson(response, 404, {
      error: "Not found",
      path: url.pathname,
    });
    return;
  }

  try {
    const payload = await routeHandler(url);
    response.writeHead(200, JSON_HEADERS);
    response.end(payload);
  } catch (error) {
    sendJson(response, 500, {
      error: "Failed to read mock response",
      message: error.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`MockService listening on http://localhost:${PORT}`);
  console.log(`Reading data from ${DATA_DIR}`);
});

async function handleFixtures() {
  return readJsonFile("fixtures.json");
}

async function handleResults() {
  return readJsonFile("results.json");
}

async function handleLiveScores(url) {
  const compIds = url.searchParams.getAll("comp_id");
  const mode = url.searchParams.get("mode");
  return readJsonFile("live_score_in.json")

  // if (mode === "poll") {
  //   return readJsonFile("live_score_poll.json");
  // }

  // if (mode === "in") {
  //   return readJsonFile("live_score_in.json");
  // }

  // return readJsonFile(compIds.length <= 1 ? "live_score_in.json" : "live_score_poll.json");
}

async function readJsonFile(fileName) {
  return fs.readFile(path.join(DATA_DIR, fileName), "utf8");
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, JSON_HEADERS);
  response.end(JSON.stringify(body, null, 2));
}
