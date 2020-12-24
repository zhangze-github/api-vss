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
                    v-model:value="form.ajaxJson"
                    :rows="10"
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
                        Submit
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>

import {Form, Input, Button, Radio, Row, Col} from 'ant-design-vue';
import {trim} from 'lodash-es';
import axios from 'axios';

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
                ajaxJson: '',

            },
            isJson: true,
        };
    },
    methods: {
        isJsonString(str) {
            try {
                JSON.parse(str)
                return true
            } catch (err) {
                return false
            }
        },
        submit() {

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