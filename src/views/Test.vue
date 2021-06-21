<template>
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
    </el-form>
    <el-input v-model="input"></el-input>
</template>
<!-- 

    问题：为何el-form内的输入框无法输入内容
    解决：将el-form标签的status-icon ref="ruleForm"同时去掉
 -->
<script>
    import {
        ref
    } from "vue"
    export default {
        setup() {
            const ruleForm = ref({
                pass: '',
                checkPass: '',
                age: ''
            })
            const input = ref('')
            return {
                ruleForm,
                input
            };
        }
    }
</script>

<style>

</style>