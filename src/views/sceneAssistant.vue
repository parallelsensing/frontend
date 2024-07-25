<template>
  <div style="width: calc(100vw - 130px); height: calc(100vh - 100px); display: flex; margin-right: 30px;">
    <div class="agent-list">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="chat-app">
      <div class="sidebar">
        <v-btn color="#409EFF" min-width="100%" @click="startNewChat">发起新聊天
          <v-icon icon="mdi-comment-plus-outline"></v-icon>
        </v-btn>
        <ul class="chat-list">
          <li v-for="chat in reversedChatList" :key="chat.id"
            :class="['chat-item', { 'selected': chat.id === selectedChatId || menuVisible[chat.id] }]"
            @click="selectChat(chat.id)">
            <span>{{ chat.title }}</span>
            <div class="menu-container">
              <v-btn class="menu-btn" density="compact" variant="plain" icon="mdi-dots-horizontal"
                @click.stop="toggleMenu(chat)">
              </v-btn>
              <v-menu v-model="menuVisible[chat.id]" :close-on-content-click="false" offset-y>
                <template v-slot:activator="{ props }">
                  <span v-bind="props"></span>
                </template>
                <v-list>
                  <v-list-item @click="menuAction('action1', chat.id)">重命名</v-list-item>
                  <v-list-item @click="menuAction('action2', chat.id)">删除</v-list-item>
                  <v-list-item @click="menuAction('action3', chat.id)">分享</v-list-item>
                </v-list>
              </v-menu>
            </div>
          </li>
        </ul>
      </div>
      <div class="chat-container">
        <div class="messages" ref="messages">
          <div style="text-align: center; margin-top:20%;" v-show="tipShow">
            <h1 style="font-size: 26px; font-weight: bolder;">您好！您可以这样问我</h1>
            <h1 style="font-size: 22px; font-weight: bolder; margin-top: 20px;">：校车发车时间？
              <v-icon icon="mdi-star-check-outline"></v-icon>
            </h1>
            <h1 style="font-size: 22px; font-weight: bolder; margin-top: 20px;">：学校就医流程？
              <v-icon icon="mdi-star-check-outline"></v-icon>
            </h1>
          </div>
          <div v-for="message in currentMessages" :key="message.id" :class="['message', message.type]">
            <img :src="message.avatar" class="avatar" />
            <div>
              <div class="text" v-html="message.htmlText || message.text"></div>
              <template v-if="message.type === 'bot'">
                <v-btn size="small" variant="text" icon="mdi-content-copy" @click="copyText(message.text)" />
                <v-btn size="small" variant="text" icon="mdi-cached" @click="resendMessage(message.text)" />
                <v-btn size="small" variant="text" icon="mdi-share" @click="shareMessage(message.text)" />
              </template>
            </div>
          </div>
        </div>
        <div class="input-container">
          <textarea v-model="newMessage" placeholder="输入内容开始聊天" rows="4" class="message-input"></textarea>
          <v-btn size="small" variant="text" icon="mdi-send-outline" @click="sendMessage" />
        </div>
      </div>

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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import axios from 'axios';
import { marked } from 'marked';

interface Message {
  id: number;
  chatId: number | null;
  text: string;
  htmlText?: string;
  type: 'user' | 'bot';
  avatar: string;
}

interface Chat {
  id: number;
  title: string;
  conversation_id: string;
}

const BASE_URL = "http://10.11.37.112:5001/v1";
const API_KEY = "app-fKQYA7tYQRrAvFFhHHPT3SNs";

const userAvatar = '/bot/user.png';
const botAvatar = '/bot/bot.png';

const chatList = ref<Chat[]>([]);
const selectedChatId = ref<number | null>(null);
const allMessages = ref<Message[]>([]);
const newMessage = ref('');
const editingChatId = ref<number | null>(null);
const menuVisible = ref<{ [key: number]: boolean }>({});
const dialog = ref(false);
const inputText = ref('');
const tipShow = ref(true);
const newChatId = ref();
const messages = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messages.value) {
      messages.value.scrollTop = messages.value.scrollHeight;
    }
  });
};

const currentMessages = computed(() =>
  selectedChatId.value == null ? allMessages.value.filter(msg => msg.chatId === newChatId.value) : allMessages.value.filter(msg => msg.chatId === selectedChatId.value)
);

const reversedChatList = computed(() => chatList.value.slice().reverse());
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'text/event-stream'
};

const toggleMenu = (chat: Chat) => {
  menuVisible.value = { ...menuVisible.value, [chat.id]: !menuVisible.value[chat.id] };
  if (menuVisible.value[chat.id]) {
    selectedChatId.value = chat.id;
  }
};

const menuAction = (action: string, chatId: number) => {
  console.log(`Action: ${action}, Chat ID: ${chatId}`);
  switch (action) {
    case 'action1':
      dialog.value = true;
      editingChatId.value = chatId;
      break;
    case 'action2':
      deleteChat(chatId);
      console.log(`Deleting chat ${chatId}`);
      break;

    case 'action3':
      shareChat(chatId);
      console.log(`Sharing chat ${chatId}`);
      break;
    default:
      break;
  }
  menuVisible.value[chatId] = false;
};

/**重命名会话 */
const saveChatName = () => {
  dialog.value = false;
  const chat = chatList.value.find(chat => chat.id === editingChatId.value);
  if (chat) {
    chat.title = inputText.value;
  }
  inputText.value = '';
}

/**删除会话 */
const deleteChat = (chatId: number) => {
  const index = chatList.value.findIndex(chat => chat.id === chatId);
  if (index !== -1) {
    chatList.value.splice(index, 1);
  }
  startNewChat();
};

/**分享会话 */
const shareChat = (chatId: number) => {
  console.log(`Sharing chat ${chatId}`);
  const chat = chatList.value.find(chat => chat.id === editingChatId.value);
  if (chat) {
    // chat.title = inputText.value;
    console.log(chat);
  }
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
  console.log(text);
};

/**点击新建一个会话（初始化清空） */
const startNewChat = () => {
  newChatId.value = null;
  selectedChatId.value = null;
  tipShow.value = true;
};

const chatInit = () => {
  newChatId.value = Date.now(); // 使用时间戳生成唯一ID

}

/**发送消息自动创建一个会话 */
const addNewChat = (text: string, conversation_id: string) => {
  const newChatTitle = text.substring(0, 10);
  chatList.value.push({ id: newChatId.value, title: newChatTitle, conversation_id: conversation_id });
  selectedChatId.value = newChatId.value;
};

/**切换到某一个会话 */
const selectChat = (chatId: number) => {
  tipShow.value = false;
  selectedChatId.value = chatId;
};

/**发送信息给bot */
const sendMessage = async () => {

  if (newMessage.value.trim() !== '') {

    tipShow.value = false;

    console.log(selectedChatId.value);
    if (selectedChatId.value == null) {
      chatInit();
      const userMessage: Message = {
        id: Date.now() - 1,
        chatId: newChatId.value,
        text: newMessage.value,
        type: 'user',
        avatar: userAvatar
      };

      allMessages.value.push(userMessage);

    } else {
      const userMessage: Message = {
        id: Date.now(),
        chatId: selectedChatId.value,
        text: newMessage.value,
        type: 'user',
        avatar: userAvatar
      };

      allMessages.value.push(userMessage);
      scrollToBottom();
    }


    try {

      const conversation_id1 = chatList.value.find(chat => chat.id === selectedChatId.value);
      const data = {
        query: newMessage.value,
        inputs: {},
        response_mode: 'streaming',
        conversation_id: selectedChatId.value == null ? '' : conversation_id1!.conversation_id,
        user: 'user123',
        auto_generate_name: true
      };

      const res = await axios.post(`${BASE_URL}/chat-messages`, data, { headers });

      if (res.status === 200) {
        console.log(res);
        
        const botText = res.data.answer;
        // const botHtmlText = await marked(botText);
        if (selectedChatId.value === null) {
          addNewChat(newMessage.value, res.data.conversation_id);
        }
        newMessage.value = ''; // 清除输入框文字

        const botMessage: Message = {
          id: Date.now() + 1,
          chatId: selectedChatId.value,
          text: botText,
          htmlText: botText,
          type: 'bot',
          avatar: botAvatar
        };

        allMessages.value.push(botMessage);
        scrollToBottom();

      } else {
        console.error('Error:', res.status, res.statusText);
        allMessages.value.push({
          id: Date.now() + 1,
          chatId: selectedChatId.value,
          text: '发送消息时出错',
          type: 'bot',
          avatar: botAvatar
        });
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      allMessages.value.push({
        id: Date.now() + 1,
        chatId: selectedChatId.value,
        text: '发送消息时出错',
        type: 'bot',
        avatar: botAvatar
      });
      scrollToBottom();
    }
  } else {
    console.warn('有问题');
  }
};

onMounted(() => {
  scrollToBottom();
});

</script>

<style scoped lang="scss">
.chat-app {
  flex: 4;
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  margin-left: 20px;
}

.sidebar {
  width: 200px;
  height: 100%;
  border-right: 1px solid #ccc;
  display: flex;
  padding: 0px;
  flex-direction: column;
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

  .chat-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: #f1f1f1;

      .menu-btn {
        display: block;
      }
    }

    &.selected {
      background-color: #e0e0e0;
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
  flex: 1;
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
        order: 0;
        background-color: #daf8cb;
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
        background-color: #f1f0f0;
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
  display: flex;
  padding: 16px;
  border-top: 1px solid #ccc;

  .message-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    overflow-y: auto;
  }

  button {
    margin-left: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}

.agent-list {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item {
  flex: 1;
  display: flex;
  margin-top: 10px;
  align-items: center;
  border: #0056b3 1px solid;
  background-image: url("@/assets/img/临时.png");
  background-size: contain;
  justify-content: center;
  border: 1px solid #ddd;
}
</style>
