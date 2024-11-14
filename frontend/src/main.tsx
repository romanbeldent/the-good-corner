import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import App from "./App.tsx";
import { API_URL } from "./config";
import "./index.css";

console.log("API URL: ", API_URL);

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query AllAds {
  AllAds {
    id
    title
    description
    owner
    price
    location
    createdAt
  }
}
    `,
  })
  .then((result) => console.log(result));

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode >
  </ApolloProvider>
);
