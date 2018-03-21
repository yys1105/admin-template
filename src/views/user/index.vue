<script>
  import waves from '@/directive/waves'
  import { userList, userView } from '@/api/user'

  export default {
    name: '',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 10,
          cellphone: '',
          name: ''
        },
        dialogFormVisible: false,
        details: {
          cellphone: '',
          name: '',
          access_token: '',
          status: null,
          created_at: '',
          updated_at: ''
        }
      }
    },
    methods: {
      handleFilter() {
        this.getList()
      },
      reset() {
        this.listQuery = {
          cellphone: '',
          name: ''
        }
      },
      getList() {
        this.listLoading = true
        userList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.pagination.total
          this.listLoading = false
        })
      },
      showDialog(row) {
        userView({ id: row.id }).then(response => {
          this.details = response.data
          this.dialogFormVisible = true
        })
      },
      handleSizeChange(val) {
        this.listQuery.per_page = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px" class="filter-item" placeholder="手机号" v-model="listQuery.cellphone"></el-input>
      <el-input style="width: 200px" class="filter-item" placeholder="姓名" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" v-waves type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" v-waves icon="el-icon-edit" @click="reset">重置</el-button>
    </div>

    <el-table :key="tableKey" :data="list" v-loading="listLoading"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.cellphone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">正常</span>
          <span v-if="scope.row.status!==0">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDialog(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.per_page" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="用户详情" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="手机号码">{{ details.cellphone }}</el-form-item>
        <el-form-item label="用户名">{{ details.name }}</el-form-item>
        <el-form-item label="状态">{{ details.status===0?'正常':'禁用' }}</el-form-item>
        <el-form-item label="创建时间">{{ details.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-form-item>
        <el-form-item label="修改时间">{{ details.updated_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<style scoped>

</style>
