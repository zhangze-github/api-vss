<template>
    <div class="test">

        <div class="add-wrapper">
            <a-button type="primary" @click="add">
                新增
            </a-button>
        </div>
        <a-table :columns="columns" :data-source="list" :rowKey="record => record.id" :pagination="false">
            <div slot="action" slot-scope="text, record, index">
                <span class="action" @click="pushEdit(record.id)">编辑</span>
                <a-popconfirm
                    title="确认要删除该公司吗？"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="confirmDelete(record.id)"
                >
                    <span class="action">删除</span>
                </a-popconfirm>
                <span class="action" @click="openNew(record.id)">跳转查看</span>
            </div>
        </a-table>
    </div>
</template>

<script>
import {Button, Table, Popconfirm, message} from 'ant-design-vue';
import axios from 'axios';

const columns = [
    {
        title: '公司名称',
        dataIndex: 'companyName',
        key: 'companyName',
    },
    {
        title: '代理路径',
        dataIndex: 'proxyPath',
        key: 'proxyPath',
        // width: 80,
    },
    {
        title: 'JSON配置',
        dataIndex: 'ajaxJson',
        key: 'ajaxJson',
        ellipsis: true,
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        scopedSlots: {customRender: 'action'},
    },
];

export default {
    name: "Index",
    components: {
        "a-button": Button,
        "a-table": Table,
        "a-popconfirm": Popconfirm
    },
    data() {
        return {
            columns,
            list: []
        }
    },
    mounted() {
        this.getAllList();
    },
    methods: {
        getAllList() {
            axios.post('/api/getAllList').then(res => {
                // console.log(res.data)
                this.list = res.data;
            })
        },
        add() {
            this.$router.push('/websitedetail');
        },
        pushEdit(id) {
            this.$router.push({path: "/websitedetail", query: {id}});
        },
        confirmDelete(id) {
            axios.post('/api/delteDetail', {id}).then(res => {
                message.success('删除成功');
                this.getAllList();
            });
        },
        openNew(id){
            window.open(`http://localhost:3000/${id}`)
        }
    }
}
</script>

<style scoped lang="less">
.add-wrapper{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px ;
}

.action {
    color: #7171ea;
    margin-right: 10px;
    cursor: pointer;
}
</style>