import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("watermelon", "routes/watermelon.tsx"),
  route("steyberry", "routes/steyberry.tsx")
] satisfies RouteConfig;
