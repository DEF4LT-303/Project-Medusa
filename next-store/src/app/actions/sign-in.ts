'use server';

import { getToken } from "@/lib/data";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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