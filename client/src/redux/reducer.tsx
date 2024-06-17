import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetToken } from "../types/global";
import { paths } from "../paths";

export const api = createApi({
  reducerPath: "adminAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${paths.BASE_URL}api/v1`,
    prepareHeaders: (headers) => {
      const token = GetToken();
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
    userInfo: builder.query<any, any>({
      query: () => `me`,
    }),
    allproducts: builder.query<any, any>({
      query: () => "allproducts",
    }),
    allusers: builder.query<any, any>({
      query: () => "allusers",
    }),
    allorders: builder.query<any, any>({
      query: () => "allorders",
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ body, id }) => ({
        url: `update-product/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
    addProduct: builder.mutation({
      query: ({ body }) => ({
        url: "add-product",
        method: "POST",
        body: body,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, orderStatus }) => ({
        url: `order-deliver/${id}`,
        method: "PUT",
        body: orderStatus,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUserInfoQuery,
  useAllproductsQuery,
  useAllusersQuery,
  useAllordersQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddProductMutation,
  useUpdateOrderMutation,
  useDeleteUserMutation,
} = api;
