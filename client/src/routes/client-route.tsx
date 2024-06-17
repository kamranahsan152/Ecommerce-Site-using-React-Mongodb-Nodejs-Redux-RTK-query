import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "../components/client/layout/layout";
import Register from "../components/client/auth/register";
import ResetPassword from "../components/client/auth/reset-password";
import Login from "../components/client/auth/login";
import ProductPage from "../components/client/layout/pages/product-page";
import ShoppingCart from "../components/client/layout/pages/cart-page";
import { paths } from "../paths";
import CheckoutSuccess from "../components/client/layout/pages/checkout-success";
import ProductDetail from "../components/client/layout/pages/product-detail";
import ClientPrivateRoute from "./clientroutes/privateroute";
import ClientPublicRoute from "./clientroutes/publicroute";

const ClientRouter = () => {
  return (
    <Routes>
      <Route path={paths.client.index} element={<Layout />} />
      <Route
        element={
          <ClientPublicRoute>
            <Outlet />
          </ClientPublicRoute>
        }
      >
        <Route path={paths.client.login} element={<Login />} />
        <Route path={paths.client.register} element={<Register />} />
        <Route path={paths.client.resetpassword} element={<ResetPassword />} />
      </Route>
      <Route
        element={
          <ClientPrivateRoute requiredRole="user">
            <Outlet />
          </ClientPrivateRoute>
        }
      >
        <Route path={paths.client.productpage} element={<ProductPage />} />
        <Route path={paths.client.cart} element={<ShoppingCart />} />
        <Route path={paths.client.productbyId} element={<ProductDetail />} />
        <Route path={paths.client.success} element={<CheckoutSuccess />} />
      </Route>
    </Routes>
  );
};

export default ClientRouter;
