<template>
    <div class="chat-app">
      <div class="chat-window">
        <div class="message-list" ref="messageList">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message-item', message.sender]"
          >
            <div class="message-content">
              <div class="text" v-html="message.displayText"></div>
              <div v-if="message.images.length" class="images">
                <img
                  v-for="(image, imgIndex) in message.images"
                  :key="imgIndex"
                  :src="image.url"
                  class="image"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="input-area">
          <el-upload
            action=""
            :auto-upload="false"
            :file-list="imageFileList"
            :show-file-list="true"
            class="upload-button"
            :on-change="handleImageChange"
          >
            <i class="el-icon-picture"></i>
          </el-upload>
          <el-input
            v-model="chatInput"
            placeholder="输入消息..."
            class="chat-input"
            @keyup.enter="sendMessage"
            :disabled="loading"
            clearable
          />
          <el-button
            type="primary"
            @click="sendMessage"
            :loading="loading"
            class="send-button"
          >
            {{ (this.chatInput.trim() || this.imageFileList.length) ? '发送' : '归档' }}
          </el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
    complaint: {
      type: Object,
      required: true
    }
  },
    data() {
      return {
        chatInput: '',
        imageFileList: [],
        messages: [],
        loading: false,
      };
    },
    methods: {
        handleImageChange(file, fileList) {
            this.imageFileList = fileList;  // 更新图片文件列表
        },
      sendMessage() {
        if (this.chatInput.trim() || this.imageFileList.length) {
          const userMessage = {
            sender: 'user',
            text: this.chatInput.trim(),
            images: this.imageFileList.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file.raw)  // 确保图片可以被预览
          })),
            displayText: this.escapeHTML(this.chatInput.trim()),
          };
          this.messages.push(userMessage);
          this.chatInput = '';
          this.imageFileList = [];
          this.scrollToBottom();
  
          this.loading = true;
          this.generateSystemResponse(userMessage.text);
        } else {
          this.$emit('archive', this.complaint.id); 
        }
      },
      generateSystemResponse() {
    const responseText = `浒苔（Enteromorpha）是一种常见的绿藻，通常生长在沿海潮间带的潮湿环境中。当其大量繁殖时，容易形成所谓的“绿毯”，影响海滩的景观和使用。浒苔的泛滥可能会导致海滩的生态系统失衡，并对当地居民的日常活动造成困扰。根据《海洋环境保护法》第三十七条规定，海洋环境污染和生态破坏的管理由海洋局负责。因此，处理浒苔泛滥问题的责任在于海洋局。我们将尽快将您的投诉转达给海洋局，并督促其采取必要措施来解决这一问题。感谢您的反馈和关注。`;

    const tooltipContent = '《海洋环境保护法》第三十七条：沿海各级地方人民政府应当采取措施，防止和治理海洋污染。';

    // 构建系统消息对象，包含响应文本和带有信息图标的 HTML
    const systemMessage = {
      sender: 'system',
      text: responseText,
      images: [],
      displayText: '', // 逐字显示的文本会逐步填充这个字段
    };
    
    // 将消息添加到消息列表
    this.messages.push(systemMessage);

    // 模拟打字效果逐字显示
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < responseText.length) {
        systemMessage.displayText = this.escapeHTML(
          responseText.substring(0, index)
        );

        // 如果到达《海洋环境保护法》第三十七条的位置，插入带有悬停提示的图标
        if (index >= responseText.indexOf('《海洋环境保护法》第三十七条')) {
          systemMessage.displayText = systemMessage.displayText.replace(
            '《海洋环境保护法》第三十七条',
            `<span class="info-icon">《海洋环境保护法》第三十七条<i class="el-icon-info" title="${this.escapeHTML(tooltipContent)}" style="margin-left: 5px; cursor: pointer;"></i></span>`
          );
        }
        
        index++;
        this.scrollToBottom();
      } else {
        clearInterval(typingInterval);
        this.loading = false;
      }
    }, 50); // 调整速度以达到理想的打字效果
  },
      initializeWithComplaint(complaint) {
        // 初始化聊天界面，显示投诉内容作为首条消息
        const complaintMessage = {
          sender: 'user',
          text: complaint.summary,
          images: complaint.image ? [{
            name: complaint.image,
            url: complaint.image  // 确保图片可以被预览
            }] : [],  // 如果有图片，将图片包含在消息中
          displayText: this.escapeHTML(complaint.summary),
        };
        this.messages = [complaintMessage];
        this.scrollToBottom();
        this.generateSystemResponse(complaintMessage.text);
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const messageList = this.$refs.messageList;
          messageList.scrollTop = messageList.scrollHeight;
        });
      },
      escapeHTML(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      },
    }
  };
  </script>
  
  <style scoped>
  .chat-app {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .chat-window {
    background-color: #fff;
    width: 100%;
    max-width: 600px;
    height: 100%;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .message-list {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #e5ddd5;
  }
  
  .message-item {
    display: flex;
    margin-bottom: 10px;
  }
  
  .message-item.user {
    justify-content: flex-end;
  }
  
  .message-item.system {
    justify-content: flex-start;
  }
  
  .message-content {
    max-width: 70%;
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
    overflow: hidden;
  }
  
  .message-item.user .message-content {
    background-color: #dcf8c6;
  }
  
  .text {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
  }
  
  .images {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
  }
  
  .image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
    margin: 5px 5px 0 0;
  }
  
  .input-area {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ddd;
  }
  
  .upload-button {
    margin-right: 10px;
    cursor: pointer;
  }
  
  .upload-button .el-icon-picture {
    font-size: 24px;
    color: #606266;
  }
  
  .chat-input {
    flex: 1;
    margin-right: 10px;
  }
  
  .send-button {
    width: 80px;
  }
  </style>
  