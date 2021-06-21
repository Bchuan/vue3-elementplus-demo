import { ref } from 'vue'

/* 登录 */
interface User {
    email: string;
    password: string;
}

interface Rules {
    email: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
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

export const loginUser = ref<User>({
    email: "",
    password: ""
})

//校验规则
export const rules = ref<Rules>({
    email: [{
        type: "email",
        message: "Email is incorrect...",
        required: true,
        trigger: "blur"
    }],
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

/* 注册 */
interface ReUser {
    name: string;
    email: string;
    password: string;
    password2: string;
    role: string;
}

interface ReRules{
    name: ({
        message: string;
        required: boolean;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
    })[];
    email: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
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
    password2: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    } | {
        validator:(rule: ReRules, value: String, callback: any) => void
    })[];
}

export const registerUser = ref<ReUser>({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: ""
});

const validatePass2 = (rule: ReRules, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerUser.value.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

export const registerRules = ref<ReRules>({
    name: [{
        required: true,
        message: "Name could not be empty...",
        trigger: "blur"
    }, {
        min: 2, max: 30, message: "Name`s length has to be 2 to 30 characters..."
    }],
    email: [{
        type: "email",
        message: "Email is incorrect...",
        required: true,
        trigger: "blur"
    }],
    password: [{
        required: true,
        message: "Password could not be empty...",
        trigger: "blur"
    }, {
        min: 6,
        max: 30,
        message: "Password`s length has to be 6 to 30 characters...",
        trigger: "blur"
    }],
    password2: [{
        required: true,
        message: "Password could not be empty...",
        trigger: "blur"
    }, {
        min: 6,
        max: 30,
        message: "Password`s length has to be 6 to 30 characters...",
        trigger: "blur"
    }, {
        validator: validatePass2,
        message: "两次输入的密码不一致",
        trigger: "blur"
    }]
})
