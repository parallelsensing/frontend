interface MessageNew {
    id: string;
    chatId: string;
    text: string;
    htmlText?: string;
    type: string;
    avatar: string;
    message_id: string;
}

interface Chat {
    id: number;
    conversation_id: string;
    name: string;
    created_at: number;
    title: string;
    inputs: any;
    introduction: string;
    status: string;
}

interface ListItem {
    id: number;
    title: string;
    subtitle: string;
    API_KEY: string;
    image: string;
    questions: string[];
}
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { converListMessage, delChat, feedbacksMessage, histMessage, renameChatName, sendMessages, stopResponseMessage, suggestMessage } from '@/api/sceneAssistant';

const userAvatar = '/bot/user.png';
const botAvatar = '/bot/bot.png';

export const useSceneAssistantStore = defineStore('sceneAssistant', () => {
    // State
    const items = ref([
        {
            id: 0, title: '智慧矿山', subtitle: '简单描述基本情况内容 ', API_KEY: "app-5muy7p6a7PL8lOk0RKTUMmE7", image: '/img/a.png', questions: [
                "帮我出一些矿山安全培训的测试题？",
                "矿山火灾要如何应对？"]
        },
        {
            id: 1, title: '校园问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-rNuCcawBtyNvXHGRoTUZa4rS", image: '/img/b.png', questions: [
                "校车发车时间？",
                "学校就医流程？"]
        },
        {
            id: 2, title: '场景问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-5muy7p6a7PL8lOk0RKTUMmE7", image: '/img/c.png', questions: [
                "此场景现有多少工作人员？",
                "有多少活动机械？"]
        },
        {
            id: 3, title: '知识问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-rNuCcawBtyNvXHGRoTUZa4rS", image: '/img/d.png', questions: [
                "9.9和9.11谁大？",
                "帮我出一些测试题？"]
        },
        {
            id: 4, title: '知识问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-rNuCcawBtyNvXHGRoTUZa4rS", image: '/img/a.png', questions: [
                "9.9和9.11谁大？",
                "帮我出一些测试题？"]
        },
        {
            id: 5, title: '知识问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-rNuCcawBtyNvXHGRoTUZa4rS", image: '/img/b.png', questions: [
                "9.9和9.11谁大？",
                "帮我出一些测试题？"]
        },
        {
            id: 6, title: '知识问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-rNuCcawBtyNvXHGRoTUZa4rS", image: '/img/c.png', questions: [
                "9.9和9.11谁大？",
                "帮我出一些测试题？"]
        },
    ]);
    
    const messageNew = ref<MessageNew[]>([]);
    const chatList = ref<Chat[]>([]);
    const userId = ref('admin');
    const API_KEY = ref(items.value[0].API_KEY);
    const selectedChatId = ref<string | null>(null);
    const taskId = ref('');
    const selectedAgent = ref(items.value[0]);

    // Actions
    const toggleAgent = (item: any) => {
        selectedAgent.value = item;
        API_KEY.value = item.API_KEY;
    };

    const newChat = () => {
        selectedChatId.value = null;
        messageNew.value = [];
    };

    const changeChat = (chatId: string) => {
        selectedChatId.value = chatId;
    };

    const getHistoryMessage = async (chatId: string) => {
        selectedChatId.value = chatId;
        messageNew.value = [];
        const result = await histMessage(userId.value, API_KEY.value, chatId);
        const data = await result.json();
        data.data.forEach((element: any) => {
            const userMessageItem = {
                id: uuidv4(),
                chatId: element.conversation_id,
                text: element.query,
                type: 'user',
                avatar: userAvatar,
                message_id: element.id
            };
            const botMessageItem = {
                id: uuidv4(),
                chatId: element.conversation_id,
                text: element.answer,
                type: 'bot',
                avatar: botAvatar,
                message_id: element.id
            };
            messageNew.value.push(userMessageItem, botMessageItem);
        });
    };

    const getConverListMessage = async () => {
        const result = await converListMessage(userId.value, API_KEY.value);
        const data = await result.json();
        chatList.value = [];
        data.data.forEach((item: any) => {
            chatList.value.push({
                id: item.created_at,
                conversation_id: item.id,
                name: item.name,
                created_at: item.created_at,
                title: item.name,
                inputs: item.inputs,
                introduction: item.introduction,
                status: item.status,
            });
        });
    };

    const getSendMessage = async (newMessage: string) => {
        const userMessageItem = {
            id: uuidv4(),
            chatId: selectedChatId.value || '',
            text: newMessage,
            type: 'user',
            avatar: userAvatar,
            message_id: ''
        };
        messageNew.value.push(userMessageItem);

        try {
            const body = {
                inputs: {},
                query: newMessage,
                response_mode: 'streaming',
                conversation_id: selectedChatId.value || '',
                user: userId.value,
            };
            const response = await sendMessages(API_KEY.value, body);
            const reader = response.body?.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            if (reader) {
                const aamessages = ref<string>('');
                const botMessage = {
                    id: uuidv4(),
                    chatId: '',
                    text: aamessages.value,
                    type: 'bot',
                    avatar: botAvatar,
                    message_id: ''
                };

                messageNew.value.push(botMessage);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });

                    const lines = buffer.split('\n\n');

                    if (taskId.value == '') {
                        const jsonString = lines[0].substring(buffer.indexOf('data: ') + 6);
                        const dataObject = JSON.parse(jsonString);
                        taskId.value = dataObject.task_id;
                    }

                    for (let i = 0; i < lines.length - 1; i++) {
                        const line = lines[i].trim();
                        if (line.startsWith('data: ')) {
                            const data = JSON.parse(line.substring(6));

                            if (data.event === 'message') {
                                aamessages.value += data.answer;

                                if (selectedChatId.value == null) {
                                    addNewChat(data.conversation_id);
                                }

                                const existingMessage = messageNew.value.find((msg) => msg.id === botMessage.id);
                                if (existingMessage) {
                                    existingMessage.text = aamessages.value;
                                    if (existingMessage.message_id == '') {
                                        existingMessage.message_id = data.message_id;
                                    }
                                }
                            } else if (data.event === 'message_end') {
                                getConverListMessage();
                                taskId.value = '';
                                return;
                            }
                        }
                    }
                    buffer = lines[lines.length - 1];
                }
            }

        } catch (error) {
            console.error('Error sending message:', error);
            messageNew.value.push({
                id: uuidv4(),
                chatId: '',
                text: '发送消息出错',
                type: 'bot',
                avatar: botAvatar,
                message_id: ''
            });
            taskId.value = '';
            getConverListMessage();
        }
        getConverListMessage();
    };

    const addNewChat = (conversation_id: string) => {
        chatList.value.unshift({
            id: Date.now(),
            conversation_id: conversation_id,
            name: '新会话',
            created_at: Date.now(),
            title: '新会话',
            inputs: {},
            introduction: '',
            status: 'string',
        });
        selectedChatId.value = conversation_id;
    };

    const stopResponese = async () => {
        const body = {
            user: userId.value,
        };
        await stopResponseMessage(API_KEY.value, taskId.value, body);
    };

    const renameChat = async (inputText: string, editingChatId: string | null) => {
        const body = {
            name: inputText,
            user: userId.value
        };
        await renameChatName(API_KEY.value, editingChatId, body);
    };

    const deChat = async (chatId: string) => {
        const body = {
            user: userId.value
        };
        await delChat(API_KEY.value, chatId, body);
    };

    const feedbackMessage = async (message_id: string, feedback: string) => {
        const body = {
            rating: feedback,
            user: userId.value
        };
        await feedbacksMessage(API_KEY.value, message_id, body);
    };

    const suggestedNextMessage = async (message_id: string) => {
        const response = await suggestMessage(API_KEY.value, message_id, userId.value);
        const data = await response.json();
        return data;
    };

    return {
        items,
        messageNew,
        chatList,
        userId,
        API_KEY,
        selectedChatId,
        taskId,
        selectedAgent,
        toggleAgent,
        newChat,
        changeChat,
        getHistoryMessage,
        getConverListMessage,
        getSendMessage,
        addNewChat,
        stopResponese,
        renameChat,
        deChat,
        feedbackMessage,
        suggestedNextMessage
    };
});

export default useSceneAssistantStore;
