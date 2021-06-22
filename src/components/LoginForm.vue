<template>
    <el-form
        ref="loginForm"
        :model="loginUser"
        :rules="rules"
        label-width="100px"
        class="loginForm sign-in-form"
    >
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="Enter Email..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" type="password" placeholder="Enter Password..."></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="submit-btn" @click="handleLogin('loginForm')">提交</el-button>
        </el-form-item>
        <!-- 找回密码 -->
        <div class="tiparea" @click="handleForgetPassword()">
            <p>
                忘记密码？
                <a>立即找回</a>
            </p>
        </div>
    </el-form>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
export default {
    props: {
        loginUser: {
            type: Object,
            required: true
        },
        rules: {
            type: Object,
            required: true
        }
    },
    setup(props: any) {
        // @ts-ignore
        const { ctx, appContext } = getCurrentInstance(); // 获取当前实例，相当于vue2中的this
        const router = useRouter();
        const globalProperties = appContext.config.globalProperties;
        //触发登录方法
        const handleLogin = (formName: String) => {
            // console.log(ctx) //相当于this
            ctx.$refs[formName].validate((valid: Boolean) => {
                if (valid) {
                    globalProperties.$http.post("/api/v1/auth/login", props.loginUser)
                        .then((res: any) => {
                            globalProperties.$message({
                                message: "登录成功",
                                type: "success",
                            })
                            //登录成功，存储token
                            const { token } = res.data;
                            localStorage.setItem("msToken", token);
                            router.push('/')
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
        const handleForgetPassword = () => {
            router.push('/forgetpassword')
        }
        return {
            handleLogin，
            handleForgetPassword
        }
    }
}
</script>
<style scoped>
/* login */
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}

.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}

.tiparea p a {
    color: #409eff;
}
</style>
