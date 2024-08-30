<template>
    <div class="knowledge-section">
      <el-button type="primary" @click="openCreateDialog">创建新图谱</el-button>
      <el-table :data="graphs" style="width: 100%" stripe>
        <el-table-column prop="name" label="图谱名称" width="200"/>
        <el-table-column prop="description" label="图谱描述" />
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button @click="openUploadDialog(scope.row)" size="mini">上传文件</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 创建图谱对话框 -->
      <el-dialog
        title="创建新图谱"
        :visible.sync="createDialogVisible"
        width="40%"
        @close="resetCreateForm"
      >
        <el-form :label-position="labelPosition" label-width="120px">
          <el-form-item label="图谱名称">
            <el-input v-model="newGraphName" placeholder="请输入图谱名称"></el-input>
          </el-form-item>
  
          <el-form-item label="描述">
            <el-input type="textarea" v-model="newGraphDescription" rows="4" placeholder="请输入图谱描述"></el-input>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="createGraph">创建图谱</el-button>
            <el-button @click="createDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  
      <!-- 文件上传对话框 -->
      <el-dialog
        title="上传文件"
        :visible.sync="uploadDialogVisible"
        width="40%"
        @close="resetUpload"
      >
        <el-form :label-position="labelPosition" label-width="120px">
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :file-list="fileList"
              :on-change="onFileChange"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
            >
              <i class="el-icon-upload"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="uploadFiles">上传</el-button>
            <el-button @click="uploadDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      graphs: Array,
      labelPosition: String
    },
    data() {
      return {
        newGraphName: '',
        newGraphDescription: '',
        fileList: [],
        createDialogVisible: false,
        uploadDialogVisible: false,
        currentGraph: null
      };
    },
    methods: {
      openCreateDialog() {
        this.createDialogVisible = true;
      },
      createGraph() {
        if (this.newGraphName && this.newGraphDescription) {
          this.$emit('create-graph', {
            name: this.newGraphName,
            description: this.newGraphDescription
          });
          this.resetCreateForm();
          this.$message.success('图谱创建成功！');
        } else {
          this.$message.error('请填写图谱名称和描述');
        }
      },
      openUploadDialog(graph) {
        this.currentGraph = graph;
        this.uploadDialogVisible = true;
      },
      onFileChange(file, fileList) {
        this.fileList = fileList;
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handlePreview(file) {
        const url = URL.createObjectURL(file.raw);
        window.open(url, '_blank');
      },
      uploadFiles() {
        if (this.fileList.length > 0) {
          this.$emit('upload-files', this.fileList);
          this.resetUpload();
        } else {
          this.$message.error('请上传文件');
        }
      },
      resetCreateForm() {
        this.newGraphName = '';
        this.newGraphDescription = '';
      },
      resetUpload() {
        this.fileList = [];
      }
    }
  };
  </script>
  
  <style scoped>
  .knowledge-section {
    margin-top: 20px;
  }
  
  .upload-demo {
    border: 2px dashed #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    line-height: 120px;
    font-size: 24px;
    color: #409EFF;
    display: inline-block;
    width: 120px;
    height: 120px;
  }
  </style>
  