import { chatCompletionRequest } from "./chatCompletionRequest.ts"
import { Conversation } from "./conversation.ts"
import { CompletionAPIResponse, FunctionObject } from "./types.ts"

type Book = {
  title: string
  description: string
}

const functions: FunctionObject[] = [
  {
    name: "recommend_book",
    description: "おすすめの本を1冊紹介する",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "本のタイトル",
        },
        description: {
          type: "string",
          description: "本の内容",
        },
      },
      required: ["title", "description"],
    },
  },
]
const conversation = new Conversation()
conversation.addMessage(
  "user",
  "悩めるウォンバットにおすすめの本を教えてください。"
)

const response: CompletionAPIResponse = await chatCompletionRequest(
  conversation.messages,
  functions,
  { name: "recommend_book" }
)

console.log("response", response)

const functionCall = response.choices[0].message.function_call
const bookJSON = JSON.parse(functionCall.arguments)
console.log(bookJSON)
// {
//   title: "幸せになるためのウォンバットの道",
//   description: "ウォンバットのための幸せの秘訣を紹介した本です。幸せなウォンバットになるための心の持ち方や行動のコツが詳しく解説されています。是非読んでみてください！"
// }
