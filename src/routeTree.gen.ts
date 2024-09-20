/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as GamesIndexImport } from './routes/games/index'
import { Route as GamesCreateImport } from './routes/games/create'
import { Route as GamesGameIdImport } from './routes/games/$gameId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const GamesIndexRoute = GamesIndexImport.update({
  path: '/games/',
  getParentRoute: () => rootRoute,
} as any)

const GamesCreateRoute = GamesCreateImport.update({
  path: '/games/create',
  getParentRoute: () => rootRoute,
} as any)

const GamesGameIdRoute = GamesGameIdImport.update({
  path: '/games/$gameId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/games/$gameId': {
      id: '/games/$gameId'
      path: '/games/$gameId'
      fullPath: '/games/$gameId'
      preLoaderRoute: typeof GamesGameIdImport
      parentRoute: typeof rootRoute
    }
    '/games/create': {
      id: '/games/create'
      path: '/games/create'
      fullPath: '/games/create'
      preLoaderRoute: typeof GamesCreateImport
      parentRoute: typeof rootRoute
    }
    '/games/': {
      id: '/games/'
      path: '/games'
      fullPath: '/games'
      preLoaderRoute: typeof GamesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/games/$gameId': typeof GamesGameIdRoute
  '/games/create': typeof GamesCreateRoute
  '/games': typeof GamesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/games/$gameId': typeof GamesGameIdRoute
  '/games/create': typeof GamesCreateRoute
  '/games': typeof GamesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/games/$gameId': typeof GamesGameIdRoute
  '/games/create': typeof GamesCreateRoute
  '/games/': typeof GamesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/games/$gameId' | '/games/create' | '/games'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/games/$gameId' | '/games/create' | '/games'
  id: '__root__' | '/' | '/games/$gameId' | '/games/create' | '/games/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  GamesGameIdRoute: typeof GamesGameIdRoute
  GamesCreateRoute: typeof GamesCreateRoute
  GamesIndexRoute: typeof GamesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  GamesGameIdRoute: GamesGameIdRoute,
  GamesCreateRoute: GamesCreateRoute,
  GamesIndexRoute: GamesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/games/$gameId",
        "/games/create",
        "/games/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/games/$gameId": {
      "filePath": "games/$gameId.tsx"
    },
    "/games/create": {
      "filePath": "games/create.tsx"
    },
    "/games/": {
      "filePath": "games/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
