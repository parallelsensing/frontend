export interface MessageNew {
    id: string;
    chatId: string;
    text: string;
    htmlText?: string;
    type: string;
    avatar: string;
    message_id: string;
}

export interface Chat {
    id: number;
    conversation_id: string;
    name: string;
    created_at: number;
    title: string;
    inputs: any;
    introduction: string;
    status: string;
}

export interface ListItem {
    id: number;
    title: string;
    subtitle: string;
    API_KEY: string;
    image: string;
    questions: string[];
}