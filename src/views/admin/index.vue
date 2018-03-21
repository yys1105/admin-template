<script>
  import waves from '@/directive/waves'
  import { adminList, adminUpdate, resetPassword, changeStatus, adminDelete, adminCreate } from '@/api/admin'
  export default {
    name: '',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        listQuery: {
          page: 1,
          per_page: 10
        },
        listLoading: true,
        list: null,
        total: null,
        dialogVisible: false,
        rules: {
          username: [{ required: true, message: '请输入你的登录名', trigger: 'change' }],
          name: [{ required: true, message: '请输入你的姓名', trigger: 'change' }],
          password: [{ required: true, message: '请输入你的密码', trigger: 'change' }]
        },
        form:{
          id: '',
          username: '',
          name: '',
          password: ''
        },
        dialogStatus: '',
        textMap: {
          update: '修改管理员',
          create: '创建管理员',
          modifyPassword: '修改密码'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        adminList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.pagination.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.per_page = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      showDialog(row, type) {
        this.dialogVisible = true
        this.dialogStatus = type
        this.form = {
          id: row.id,
          username: row.username,
          name: row.name,
          password: ''
        }
      },
      closeDialog() {
        this.resetForm('dataForm')
      },
      resetForm(formName) {
        this.$refs[formName].clearValidate()
        this.$refs[formName].resetFields()
      },
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            adminCreate(this.form).then(response => {
              this.dialogVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            adminUpdate(this.form).then(response => {
              this.dialogVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      modifyPasswordData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            resetPassword(this.form).then(response => {
              this.dialogVisible = false
              this.$notify({
                title: '成功',
                message: '重置密码成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      updateStatus(row, status) {
        changeStatus({
          id: row.id,
          status
        }).then(response => {
          this.$notify({
            title: '成功',
            message: '修改状态成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      },
      userDelete(row) {
        this.$alert('是否确认删除该用户', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if(action === 'confirm') {
              adminDelete({ id: row.id }).then(response => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              })
            }
          }
        })
      }
    }
  }
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-edit" @click="showDialog({id: '', username: '', name: '', password: ''}, 'create')">新增</el-button>
    </div>
    <el-table :key="tableKey" :data="list" v-loading="listLoading"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="登录名">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理员姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="95" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">正常</span>
          <span v-if="scope.row.status!==0">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="390">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDialog(scope.row,'update')">更新</el-button>
          <!--<el-button type="success" size="mini">授权</el-button>-->
          <el-button type="warning" size="mini" @click="showDialog(scope.row,'modifyPassword')">重置密码</el-button>
          <el-button v-if="scope.row.status===0" type="danger" size="mini" @click="updateStatus(scope.row,'10')">禁用</el-button>
          <el-button v-if="scope.row.status===10" type="success" size="mini" @click="updateStatus(scope.row,'0')">启用</el-button>
          <el-button size="mini" @click="userDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.per_page" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" @close="closeDialog">
      <el-form :rules="rules" ref="dataForm" :model="form" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item v-if="dialogStatus=='create'||dialogStatus=='update'" label="登录名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'||dialogStatus=='update'" label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'||dialogStatus=='modifyPassword'" label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" v-if="dialogStatus=='create'" @click="createData">创建</el-button>
        <el-button type="primary" v-if="dialogStatus=='update'" @click="updateData">修改</el-button>
        <el-button type="primary" v-if="dialogStatus=='modifyPassword'" @click="modifyPasswordData">修改密码</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<style scoped>

</style>
