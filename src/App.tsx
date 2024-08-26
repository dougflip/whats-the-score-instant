import "./App.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
});

/**
 * This provides typing for the router across the app.
 * https://tanstack.com/router/latest/docs/framework/react/guide/type-safety#exported-hooks-components-and-utilities
 */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
