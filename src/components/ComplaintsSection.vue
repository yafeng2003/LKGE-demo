<template>
  <div class="complaints-section">
    <el-table :data="complaints" style="width: 100%" stripe>
      <el-table-column prop="complainant" label="投诉人" width="150"/>
      <el-table-column prop="time" label="时间" width="180"/>
      <el-table-column prop="category" label="事务门类" width="150"/>
      <el-table-column label="简要内容">
    <template slot-scope="scope">
      <div style="display: flex; align-items: center;">
        <el-image
          v-if="scope.row.image"
          :src="scope.row.image"
          :preview-src-list="[scope.row.image]"
          style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;"
        />
        <span>
        {{ scope.row.summary.length > 50 ? scope.row.summary.slice(0, 50) + '...' : scope.row.summary }}
      </span>
      </div>
    </template>
  </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-button 
          :disabled="scope.row.archived" 
          @click="editComplaint(scope.row)" 
          size="mini"
        >
          {{ scope.row.archived ? '已归档' : '回复' }} <!-- 动态显示按钮文本 -->
        </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
  return {
    complaints: [
      {
        id: 1,
        complainant: '王先生',
        time: '2024-08-27 10:00',
        category: '生态',
        summary: '海滩上的浒苔大面积地繁殖，严重影响了海边的景观，还给日常生活带来了很多困扰，比如散步和游泳变得非常困难，请有关部门尽快处理这个问题！',
        image: require('@/assets/浒苔.jpg'),  // Assuming the image is stored in the assets folder
        archived: false
      },
      {
        id: 2,
        complainant: '李四',
        time: '2024-08-27 11:00',
        category: '教育',
        summary: '学校教学设施不足',
        image: null,  // No image for this complaint
        archived: false
      }
      // Here you can add more complaint data
    ]
  };
},
  methods: {
    editComplaint(complaint) {
      this.$emit('edit', complaint);
    },
    archiveComplaint(complaintId) {
      const complaint = this.complaints.find(c => c.id === complaintId);
      if (complaint) {
        complaint.archived = true;
      }
    }
  }
};
</script>

<style scoped>
.complaints-section {
  margin: 20px;
}
</style>
