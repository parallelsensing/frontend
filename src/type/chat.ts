export enum MessageType {
  User = 'user',
  Chatgpt = 'chatgpt',
}

export type Message = {
  id: string;
  type: MessageType;
  content?: string;
  loading?: boolean;
  error?: {
    msg?: string;
  };
};

export type ApiResponseType<T> = {
  code: number;
  data: T;
  message: string;
};
