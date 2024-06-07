'use server';

import { createCustomer, getToken } from "@/lib/data";
import { StorePostCustomersReq } from "@medusajs/medusa";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function signUp(_currentState: unknown, formData: FormData) {
  const customer = {
    email: formData.get("email"),
    password: formData.get("password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone: formData.get("phone"),
  } as StorePostCustomersReq

  try {
    await createCustomer(customer)
    await getToken({ email: customer.email, password: customer.password }).then(
      () => {
        revalidateTag("customer")
      }
    )
  } catch (error: any) {
    return error.toString()
  }
}

export async function logCustomerIn(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await getToken({ email, password }).then(() => {
      revalidateTag("customer")
      console.log("Customer logged in")
    })
  } catch (error: any) {
    return error.toString()
  }
}

export async function signOut(countrycode: string) {
  cookies().set("_medusa_jwt", "", {
    maxAge: -1,
  })
  revalidateTag("auth")
  revalidateTag("customer")

}