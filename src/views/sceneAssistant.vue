<template>
  <div>
    <div style="height:7vh;positiom:absolute;">
      <headersall> </headersall>
    </div>

    <div style="width:100%; height: calc(100vh - 90px - 7vh); display: flex; margin-right: 10px;">
      <!-- 智能体列表 -->
      <div class="agent-list">
        <v-list lines="one" style="background:#f3e9f2">
          <v-list-item v-for="item in items" :key="item.id" style="padding:0;" @click="handleClick(item)">
            <div
              style="display:flex;border-radius: 10px;margin: 0 5px 15px 5px;height: 120px;box-shadow: 0px 4px 6px 3px rgba(154, 138, 163, 0.5);">
              <div style="flex: 2;border-radius: 10px;">
                <img :src="item.image" style="width:100%;height:100%;object-fit: cover;border-radius: 10px 0 0 10px;" />
              </div>

              <div style="flex: 3;border-radius: 0 10px 10px 0;padding: 0 0 0 10px"
                :class="{ selected: item.id === selectedAgent.id, unselected: item.id !== selectedAgent.id }">
                <v-list-item-title style="font-weight: 700;margin-top: 10px;">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle style="font-weight: 700;margin-top: 10px;">{{ item.subtitle
                }}</v-list-item-subtitle>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </div>

      <div class="chat-app">
        <!-- 主聊天区域 -->
        <div class="chat-container">
          <div class="messages" ref="messages">
            <!-- 开场问题建议列表 -->
            <div style="text-align: center; margin-top:20%;" v-show="tipShow">
              <h1 style="font-size: 26px; font-weight: bolder;">您好！您可以这样问我</h1>
              <div v-for="(question, index) in selectedAgent.questions" :key="index">
                <h1 style="font-size: 22px; font-weight: bolder; margin-top: 20px;">：{{ question }}
                  <v-icon icon="mdi-star-check-outline"></v-icon>
                </h1>
              </div>

            </div>
            <!-- 聊天对话列表 -->
            <div v-for="message in messageNew" :key="message.id" :class="['message', message.type]">
              <img :src="message.avatar" class="avatar" />
              <div>
                <div class="text" v-html="message.htmlText || message.text"></div>
                <template v-if="message.type === 'bot'">
                  <v-btn size="small" variant="text" icon="mdi-content-copy" @click="copyText(message.text)" />
                  <v-btn size="small" variant="text" icon="mdi-cached" @click="resendMessage(message.text)" />
                  <v-btn size="small" variant="text" icon="mdi-share" @click="shareMessage(message.text)" />
                  <v-btn size="small" variant="text" icon="mdi-thumb-up-outline"
                    @click="feedbackMessage(message, 'like')" />
                  <v-btn size="small" variant="text" icon="mdi-thumb-down-outline"
                    @click="feedbackMessage(message, 'dislike')" />
                </template>
              </div>
            </div>
          </div>
          <!-- 输入区域 -->
          <div class="input-container">
            <textarea v-model="newMessage" placeholder="输入内容开始聊天 / Ctrl+Enter换行" rows="4" class="message-input"
              @keydown="handleKeydown"></textarea>
            <div style="margin-top: auto;">
              <v-btn v-if="!isStreaming" variant="text" style="width:50px;height:50px" @click="sendMessage">
                <v-icon size="48px" color="#920783">mdi-send-circle</v-icon>
              </v-btn>
              <v-btn v-if="isStreaming" variant="text" style="width:50px;height:50px" @click="stopMessage">
                <v-icon size="48px" color="#920783">mdi-stop-circle-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="sidebar">

          <!-- 当前智能体 -->
          <div
            style="width: 92%;height: 100px;margin:10px 0 10px 10px;border-radius: 10px;box-shadow: 1px 4px 6px 3px rgba(0, 0, 0, 0.25);">
            <div style="display:flex;border-radius: 10px;height: 100%;">
              <div style="flex: 2;" @click="test">
                <img :src="selectedAgent.image" style="width:100%;height:100%;border-radius: 10px 0 0 10px;" />
              </div>

              <div style="flex: 3;background-color:#ffffff;padding: 0 0 0 10px;border-radius: 0 10px 10px 0;">
                <v-list-item-title style="font-weight: 700;margin-top: 10px;">
                  {{ selectedAgent.title }}
                </v-list-item-title>
                <v-list-item-subtitle style="font-weight: 700;margin-top: 10px;">
                  {{ selectedAgent.subtitle }}
                </v-list-item-subtitle>
              </div>
            </div>
          </div>
          <el-divider style="width: 90%;left: 4%;margin:5px 0;" />

          <!-- 发起新聊天按钮 -->
          <div style="color:#920783;font-weight: 700; width:100%;padding:10px 0 10px 10px;margin-left: 10px;"
            @click="startNewChat">发起新聊天
            <v-icon icon="mdi-invoice-text-plus-outline"></v-icon>
          </div>

          <!-- 会话列表 -->
          <ul class="chat-list">
            <li v-for="chat in chatList" :key="chat.id"
              :class="['chat-item', { 'selected': chat.conversation_id === selectedChatId || menuVisible[chat.id] }]"
              @click="selectChat(chat.conversation_id)">
              <span>{{ chat.title }}</span>
              <div class="menu-container">
                <v-btn class="menu-btn" density="compact" variant="plain" icon="mdi-dots-horizontal" color="#ffffff"
                  @click.stop="toggleMenu(chat)">
                </v-btn>
                <!-- 小弹出框 -->
                <v-menu v-model="menuVisible[chat.id]" :close-on-content-click="false" offset-y>
                  <template v-slot:activator="{ props }">
                    <span v-bind="props"></span>
                  </template>
                  <v-list>
                    <v-list-item @click="menuAction('rename', chat)">重命名</v-list-item>
                    <v-list-item @click="menuAction('delete', chat)">删除</v-list-item>
                    <v-list-item @click="menuAction('share', chat)">分享</v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <!-- bottombar -->
      <!-- <div class="content_bottom">
        <div style="flex:12;">
          <dv-decoration10 style="width:100%;height:80%;" :color="['#9370DB', '#D8BFD8']" />
        </div>
        <div style="flex:1;padding:10px;">
          <dv-decoration3 style="width:94%;height:70%;" :color="['#9370DB', '#D8BFD8']" />
        </div>
      </div> -->
    </div>

    <!-- 重命名对话框 -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card prepend-icon="mdi-book-arrow-down" title="请输入新的备注">
        <v-card-text>
          <v-text-field v-model="inputText" clearable label="" variant="outlined"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="取消" variant="plain" @click="dialog = false"></v-btn>
          <v-btn color="primary" text="保存" variant="tonal" @click="saveChatName"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import headersall from "./header-all.vue";
import { v4 as uuidv4 } from 'uuid';
import { Decoration10 as DvDecoration10 } from '@kjgl77/datav-vue3';
import { Decoration3 as DvDecoration3 } from '@kjgl77/datav-vue3';
import axios from 'axios';

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

const BASE_URL = "https://579igzs65868.vicp.fun/v1";
const userAvatar = '/bot/user.png';
const botAvatar = '/bot/bot.png';

const isStreaming = ref(false);
const chatList = ref<Chat[]>([]);
const selectedChatId = ref<string | null>(null);
const newMessage = ref('');
const editingChatId = ref<string | null>(null);
const menuVisible = ref<{ [key: number]: boolean }>({});
const dialog = ref(false);
const inputText = ref('');
const tipShow = ref(true);

const messages = ref<HTMLElement | null>(null);
const taskId = ref('');
const userId = 'abc';

const items = ref<ListItem[]>([
  {
    id: 0, title: '智慧矿山', subtitle: '简单描述基本情况内容 ', API_KEY: "app-5muy7p6a7PL8lOk0RKTUMmE7", image: '/img/a.png',questions: [
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
const selectedAgent = ref(items.value[0]);

const API_KEY = ref(items.value[1].API_KEY);


const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    newMessage.value += '\n' // 插入换行符
    event.preventDefault()
  } else if (event.key === 'Enter') {
    event.preventDefault()
    sendMessage()
  }
}

/**切换智能体 */
const handleClick = (item: ListItem) => {
  selectedAgent.value = item;
  API_KEY.value = item.API_KEY;
  console.log(API_KEY.value);

  conversationListMessage();
  startNewChat();
};

/**滚动到页面底部 */
const scrollToBottom = () => {
  nextTick(() => {
    if (messages.value) {
      messages.value.scrollTop = messages.value.scrollHeight;
    }
  });
};

const headers = computed(() => ({
  'Authorization': `Bearer ${API_KEY.value}`,
  'Content-Type': 'application/json'
}));

const toggleMenu = (chat: Chat) => {
  menuVisible.value = { ...menuVisible.value, [chat.id]: !menuVisible.value[chat.id] };
  if (menuVisible.value[chat.id]) {
    selectedChatId.value = chat.conversation_id;
  }
};

const menuAction = (action: string, chat: Chat) => {
  switch (action) {
    case 'rename':
      dialog.value = true;
      editingChatId.value = chat.conversation_id;
      break;
    case 'delete':
      deleteChat(chat.conversation_id);
      console.log(`Deleting chat ${chat.conversation_id}`);
      break;

    case 'share':
      shareChat(chat.conversation_id);
      console.log(`Sharing chat ${chat.conversation_id}`);
      break;
    default:
      break;
  }
  menuVisible.value[chat.id] = false;
};

/**重命名会话 */
const saveChatName = async () => {
  dialog.value = false;//
  const response = await fetch(`${BASE_URL}/conversations/${editingChatId.value}/name`, {
    method: 'POST',
    headers: headers.value,
    body: JSON.stringify({
      name: inputText.value,
      user: 'abc'
    }),
  });
  console.log(response);
  inputText.value = '';
  conversationListMessage();
}

/**删除会话 */
const deleteChat = async (chatId: string) => {
  const response = await fetch(`${BASE_URL}/conversations/${chatId}`, {
    method: 'DELETE',
    headers: headers.value,
    body: JSON.stringify({
      user: 'abc'
    }),
  });
  console.log(response);
  conversationListMessage();
  startNewChat();
};

/**分享会话 */
const shareChat = (chatId: string) => {
  // console.log(`Sharing chat ${chatId}`);
  // const chat = chatList.value.find(chat => chat.id === editingChatId.value);
  // if (chat) {
  //   // chat.title = inputText.value;
  //   console.log(chat);
  // }
}

/**分享消息 */
const shareMessage = (message: string) => {

}

/**重新生成 */
const resendMessage = (message: string) => {

}

/**复制内容 */
const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

/**点击新建一个会话（初始化清空） */
const startNewChat = () => {
  selectedChatId.value = null;
  tipShow.value = true;
  messageNew.value = [];
};

const test = () => {
  console.log(chatList.value);

  conversationListMessage();
  suggestedMessage(messageNew.value[1].message_id);
}

/**发送消息自动创建一个会话 */
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
  })
  selectedChatId.value = conversation_id;
};

/**切换到某一个会话 */
const selectChat = (chatId: string) => {
  tipShow.value = false;
  historyMessage(chatId);
  selectedChatId.value = chatId;
};

const messageNew = ref<MessageNew[]>([]);

/**获取历史会话消息 */
const historyMessage = async (chatId: string) => {
  messageNew.value = [];
  console.log('id', chatId);
  const url = `${BASE_URL}/messages?user=${encodeURIComponent(userId)}&conversation_id=${chatId}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers.value,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
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

    console.log(messageNew.value);

  } catch (error) {
    console.error('请求失败:', error);
  }
};

/**获取会话列表 */
const conversationListMessage = async (lastId = '', limit = 20, pinned = false) => {
  // 构建 URL，添加可选参数
  let url = `${BASE_URL}/conversations?user=${encodeURIComponent(userId)}&limit=${limit}`;
  if (lastId) {
    url += `&last_id=${encodeURIComponent(lastId)}`;
  }
  if (pinned !== undefined) {
    url += `&pinned=${pinned}`;
  }


  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers.value,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    chatList.value = [];
    console.log(data);

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
      })
    })
  } catch (error) {
    console.error('请求失败:', error);
  }
};

/**下一轮建议问题列表 */
const suggestedMessage = async (message_id: string) => {

  console.log('建议列表', message_id);
  const url = `${BASE_URL}/messages/${message_id}/suggested?user=${encodeURIComponent(userId)}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers.value,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

/**消息反馈 */
const feedbackMessage = async (message: MessageNew, feedback: string) => {
  console.log('消息反馈');
  console.log(`${BASE_URL}/messages/${message.message_id}/feedbacks`);

  //点赞传 like    点踩传 dislike    撤销点赞传  null
  const response = await fetch(`${BASE_URL}/messages/${message.message_id}/feedbacks`, {
    method: 'POST',
    headers: headers.value,
    body: JSON.stringify({
      rating: feedback,
      user: 'abc'
    }),
  });
  console.log(response);
}

/**停止响应 */
const stopMessage = async () => {
  console.log('停止响应');
  console.log(taskId.value);
  console.log(`${BASE_URL}/chat-messages/${taskId.value}/stop`);

  const response = await fetch(`${BASE_URL}/chat-messages/${taskId.value}/stop`, {
    method: 'POST',
    headers: headers.value,
    body: JSON.stringify({
      user: 'abc'
    }),
  });
  console.log(response);
}

/**发送信息给bot */
const sendMessage = async () => {

  if (newMessage.value.trim() !== '') {

    tipShow.value = false;
    isStreaming.value = true;
    console.log(selectedChatId.value);
    if (selectedChatId.value == null) {//发起对话的第一句
      const userMessageItem = {
        id: uuidv4(),
        chatId: '',
        text: newMessage.value,
        type: 'user',
        avatar: userAvatar,
        message_id: ''
      };

      messageNew.value.push(userMessageItem);

    } else {//继续对话
      const userMessageItem = {
        id: uuidv4(),
        chatId: selectedChatId.value,
        text: newMessage.value,
        type: 'user',
        avatar: userAvatar,
        message_id: ''
      };

      messageNew.value.push(userMessageItem);
      scrollToBottom();
    }

    try {
      const query = newMessage.value;
      const response = await fetch(`${BASE_URL}/chat-messages`, {
        method: 'POST',
        headers: headers.value,
        body: JSON.stringify({
          inputs: {},
          query,
          response_mode: 'streaming',
          conversation_id: selectedChatId.value == null ? '' : selectedChatId.value,
          user: 'abc',
        }),
      });

      newMessage.value = ''; // 清除输入框文字

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
        let codeOk = false;
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

                if (selectedChatId.value == null && !codeOk) {
                  console.log(data);
                  addNewChat(data.conversation_id);
                  codeOk = true;
                }

                const existingMessage = messageNew.value.find(
                  (msg) => msg.id === botMessage.id
                );
                if (existingMessage) {
                  existingMessage.text = aamessages.value;//如果这条消息还没有给message_id赋值
                  if (existingMessage.message_id == '') {
                    existingMessage.message_id = data.message_id;
                  }
                }
              } else if (data.event === 'message_end') {
                isStreaming.value = false;
                conversationListMessage();
                scrollToBottom();
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
      scrollToBottom();
      conversationListMessage();
      taskId.value = '';
    }
  } else {
    console.warn('有问题');
  }
};

onMounted(() => {
  conversationListMessage();
  scrollToBottom();
});

</script>

<style scoped lang="scss">
.chat-app {
  flex: 4;
  display: flex;
  width: 100%;
  height: 100%;
  // border: 1px solid #ccc;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  margin-left: 20px;
}

.sidebar {
  flex: 1;
  height: 100%;
  // border-right: 1px solid #ccc;
  box-shadow: none;
  background-color: #f3e9f2;
  display: flex;
  padding: 0px;
  flex-direction: column;
  margin-right: 2%;
  border-radius: 10px;
}

.new-chat-btn {
  padding: 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
}

.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  .chat-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    // border-bottom: 1px solid #ccc;
    color: #969494;
    cursor: pointer;
    position: relative;
    // background-color: #920783;
    border-radius: 15px;

    &:hover {
      background-color: #a55193c0;
      color: #ffffff;

      .menu-btn {
        display: block;
      }
    }

    &.selected {
      background-color: #920783;
      color: #ffffff;
    }

    .menu-container {
      display: flex;
      align-items: center;
      position: absolute;
      right: 10px;
    }
  }
}

.menu-btn {
  display: none;
}

.chat-container {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .message {
    display: flex;
    align-items: flex-start;
    margin-bottom: 8px;
    max-width: 70%;

    &.user {
      align-self: flex-end;

      .avatar {
        order: 1;
        margin-left: 8px;
      }

      .text {
        color: #ffffff;
        order: 0;
        background-color: #920783;
        padding: 8px 12px;
        border-radius: 12px;
      }
    }

    &.bot {
      align-self: flex-start;

      .avatar {
        order: 0;
        margin-right: 8px;
      }

      .text {
        order: 1;
        background-color: #f3e9f2;
        padding: 8px 12px;
        border-radius: 12px;
      }
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .text {
    max-width: 100%;
    word-wrap: break-word;
  }
}

.input-container {
  margin-right: 20px;
  display: flex;
  background-color: #f3e9f2;
  border-radius: 10px;
  padding: 16px;
  // border-top: 1px solid #ccc;

  .message-input {

    background-color: #f3e9f2;
    flex: 1;
    padding: 8px;
    // border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    overflow-y: auto;
  }

}

.agent-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  // background-color: #F6EFF3;
}

.selected {
  background-color: #c18fc1;
}

.unselected {
  background-color: #ffffff;
}

.content_bottom {
  width: 100%;
  position: absolute;
  bottom: -20px;
  display: flex;
  height: 60px;
}

/* 整体滚动条样式 */
::-webkit-scrollbar {
  width: 12px;
  /* 设置滚动条宽度 */
}

/* 滚动条的滑块部分 */
::-webkit-scrollbar-thumb {
  background-color: #dac7da;
  /* 滑块的颜色 */
  border-radius: 6px;
  /* 滑块的圆角 */
  border: 3px solid transparent;
  /* 边框间距 */
  background-clip: content-box;
  /* 使背景裁剪到边框内 */
}

/* 滚动条的背景轨道部分 */
::-webkit-scrollbar-track {
  background-color: #f3e9f2;
  /* 轨道背景色 */
  border-radius: 10px;
  /* 轨道的圆角 */
}</style>