import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "OTC MCP Server",
  version: "1.0.1",
});

const apiServer = process.env.API_SERVER_TOOLS;

server.tool("getProductCategories", "Get product categories", async () => {
  const response = await fetch(`${apiServer}/api/v1/category`);
  const categories = await response.json();
  return {
    content: [{ type: "text", text: JSON.stringify(categories) }],
  };
});

export default server;
