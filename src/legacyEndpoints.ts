import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Transports } from "./transports.js";

export function setupLegacyEndpoints(
  app: express.Application,
  server: McpServer,
  transports: Transports
) {
  // Legacy SSE endpoint for older clients
  app.get("/sse", async (req, res) => {
    // Create SSE transport for legacy clients
    console.log("sse route");
    const transport = new SSEServerTransport("/messages", res);
    transports.sse[transport.sessionId] = transport;

    res.on("close", () => {
      delete transports.sse[transport.sessionId];
    });

    res.setHeader("Access-Control-Expose-Headers", transport.sessionId);
    await server.connect(transport);
  });

  // Legacy message endpoint for older clients
  app.post("/messages", async (req, res) => {
    console.log("messages route");
    const sessionId = req.query.sessionId as string;
    const transport = transports.sse[sessionId];
    if (transport) {
      await transport.handlePostMessage(req, res, req.body);
    } else {
      res.status(400).send("No transport found for sessionId");
    }
  });
}
