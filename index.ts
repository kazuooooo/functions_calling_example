import { chatCompletionRequest } from "./chatCompletionRequest.ts";
import { Conversation } from "./conversation.ts";
import { CompletionAPIResponse, FunctionObject } from "./types.ts";
import { getWeather } from "./waatherApi.ts";

// 関数の定義
const functions: FunctionObject[] = [
  {
    name: "get_weather",
    description: "指定された場所と日付の天気を取得する",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "都道府県や市、町の名前, e.g. 東京都文京区",
        },
        date: {
          type: "string",
          description: "Date formatted in YYYY/mm/dd, e.g. 2023/06/13",
        },
      },
      required: ["location", "date"],
    },
  },
];

const conversation = new Conversation();
conversation.addMessage("user", "明日の東京の天気わかりますか？");

const firstResponse: CompletionAPIResponse = await chatCompletionRequest(
  conversation.messages,
  functions
);

console.log("firstResponse", firstResponse);

if (firstResponse.choices[0].finish_reason === "function_call") {
  const functionCall = firstResponse.choices[0].message.function_call;
  const { location, date } = JSON.parse(functionCall.arguments);
  console.log();
  const weather = await getWeather(location, date);
  conversation.addMessage(
    "function",
    JSON.stringify(weather),
    functionCall.name
  );

  const secondResponse: CompletionAPIResponse = await chatCompletionRequest(
    conversation.messages,
    functions
  );
  console.log("secondResponse", secondResponse);
}
