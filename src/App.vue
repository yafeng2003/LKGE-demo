<template>
  <el-container class="app-container">
    <el-header>
      <navigation-menu :active-menu="activeMenu" @select="handleMenuSelect" />
    </el-header>

    <el-main>
      <complaints-section 
      v-if="activeMenu === 'complaints'" 
      @edit="openChatWithComplaint" 
      ref="complaintsSection" />
      <knowledge-graph-section v-if="activeMenu === 'knowledge'" />
      <chat-section 
      v-if="activeMenu === 'chat'" 
      ref="chatSection" 
      :complaint="currentComplaint"
      @archive="archiveComplaint" />
    </el-main>
  </el-container>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue';
import ComplaintsSection from './components/ComplaintsSection.vue';
import KnowledgeGraphSection from './components/KnowledgeGraphSection.vue';
import ChatSection from './components/ChatSection.vue';

export default {
  components: {
    NavigationMenu,
    ComplaintsSection,
    KnowledgeGraphSection,
    ChatSection
  },
  data() {
    return {
      activeMenu: 'complaints',  // 默认显示“投诉”界面
      currentComplaint: null,  // 当前的投诉
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index;
    },
    openChatWithComplaint(complaint) {
      this.activeMenu = 'chat';
      this.currentComplaint = complaint;
      this.$nextTick(() => {
    if (this.$refs.chatSection) {
      this.$refs.chatSection.initializeWithComplaint(complaint);
    } else {
      console.error("ChatSection component is not mounted");
    }
  });
    },
    archiveComplaint(complaintId) {
      this.$refs.complaintsSection.archiveComplaint(complaintId);
      this.activeMenu = 'complaints';
    }
  }
};
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
