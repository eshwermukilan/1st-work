import { createBrowserRouter } from "react-router";
import { createElement } from "react";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Orders } from "./pages/Orders";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const ProtectedCheckout = () => createElement(ProtectedRoute, null, createElement(Checkout));
const ProtectedOrders = () => createElement(ProtectedRoute, null, createElement(Orders));
const ProtectedProfile = () => createElement(ProtectedRoute, null, createElement(Profile));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: ProtectedCheckout },
      { path: "orders", Component: ProtectedOrders },
      { path: "profile", Component: ProtectedProfile },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "*", Component: NotFound },
    ],
  },
]);