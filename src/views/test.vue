<template>
  <div v-html="displayedText" class="markdown-content"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 初始化 markdown-it 实例，启用代码高亮
const md = new MarkdownIt({
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 为代码块添加复制按钮
        const highlightedCode = hljs.highlight(str, { language: lang }).value;
        return `
          <div class="code-block">
            <button class="copy-button" onclick="copyToClipboard(this)">复制</button>
            <pre class="hljs"><code>${highlightedCode}</code></pre>
          </div>
        `;
      } catch (_) {}
    }
    return `
      <div class="code-block">
        <button class="copy-button" onclick="copyToClipboard(this)">复制</button>
        <pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>
      </div>
    `;
  },
});

// 添加全局的复制函数
window.copyToClipboard = (button: HTMLButtonElement) => {
  const codeElement = button.nextElementSibling?.querySelector('code');
  if (codeElement) {
    navigator.clipboard.writeText(codeElement.textContent || '').then(() => {
      button.textContent = '已复制';
      setTimeout(() => {
        button.textContent = '复制';
      }, 2000);
    }).catch(err => {
      console.error('复制失败:', err);
    });
  }
};

// 初始 Markdown 示例文本
const markdownText = `
这是一个简单的 Python 递归函数示例：

\`\`\`python
def countdown(n):
    if n <= 0:  # 递归的基本情况（停止条件）
        print("Blastoff!")
    else:
        print(n)
        countdown(n-1)  # 递归调用

# 使用示例
countdown(5)
\`\`\`

运行这个函数时，它会打印从5到0的数字，并在到达0时打印“Blastoff！”。
`;

// 用于逐字生成的文本
const displayedText = ref('');

// 将 Markdown 文本解析为 HTML
const renderMarkdown = (text: string) => {
  return md.render(text);
};

// 动态生成文本
const typeText = () => {
  let index = 0;
  let buffer = '';
  const interval = setInterval(() => {
    if (index < markdownText.length) {
      buffer += markdownText[index];
      displayedText.value = renderMarkdown(buffer);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 50); // 调整生成速度
};

// 在组件挂载时开始生成文本
onMounted(() => {
  typeText();
});
</script>

<style>
.markdown-content {
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.code-block {
  position: relative;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.copy-button:hover {
  background-color: #0056b3;
}

.hljs {
  background: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
}

.markdown-content pre {
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.markdown-content code {
  background-color: #f5f2f0;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
