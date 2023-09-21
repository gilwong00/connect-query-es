// Copyright 2021-2023 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import "./index.css";

import type { Transport } from "@connectrpc/connect";
import { TransportProvider } from "@connectrpc/connect-query";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import * as ReactDOM from "react-dom/client";

import { ServerStreaming } from "./server-streaming-example";
import { UnaryExample } from "./unary-example";

const queryClient = new QueryClient();

/**
 * The application root
 */
export default function App({ transport }: { transport?: Transport }) {
  const finalTransport =
    transport ??
    createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
    });
  const [exampleShown, setExampleShown] = useState<"serverStreaming" | "unary">(
    "unary",
  );
  return (
    <TransportProvider transport={finalTransport}>
      <QueryClientProvider client={queryClient}>
        <button
          onClick={() => {
            setExampleShown("unary");
          }}
        >
          Show Unary
        </button>
        <button
          onClick={() => {
            setExampleShown("serverStreaming");
          }}
        >
          Show Server Streaming
        </button>
        {exampleShown === "unary" ? <UnaryExample /> : <ServerStreaming />}
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </TransportProvider>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
