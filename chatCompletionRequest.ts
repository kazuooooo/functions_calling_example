import { FunctionObject, Message } from "./types.ts"

const API_KEY = Deno.env.get("OPENAI_API_KEY")

export async function chatCompletionRequest(
  messages: Message[],
  functions: FunctionObject[],
  function_call: "auto" | { name: string } = "auto"
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  }

  const jsonData = {
    model: "gpt-3.5-turbo-0613",
    messages,
    functions,
    function_call,
  }

  console.log("Req: jsonData", jsonData)
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(jsonData),
    })

    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (e) {
    console.log("Unable to generate ChatCompletion response")
    console.log(`Exception: ${e}`)
    throw e
  }
}
