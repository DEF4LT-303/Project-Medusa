import { getToken } from "@/lib/data"
import { revalidateTag } from "next/cache"

export async function logCustomerIn(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log(email, password)

  try {
    await getToken({ email, password }).then(() => {
      console.log("Customer logged in")
      revalidateTag("customer")
    })
  } catch (error: any) {
    return error.toString()
  }
}