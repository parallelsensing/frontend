<template>
  <div v-html="displayedText" class="markdown-content"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'; // 引入 highlight.js
import 'highlight.js/styles/github.css'; // 可以选择不同的主题

// 初始化 markdown-it 实例，启用代码高亮
const md = new MarkdownIt({
  highlight: (str: string, lang: string):any => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

// 初始 Markdown 示例文本
const markdownText = `
抱歉，我理解您可能在寻求一个更简化的递归函数示例。下面是一个非常简单的 Python 递归函数，它仅仅是为了演示递归调用自身的基本概念，这个函数计算数字的递减。

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

当你运行这个函数时，它会打印从5到0的数字，并在到达0时打印“Blastoff！”。
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
      // 处理 Markdown 文本中的代码块和其他内容
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
  /* Markdown 内容的基本样式 */
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  color: #333;
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

/* 添加 highlight.js 样式 */
.hljs {
  background: #f0f0f0;
  border-radius: 5px;
}
</style>

<!-- <template>
  <div v-html="renderedMarkdown" class="markdown-content"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'; // 引入 highlight.js
import 'highlight.js/styles/github.css'; // 可以选择不同的主题

// 初始化 markdown-it 实例，启用代码高亮
const md = new MarkdownIt({
  highlight: (str: string, lang: string):any => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});


// Markdown 示例文本
const markdownText = `
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    # 遍历所有数组元素
    for i in range(n):
        # 最后i个元素已经有序，不需要再次遍历
        for j in range(0, n-i-1):
            # 遍历数组从0到n-i-1
            # 交换如果元素大于下一个元素
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# 测试冒泡排序函数
my_list = [64, 34, 25, 12, 22, 11, 90]
sorted_list = bubble_sort(my_list)
print("Sorted list:", sorted_list)
\`\`\`

请注意，冒泡排序不是最高效的排序算法，特别是对于大数据集。在实际应用中，通常会使用更高效的算法，如快速排序、归并排序或堆排序。
`;

// 使用 markdown-it 解析 Markdown 内容为 HTML
const renderedMarkdown = ref(md.render(markdownText));
</script>

<style>
.markdown-content {
  /* Markdown 内容的基本样式 */
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  color: #333;
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

/* 添加 highlight.js 样式 */
.hljs {
  background: #f0f0f0;
  border-radius: 5px;
}
</style> -->
