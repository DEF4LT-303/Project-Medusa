'use server';

import {
  StorePostAuthReq
} from "@medusajs/medusa";
import { cookies } from "next/headers";
import { cache } from "react";
import { medusaClient } from "../config";
import medusaError from "../util/medusa-error";

const getMedusaHeaders = (tags: string[] = []) => {
  const headers = {
    next: {
      tags,
    },
  } as Record<string, any>

  const token = cookies().get("_medusa_jwt")?.value

  if (token) {
    headers.authorization = `Bearer ${token}`
  } else {
    headers.authorization = ""
  }

  return headers
}

// User APIs
export async function getToken(credentials: StorePostAuthReq) {
  return medusaClient.auth
    .getToken(credentials, {
      next: {
        tags: ["auth"],
      },
    })
    .then(({ access_token }) => {
      access_token &&
        cookies().set("_medusa_jwt", access_token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        })
      return access_token
    })
    .catch((err) => {
      throw new Error("Wrong email or password.")
    })
}

export const getSession = cache(async function getSession() {
  const headers = getMedusaHeaders(["auth"])

  return medusaClient.auth
    .getSession(headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err))
})

export async function getCustomer() {
  const headers = getMedusaHeaders(["customer"])

  return medusaClient.customers
    .retrieve(headers)
    .then(({ customer }) => customer)
    .catch((err) => null)
}

// Product APIs
export async function getProducts() {
  const headers = getMedusaHeaders(["products"])

  return medusaClient.products
    .list(headers)
    .then(({ products }) => products)
    .catch((err) => medusaError(err))
}
