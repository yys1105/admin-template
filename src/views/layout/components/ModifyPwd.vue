<script>
  import { modifyPwd } from '@/api/admin'
  export default {
    name: '',
    props: {
      visible: Boolean
    },
    data() {
      const validateRepeat = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.modifyData.password_new) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          password_old: [{ required: true, message: '请填写原密码', trigger: 'change' }],
          password_new: [{ required: true, min: 6, message: '新密码应该包含至少6个字符', trigger: 'blur' }],
          password_repeat: [{ required: true, validator: validateRepeat, trigger: 'change' }]
        },
        modifyData: {
          password_old: '',
          password_new: '',
          password_repeat: ''
        }
      }
    },
    methods: {
      submit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            modifyPwd(this.modifyData).then(response => {
              this.$emit('update:visible', false)
              this.$store.dispatch('FedLogOut').then(res => {
                this.$router.push({ name: 'login' })
              })
              this.$notify({
                title: '成功',
                message: '修改成功,请重新登录',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleClose() {
        this.$refs['dataForm'].resetFields()
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<template>
  <el-dialog
    title="修改密码"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose">
    <el-form :rules="rules" ref="dataForm" :model="modifyData" label-position="left" label-width="100px">
      <el-form-item label="原密码" prop="password_old">
        <el-input type="password" v-model="modifyData.password_old"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password_new">
        <el-input type="password" v-model="modifyData.password_new"></el-input>
      </el-form-item>
      <el-form-item label="新密码重复" prop="password_repeat">
        <el-input type="password" v-model="modifyData.password_repeat"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>


<style scoped>

</style>
