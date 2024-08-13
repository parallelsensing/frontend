import createRequest from "@/utils/fetchRequest ";

enum API {
    CONVERSATIONS_URL = "/conversations",
    MESSAGES_URL = "/messages",
    SENDMESSAGE_URL = "/chat-messages",
    UPLOAD_URL = "/files/upload",
}
const request = createRequest();

/**获取会话列表 */
export const converListMessage = async (userId: string, API_KEY: string): Promise<any> => {
    const endpoint = `${API.CONVERSATIONS_URL}?user=${encodeURIComponent(userId)}`;
    return await request.get(endpoint, API_KEY);
};

/**获取历史会话消息 */
export const histMessage = async (userId: string, API_KEY: string, chatId: string): Promise<any> => {
    console.log(userId, chatId)
    const endpoint = `${API.MESSAGES_URL}?user=${encodeURIComponent(userId)}&conversation_id=${chatId}`;
    return await request.get(endpoint, API_KEY);
};

/**发送信息给bot */
export const sendMessages = async (API_KEY: string, body: any): Promise<any> => {
    const endpoint = `${API.SENDMESSAGE_URL}`;
    return await request.post(endpoint, API_KEY, body);
};

/**删除会话 */
export const delChat = async (API_KEY: string, chatId: string, body: any): Promise<any> => {
    const endpoint = `${API.CONVERSATIONS_URL}/${chatId}`;
    return await request.delete(endpoint, API_KEY, body);
};

/**重命名会话 */
export const renameChatName = async (API_KEY: string, editingChatId: string | null, body: any): Promise<any> => {
    const endpoint = `${API.CONVERSATIONS_URL}/${editingChatId}/name`;
    return await request.post(endpoint, API_KEY, body);
};

/**消息反馈 */
export const feedbacksMessage = async (API_KEY: string, message_id: string, body: any): Promise<any> => {
    const endpoint = `${API.MESSAGES_URL}/${message_id}/feedbacks`;
    return await request.post(endpoint, API_KEY, body);
};

/**下一轮建议问题列表 */
export const suggestMessage = async (API_KEY: string, message_id: string, userId: string): Promise<any> => {
    const endpoint = `${API.MESSAGES_URL}/${message_id}/suggested?user=${encodeURIComponent(userId)}`;
    return await request.get(endpoint, API_KEY);
};

/**停止响应 */
export const stopResponseMessage = async (API_KEY: string, taskId: string, body: any): Promise<any> => {
    const endpoint = `${API.SENDMESSAGE_URL}/${taskId}/stop`;
    return await request.post(endpoint, API_KEY, body);
};

/**上传文件 */
export const uploadFile = async (API_KEY: string,body: any): Promise<any> => {
    const endpoint = `${API.UPLOAD_URL}`;
    return await request.post(endpoint, API_KEY, body);
};