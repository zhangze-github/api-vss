<template>
    <div class="test">
        <a-form layout="horizontal" :model="form" v-bind="formItemLayout">
            <a-form-item label="请输入公司名称">
                <a-input v-model:value="form.companyName" placeholder="华为技术有限公司"/>
            </a-form-item>
            <a-form-item label="请输入后端代理路径">
                <a-input v-model:value="form.proxyPath" placeholder="https://hello.com"/>
            </a-form-item>
            <a-form-item label="配置请求JSON">
                <a-textarea
                    @on-keydown="textareaTab"
                    v-model:value="form.ajaxJson"
                    :rows="15"
                    :placeholder="
                    `feDisplacementMapfds
                    fdsa

                    fdsafds
                    `
                "/>
            </a-form-item>
            <a-row span="24" class="err-json">
                <a-col span="4"></a-col>
                <a-col span="14" v-if="!isJson">请输入正确的JSON格式</a-col>
            </a-row>
            <a-row span="24">
                <a-col span="4"></a-col>
                <a-col span="14">
                    <a-button type="primary" @click="submit">
                        保存
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="push">
                        取消
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>

import {Form, Input, Button, Radio, Row, Col, message} from 'ant-design-vue';
import {trim, set} from 'lodash-es';
import axios from 'axios';
import {getQuery} from "@/util/utils";

export default {
    name: "Index",
    components: {
        "a-form": Form,
        "a-form-item": Form.Item,
        "a-input": Input,
        "a-textarea": Input.TextArea,
        "a-button": Button,
        "a-row": Row,
        "a-col": Col,
    },
    data() {
        return {
            form: {
                companyName: '',
                proxyPath: '',
                ajaxJson:

`[
    {
        "method": "GET",
        "path": "/testget",
        "headers": {
            "ffdsaf": "fdsafd"
        },
        "query": "fdasfd=fdasfds"
    },
     {
        "method": "POST",
        "path": "/testpost",
        "headers": {
            "fdasfdpost": "post"
        },
        "body": {
            "postboyd": "fdsafd"
        }
    }
]`,

            },
            isJson: true,
            id: getQuery('id'),
        };
    },
    mounted() {
        if(getQuery('id')){
            axios.post('/api/getDetail', {id: getQuery('id')}).then(res => {
                console.log(res.data)
                let {companyName, proxyPath, ajaxJson} = res.data;
                this.form.companyName = companyName;
                this.form.proxyPath = proxyPath;
                this.form.ajaxJson = ajaxJson;
            })
        }
    },
    methods: {
        push(){
            this.$router.push('/');
        },
        textareaTab (e) {
            // if (e.keyCode === 9) {
            //     if (!this.form.ajaxJson) this.form.ajaxJson = ''
            //     this.form.ajaxJson+= '\t'
            //     // 阻止默认切换元素的行为
            //     if (e && e.preventDefault) {
            //         e.preventDefault()
            //     } else {
            //         window.event.returnValue = false
            //     }
            // }
        },
        isJsonString(str) {
            try {
                JSON.parse(str)
                return true
            } catch (err) {
                return false
            }
        },
        submit() {
            let {companyName, proxyPath, ajaxJson} = this.form;
            companyName = trim(companyName);
            proxyPath = trim(proxyPath);
            if(!companyName){
                message.error('请输入公司名称')
                return;
            }
            if(!proxyPath){
                message.error('请输入代理路径')
                return;
            }
            if(!ajaxJson){
                message.error('请配置请求JSON')
                return;
            }
            if(!this.isJsonString(ajaxJson)){
                message.error('请配置正确的请求JSON')
                return;
            }
            let params = {
                companyName,
                proxyPath,
                ajaxJson,
            }
            if(this.id){
                set(params, 'id', this.id);
            }
            axios.post('/api/setDetail', params).then(res => {
                console.log(res)
                message.success('保存成功');
                this.$router.push('/');
            })
        },
    },
    watch: {
        "form.ajaxJson": function (value) {
            if (this.isJsonString(value)) {
                this.isJson = true;
            } else {
                this.isJson = false;
            }
        }
    },
    computed: {
        formItemLayout() {
            return {
                labelCol: {span: 4},
                wrapperCol: {span: 14},
            }
        },
        buttonItemLayout() {
            const {layout} = this.form;
            return layout === 'horizontal'
                ? {
                    wrapperCol: {span: 14, offset: 4},
                }
                : {};
        },
    },
}
</script>

<style scoped lang="less">
.err-json {
    color: red;
    height: 21px;
    margin-top: -20px;
    margin-bottom: 20px;
}
</style>