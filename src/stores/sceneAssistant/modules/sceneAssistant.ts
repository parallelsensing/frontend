import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import useUserStore from '@/stores/users/modules/user';
import { converListMessage, delChat, feedbacksMessage, histMessage, renameChatName, sendMessages, stopResponseMessage, suggestMessage, uploadFile } from '@/api/sceneAssistant';
import type { MessageItem, Chat, ListItem } from '@/type/assistant';
const userStore = useUserStore();
const userAvatar = '/bot/user.png';
const botAvatar = '/bot/bot.png';
const chatList = ref<Chat[]>([]);
const items = ref<ListItem[]>([
    {
        id: 0, title: '智慧矿山', subtitle: '简单描述基本情况内容 ', API_KEY: "app-rNuCcawBtyNvXHGRoTUZa4rS", image: '/img/a.png', questions: [
            "帮我出一些矿山安全培训的测试题？",
            "矿山火灾要如何应对？"]
    },
    {
        id: 1, title: '校园问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-5muy7p6a7PL8lOk0RKTUMmE7", image: '/img/b.png', questions: [
            "校车发车时间？",
            "学校就医流程？"]
    },
    {
        id: 2, title: '场景问答', subtitle: '简单描述基本情况内容 ', API_KEY: "app-ZM4vXvwsLHAZ37UYvpZEPmzQ", image: '/img/c.png', questions: [
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

export const useSceneAssistantStore = defineStore({
    id: 'sceneAssistant',
    state: () => {
        return {
            items: items,
            messageList: <MessageItem[]>([]),
            chatList: <Chat[]>([]),
            userId: userStore.username,
            API_KEY: items.value[0].API_KEY,
            selectedChatId: <string | null>(null),
            taskId: '',
            selectedAgent: items.value[0],
            imageUrl: '',
            questionList:[]
        };
    },
    actions: {
        /**切换智能体 */
        toggleAgent(item: any) {
            this.questionList = [];
            this.selectedAgent = item;
            this.API_KEY = item.API_KEY;
        },
        /**点击新聊天 */
        newChat() {
            this.questionList = [];
            this.selectedChatId = null;
            this.messageList = [];
        },
        /**切换会话 */
        changeChat(chatId: string) {
            this.questionList = [];
            this.selectedChatId = chatId;
        },
        /**获取会话历史消息 */
        async getHistoryMessage(chatId: string) {
            this.selectedChatId = chatId;
            this.messageList = [];
            const result = await histMessage(this.userId, this.API_KEY, chatId);
            result.data.forEach((element: any) => {
                const userMessageItem = {
                    id: uuidv4(),
                    chatId: element.conversation_id,
                    text: element.query,
                    type: 'user',
                    avatar: userAvatar,
                    message_id: element.id,
                    img: element?.message_files[0]?.url
                };

                // 提取 answer 中的图片链接
                let img = null;
                let text = element.answer;
                const imgMatch = element.answer.match(/!\[image\]\((.*?)\)/);
                if (imgMatch && imgMatch[1]) {
                    img = imgMatch[1];
                    text = '';
                }

                const botMessageItem = {
                    id: uuidv4(),
                    chatId: element.conversation_id,
                    text: text,
                    type: 'bot',
                    avatar: botAvatar,
                    message_id: element.id,
                    img: img
                };
                this.messageList.push(userMessageItem, botMessageItem);
            });
        },
        /**获取历史会话列表 */
        async getConverListMessage() {
            const result = await converListMessage(this.userId, this.API_KEY);
            this.chatList = [];
            result.data.forEach((item: any) => {
                this.chatList.push({
                    id: item.created_at,
                    conversation_id: item.id,
                    name: item.name,
                    created_at: item.created_at,
                    title: item.name,
                    inputs: item.inputs,
                    introduction: item.introduction,
                    status: item.status,
                })
            })
        },
        /**发送并接收消息 */
        async getSendMessage(newMessage: string, file?: File) {
            this.questionList = [];
            let fileId = '';
            this.imageUrl = file ? URL.createObjectURL(file) : '';

            // 构建提问消息对象 (把用户消息推到当前会话列表中了)
            const userMessageItem = {
                id: uuidv4(),
                chatId: this.selectedChatId || '', // 如果 selectedChatId 为空，则使用空字符串
                text: newMessage,
                type: 'user',
                avatar: userAvatar,
                message_id: '',
                img: this.imageUrl
            };
            this.messageList.push(userMessageItem);   // 添加到会话消息列表

            // 先上传这个图片获得id
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('user', this.userId);
                const response = await uploadFile(this.API_KEY, formData);
                fileId = response.id;
            }

            try {
                // 构建请求体
                const body: any = {
                    inputs: {},
                    query: newMessage,
                    response_mode: 'streaming',
                    conversation_id: this.selectedChatId || '',
                    user: this.userId,
                    files: []
                };

                if (fileId) {
                    body.files = [
                        {
                            type: "image",
                            transfer_method: "local_file",
                            upload_file_id: fileId
                        }
                    ];
                }

                const response = await sendMessages(this.API_KEY, body);
                const reader = response.body?.getReader();// 获取流式响应
                const decoder = new TextDecoder('utf-8');// 创建解码器
                let buffer = '';//  存储流式响应数据
                if (reader) {
                    const aamessages = ref<string>('');// 存储bot返回的文本
                    // 构建bot返回的文本对象
                    const botMessage = {
                        id: uuidv4(),
                        chatId: '',
                        text: aamessages.value,
                        type: 'bot',
                        avatar: botAvatar,
                        message_id: '',
                        img: ''
                    };

                    this.messageList.push(botMessage);// bot返回的文本添加到会话消息列表

                    while (true) {// 循环读取流式响应数据
                        const { done, value } = await reader.read();// 读取流式响应数据
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });// 流式响应数据拼接

                        const lines = buffer.split('\n\n');// 拆分流式响应数据

                        if (this.taskId == '') {// 获取task_id
                            const jsonString = lines[0].substring(buffer.indexOf('data: ') + 6);// 获取json字符串
                            const dataObject = JSON.parse(jsonString);//  解析json字符串
                            this.taskId = dataObject.task_id;  // 获取task_id
                        }

                        for (let i = 0; i < lines.length - 1; i++) {// 循环读取流式响应数据
                            const line = lines[i].trim();// 去除空格
                            if (line.startsWith('data: ')) {// 判断是否是流式响应数据
                                const data = JSON.parse(line.substring(6));// 解析流式响应数据
                                    console.log(data);
                                if (data.event === 'message') {// 判断是否是bot返回的文本
                                    const imgMatch = data.answer.match(/!\[image\]\((.*?)\)/);

                                    if (imgMatch && imgMatch[1]) {
                                        // 检查 aamesages.value 是否包含以 `![image](` 开头的图片链接
                                        // 如果匹配到图像链接，添加 img 属性
                                        aamessages.value = '';
                                        botMessage.img = imgMatch[1];
                                    } else {
                                        aamessages.value += data.answer;// 拼接bot返回的文本
                                        console.log(aamessages.value)
                                    }

                                    if (this.selectedChatId == null) {// 新会话会执行一次，因为开始没有会话id,bot第一次返回的文本中包含会话id，有了会话id后，后面就不会执行addNewChat了
                                        this.addNewChat(data.conversation_id);// 添加会话
                                    }

                                    const existingMessage = this.messageList.find((msg) => msg.id === botMessage.id);// 在会话消息列表中查找当前消息
                                    if (existingMessage) {
                                        existingMessage.text = aamessages.value;// 更新当前消息的文本
                                        if (existingMessage.message_id == '') {// 判断当前消息的message_id是否为空
                                            existingMessage.message_id = data.message_id; // 更新当前消息的message_id
                                        }
                                    }
                                } else if (data.event === 'message_end') {
                                    this.getConverListMessage()
                                    this.taskId = '';
                                    return;
                                }
                            }
                        }
                        buffer = lines[lines.length - 1];
                    }
                }

            } catch (error) {
                console.error('Error sending message:', error);
                this.messageList.push({
                    id: uuidv4(),
                    chatId: '',
                    text: '发送消息出错',
                    type: 'bot',
                    avatar: botAvatar,
                    message_id: ''
                });
                this.taskId = '';
                this.getConverListMessage();
            }
            this.getConverListMessage();
        },
        /**发送消息自动创建一个会话 */
        addNewChat(conversation_id: string) {
            chatList.value.unshift({
                id: Date.now(),
                conversation_id: conversation_id,
                name: '新会话',
                created_at: Date.now(),
                title: '新会话',
                inputs: {},
                introduction: '',
                status: 'string',
            })
            this.selectedChatId = conversation_id;
        },
        /**停止响应 */
        async stopResponese() {
            const body = {
                user: this.userId,
            };
            const response: any = await stopResponseMessage(this.API_KEY, this.taskId, body);
        },
        /**重命名会话 */
        async renameChat(inputText: string, editingChatId: string | null) {
            const body = {
                name: inputText,
                user: this.userId
            };
            await renameChatName(this.API_KEY, editingChatId, body);
        },
        /**删除会话 */
        async deChat(chatId: string) {
            const body = {
                user: this.userId
            };
            await delChat(this.API_KEY, chatId, body)
        },
        /**消息反馈 */
        async feedbaMessage(message_id: string, feedback: string) {
            const body = {
                rating: feedback,
                user: this.userId
            };
            const response = await feedbacksMessage(this.API_KEY, message_id, body);
        },
        /**下一轮建议问题列表 */
        async suggestedNextMessage(message_id: string) {
            const response = await suggestMessage(this.API_KEY, message_id, this.userId);
            this.questionList = response.data;
        }
    }
});

export default useSceneAssistantStore;