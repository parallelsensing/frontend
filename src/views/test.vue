<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadFile">上传文件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const selectedFile = ref<File | null>(null);

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
      }
    };

    const uploadFile = async () => {
      if (!selectedFile.value) {
        alert('请选择一个文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile.value);
      formData.append('user', 'abc-123');  // 替换为你的用户ID

      try {
        const response = await fetch('http://10.11.37.112:5001/v1/files/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer app-5muy7p6a7PL8lOk0RKTUMmE7`,  // 替换为你的API密钥
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`上传失败，状态码：${response.status}`);
        }

        const data = await response.json();
        console.log('上传成功:', data);
      } catch (error) {
        console.error('上传失败:', error);
      }
    };

    return {
      handleFileChange,
      uploadFile,
    };
  },
});
</script>
