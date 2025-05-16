import express from "express";
import dotenv from "dotenv";
dotenv.config();
import server from "./mcpServer";
import { setupLegacyEndpoints } from "./legacyEndpoints";
import { transports } from "./transports";
import { streamableEndpoints } from "./streamableEndpoints";

const app = express();
app.use(express.json());

// Handle POST requests for client-to-server communication
streamableEndpoints(app, server, transports);

// Setup legacy endpoints
setupLegacyEndpoints(app, server, transports);

const serverIp = process.env.SERVER_IP || "0.0.0.0";
const serverPort = parseInt(process.env.SERVER_PORT || "3010", 10);

app.listen(serverPort, serverIp, () => {
  console.log(`MCP Server listening on ${serverIp}:${serverPort}`);
});
