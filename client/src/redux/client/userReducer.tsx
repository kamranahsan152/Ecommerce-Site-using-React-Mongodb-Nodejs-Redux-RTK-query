import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useToken } from "../../types/global";
import { paths } from "../../paths";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${paths.BASE_URL}api/v1`,
    prepareHeaders: (headers) => {
      const token = useToken();
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    Register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "reset-password",
        method: "POST",
        body,
      }),
    }),
    userData: builder.query({
      query: () => "me",
    }),
    products: builder.query<any, any>({
      query: () => "allproducts",
    }),
    productbyId: builder.query({
      query: ({ id }) => `product-detail/${id}`,
    }),
    Order: builder.mutation({
      query: (body) => ({
        url: "orders",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUserDataQuery,
  useProductsQuery,
  useProductbyIdQuery,
  useOrderMutation,
} = userAPI;
