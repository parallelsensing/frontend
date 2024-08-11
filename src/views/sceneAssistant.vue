<template>
  <div>
    <div class="header-container">
      <headersall> </headersall>
    </div>

    <div class="main-container">
      <!-- 智能体列表 -->
      <div class="agent-list">
        <v-list lines="one" class="agent-list-background">
          <v-list-item v-for="item in items" :key="item.id" style="padding:0;" @click="handleClick(item)">
            <div class="agent-item-container">
              <div class="agent-item-image">
                <img :src="item.image" class="agent-item-image-content" />
              </div>

              <div class="agent-item-content"
                :class="{ selected: item.id === selectedAgent.id, unselected: item.id !== selectedAgent.id }">
                <v-list-item-title class="agent-item-title">{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="agent-item-title">{{ item.subtitle
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
            <div class="tip-container" v-show="tipShow">
              <h1 class="tip-title">您好！您可以这样问我</h1>
              <div v-for="(question, index) in selectedAgent.questions" :key="index">
                <h1 class="tip-question">：{{ question }}
                  <v-icon icon="mdi-star-check-outline"></v-icon>
                </h1>
              </div>
            </div>
            <!-- 聊天对话列表 -->
            <div v-for="message in messageList" :key="message.id" :class="['message', message.type]">
              <img :src="message.avatar" class="avatar" />
              <div>
                <div class="text" v-html="message.htmlText || message.text"></div>
                <template v-if="message.type === 'bot'">
                  <v-btn size="small" variant="text" icon="mdi-content-copy" @click="copyText(message.text)" />
                  <v-btn size="small" variant="text" icon="mdi-cached" />
                  <v-btn size="small" variant="text" icon="mdi-share" />
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
            <div class="send-button-container">
              <v-btn v-if="!isStreaming" variant="text" class="send-button" @click="sendMessage" :style="{ minWidth: '48px', minHeight: '48px', padding: '0' }">
                <v-icon size="48px" color="#920783">mdi-send-circle</v-icon>
              </v-btn>
              <v-btn v-if="isStreaming" variant="text" class="send-button" @click="stopMessage" :style="{ minWidth: '48px', minHeight: '48px', padding: '0' }">
                <v-icon size="48px" color="#920783">mdi-stop-circle-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="sidebar">
          <!-- 当前智能体 -->
          <div class="current-agent-container">
            <div class="current-agent-image">
              <img :src="selectedAgent.image" class="current-agent-image-content" />
            </div>
            <div class="current-agent-content">
              <v-list-item-title class="current-agent-title">{{ selectedAgent.title }}</v-list-item-title>
              <v-list-item-subtitle class="current-agent-subtitle">{{ selectedAgent.subtitle }}</v-list-item-subtitle>
            </div>
          </div>
          <el-divider class="divider" />

          <!-- 发起新聊天按钮 -->
          <div class="new-chat-button" @click="startNewChat">
            发起新聊天
            <v-icon icon="mdi-invoice-text-plus-outline"></v-icon>
          </div>

          <!-- 会话列表 -->
          <ul class="chat-list">
            <li v-for="chat in chatList" :key="chat.id"
              :class="['chat-item', { 'selected': chat.conversation_id === selectedChatId, 'menu-selected': menuVisible[chat.id] }]"
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
import { ref, onMounted, nextTick, computed } from 'vue';
import headersall from "./header-all.vue";
import { MessageItem, Chat, ListItem } from '@/type/assistant';
import useSceneAssistantStore from '@/stores/sceneAssistant/modules/sceneAssistant';

const SceneAssistantStore = useSceneAssistantStore();
const isStreaming = ref(false);
const newMessage = ref('');
const editingChatId = ref<string | null>(null);
const menuVisible = ref<{ [key: number]: boolean }>({});
const dialog = ref(false);
const inputText = ref('');
const messages = ref<HTMLElement | null>(null);

const tipShow = computed(() => !messageList.value || messageList.value.length === 0);
const selectedChatId = computed(() => SceneAssistantStore.selectedChatId);
const messageList = computed(() => SceneAssistantStore.messageList);
const chatList = computed(() => SceneAssistantStore.chatList);
const items = computed(() => SceneAssistantStore.items);
const selectedAgent = computed(() => SceneAssistantStore.selectedAgent);

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
  SceneAssistantStore.toggleAgent(item);
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

const toggleMenu = (chat: Chat) => {
  menuVisible.value = { ...menuVisible.value, [chat.id]: !menuVisible.value[chat.id] };
};

const menuAction = (action: string, chat: Chat) => {
  switch (action) {
    case 'rename':
      dialog.value = true;
      editingChatId.value = chat.conversation_id;
      break;
    case 'delete':
      deleteChat(chat.conversation_id);
      break;

    case 'share':
      console.log(`Sharing chat ${chat.conversation_id}`);
      break;
    default:
      break;
  }
  menuVisible.value[chat.id] = false;
};

/**重命名会话 */
const saveChatName = async () => {
  dialog.value = false;
  SceneAssistantStore.renameChat(inputText.value, editingChatId.value);
  inputText.value = '';
  conversationListMessage();
}

/**删除会话 */
const deleteChat = async (chatId: string) => {
  await SceneAssistantStore.deChat(chatId);
  conversationListMessage();
  startNewChat();
};

/**复制内容 */
const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

/**点击新建一个会话（初始化清空） */
const startNewChat = () => {
  SceneAssistantStore.newChat();
};

/**切换到某一个会话 */
const selectChat = (chatId: string) => {
  historyMessage(chatId);
  SceneAssistantStore.changeChat(chatId);
};

/**获取历史会话消息 */
const historyMessage = async (chatId: string) => {
  await SceneAssistantStore.getHistoryMessage(chatId);
  scrollToBottom();
};

/**获取会话列表 */
const conversationListMessage = async () => {
  await SceneAssistantStore.getConverListMessage();
};

/**下一轮建议问题列表 (未完成！！！！！！！！！)*/
const suggestedMessage = async (message_id: string) => {
  const questionList = await SceneAssistantStore.suggestedNextMessage(message_id);
  console.log(questionList);
};

/**消息反馈 */
const feedbackMessage = async (message: MessageItem, feedback: string) => {
  SceneAssistantStore.feedbaMessage(message.message_id, feedback);
}

/**停止响应 */
const stopMessage = async () => {
  SceneAssistantStore.stopResponese();
}

/**发送信息给bot */
const sendMessage = async () => {
  if (newMessage.value.trim() !== '') {
    isStreaming.value = true;// 发送按钮图标开启流式响应样式
    const deepCopy = JSON.parse(JSON.stringify(newMessage.value));
    newMessage.value = '';
    scrollToBottom();
    await SceneAssistantStore.getSendMessage(deepCopy);
    scrollToBottom();
    isStreaming.value = false;// 发送按钮图标关闭流式响应样式
  } else {
    console.warn('有问题');
  }
};

onMounted(() => {
  conversationListMessage();
});

</script>