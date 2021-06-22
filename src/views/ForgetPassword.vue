<template>
    <el-form
        :model="email"
        :rules="rules"
        ref="forgetpassword"
        label-width="100px"
        class="container"
    >
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="email.email" placeholder="Enter Email..."></el-input>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                class="submit-btn"
                @click="handleForgetPassword('forgetpassword')"
            >找回密码</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from 'vue'
export default {
    setup(props: any) {
        // @ts-ignore
        const { ctx, appContext } = getCurrentInstance();
        const globalProperties = appContext.config.globalProperties;

        interface Email {
            email: string;
        }
        const email = ref<Email>({
            email: ""
        });
        interface Rules {
            email: {
                type: string;
                message: string;
                required: boolean;
                trigger: string;
            }[];
        }
        const rules = ref<Rules>({
            email: [{
                type: "email",
                message: "Email is incorrect...",
                required: true,
                trigger: "blur"
            }]
        })
        const handleForgetPassword = (formName: String) => {
            ctx.$refs[formName].validate((valid: Boolean) => {
                if (valid) {
                    globalProperties.$http.post("/api/v1/auth/forgetpassword", { email: email.value.email })
                        .then((res: any) => {
                            globalProperties.$message({
                                message: "邮件发送成功，请接收",
                                type: "success",
                            })
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
        return {
            email,
            rules,
            handleForgetPassword
        }
    }
}
</script>
<style scoped>
.container {
    padding: 100px;
    width: 50%;
    margin: 0 auto;
}
.submit-btn {
    width: 100%;
}
</style>
