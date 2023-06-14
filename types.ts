type FunctionParameterProperty = {
  type: string;
  description: string;
  enum?: string[];
};

type FunctionParameters = {
  type: string;
  properties: {
    [key: string]: FunctionParameterProperty;
  };
  required: string[];
};

export type FunctionObject = {
  name: string;
  description: string;
  parameters: FunctionParameters;
  function_call?: string;
};

export type Role = "system" | "user" | "assistant" | "function";
export type Message = { role: Role; content: string; name?: string };

export type CompletionAPIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: Role;
      content: null | string;
      function_call: {
        name: string;
        arguments: string;
      };
    };
    finish_reason: "function_call" | "stop";
  }[];
};

export type WeatherAPIResponse = {
  date: string;
  location: string;
  weather: string;
};
