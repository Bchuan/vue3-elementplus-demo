<template>
    <el-form
        ref="registerForm"
        :model="registerUser"
        :rules="registerRules"
        label-width="100px"
        class="registerForm sign-up-form"
    >
        <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="Enter name..."></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="Enter Email..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input
                v-model="registerUser.password"
                type="password"
                placeholder="Enter Password..."
            ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
            <el-input
                v-model="registerUser.password2"
                type="password"
                placeholder="Enter Password again..."
            ></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="role">
            <el-select v-model="registerUser.role" placeholder="请选择身份">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="用户" value="user"></el-option>
                <el-option label="游客" value="visitor"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="submit-btn" @click="handleregister('registerForm')">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
export default {
    props: {
        registerUser: {
            type: Object,
            required: true
        },
        registerRules: {
            type: Object,
            required: true
        }
    },
    setup(props: any) {
        // @ts-ignore
        const { ctx, appContext } = getCurrentInstance(); // 获取当前实例，相当于vue2中的this
        const router = useRouter();
        const globalProperties = appContext.config.globalProperties;

        // 触发注册方法
        const handleregister = (formName: String) => {
            ctx.$refs[formName].validate((valid: Boolean) => {

                /*

                    问题1、 Could not proxy request /v1/auth/register from localhost:8080 to https://imissu.herokuapp.com/api/.
                    初步估计：是代理的问题【接口问题，接口无法访问】
                */

                if (valid) {//https://imissu.herokuapp.com/api/v1/auth/register
                    globalProperties.$http.post("/api/v1/auth/register", props.registerUser)
                        .then((res: any) => {
                            globalProperties.$message({
                                message: "登录成功",
                                type: "success",
                            })
                            //登录成功，存储token
                            const { token } = res.data;
                            localStorage.setItem("msToken", token);
                            // 路由跳转
                            router.push("/") //以前vue2使用this.$router.push()
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
        return {
            handleregister
        }
    }
}

</script>
