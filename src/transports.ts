import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

export type Transports = {
  streamable: Record<string, StreamableHTTPServerTransport>;
  sse: Record<string, SSEServerTransport>;
};

// Store transports for each session type
export const transports: Transports = {
  streamable: {},
  sse: {},
};
