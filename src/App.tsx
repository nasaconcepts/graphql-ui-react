import { ApolloProvider } from "@apollo/client";
import PlayersBoard from "./components/PlayersBoard";

import { apolloClient } from "../src/components/ApolloClient";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <PlayersBoard />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
