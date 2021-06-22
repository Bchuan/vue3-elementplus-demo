<template>
    <el-form
        :model="password"
        :rules="rules"
        ref="forgetpassword"
        label-width="100px"
        class="container"
    >
        <el-form-item label="密码" prop="email">
            <el-input v-model="password.password" placeholder="Enter Email..."></el-input>
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
import { useRouter, useRoute } from 'vue-router'
export default {
    setup(props: any) {
        // @ts-ignore
        const { ctx, appContext } = getCurrentInstance();
        const globalProperties = appContext.config.globalProperties;
        const router = useRouter();
        const route = useRoute();//获取路由参数
        console.log(route.params.id);

        interface Password {
            password: string;
        }
        const password = ref<Password>({
            password: ""
        });
        interface Rules {
            password: ({
                required: boolean;
                message: string;
                trigger: string;
            } | {
                min: number;
                max: number;
                message: string;
                trigger: string;
            })[];
        }
        const rules = ref<Rules>({
            password: [{
                required: true,
                message: "Password could not be empty...",
                trigger: "blur"
            }, {
                min: 6,
                max: 30,
                message: "Password`s length has to be 6 to 30 characters...",
                trigger: "blur"
            }]
        })
        const handleForgetPassword = (formName: String) => {
            ctx.$refs[formName].validate((valid: Boolean) => {
                if (valid) {
                    globalProperties.$http.post("/api/v1/auth/resetpassword" + route.params.id, { password: password.value.password })
                        .then((res: any) => {
                            globalProperties.$message({
                                message: "密码重置成功",
                                type: "success",
                            })
                            router.push('/login');
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
        return {
            password,
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
