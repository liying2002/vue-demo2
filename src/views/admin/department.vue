<template>
    <div>
        <el-table :data="departments" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column fixed prop="id" label="id" width="80" :sortable="true" :sort-method="sortById" />
            <el-table-column prop="schoolId" label="学校id" width="130" />
            <el-table-column prop="departType" label="学院|处室" width="130" />
            <el-table-column prop="departName" label="部门名称" width="160" />
            <el-table-column prop="departCode" label="部门英文名称" width="250" />
            <el-table-column prop="departDesc" label="部门描述" width="200" />
            <el-table-column prop="updateTime" label="更新时间" width="200" />
            <el-table-column prop="createTime" label="创建时间" width="200" />
            <el-table-column prop="deleted" label="删除" width="60" />
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button type="info" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button type="info" size="small" @click="dele(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-button type="info" @click="toAdd" round>添加</el-button>
    <el-dialog v-model="dialogFormVisible" title="学院编辑">
        <el-form :model="department">
            <el-form-item label="学校ID" :label-width="140">
                <el-input v-model="department.schoolId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学院|处室" :label-width="140">
                <el-input v-model="department.departType" autocomplete="off" />
            </el-form-item>
            <el-form-item label="部门名称" :label-width="140">
                <el-input v-model="department.departName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="部门英文名称" :label-width="140">
                <el-input v-model="department.departCode" autocomplete="off" />
            </el-form-item>
            <el-form-item label="部门描述" :label-width="140">
                <el-input v-model="department.departDesc" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { departmentPage, departmentDelId, departmentAdd, departmentEdit } from "../../http/department"
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            departments: [],
            page: {
                total: 0,
                current: 1,
                size: 5
            },
            dialogFormVisible: false,
            dialogFormVisible1: false,
            department: {
                "createTime": "",
                "deleted": 0,
                "departCode": "",
                "departDesc": "",
                "departName": "",
                "departType": "",
                "id": 0,
                "schoolId": 0,
                "updateTime": ""
            },
            formLabelWidth: 80,
        }
    },
    mounted() {
        this.getDepartmentsPage(1)
    },
    methods: {
        toEdit(department) {
            console.log(department)
            this.dialogFormVisible = true
            this.department = cloneDeep(department);

        },
        getDepartmentsPage(current) {
            const data = {
                current: current,
                size: 5
            }
            departmentPage(data).then(res => {
                console.log(res);
                const page = res.data.departments;
                this.departments = page;
                this.page = page;
            }).catch(err => {
                console.log(err)
            })
        },
        currentchange(current) {
            this.getDepartmentsPage(current);
            this.page.current = current;
        },
        cancle() {
            this.dialogFormVisible1 = false
        },
        dele(id) {
            const params = {
                id: id
            }
            departmentDelId(params).then(res => {
                console.log(id)
                if (res.success) {
                    this.getDepartmentsPage(this.page.current)
                }
                else {
                    console.log(res.msg)
                    return false
                }
            }).catch(err => {

            })
            this.dialogFormVisible1 = false;
        },
        toAdd() {
            //到添加页面
            this.dialogFormVisible = true
        },
        save() {
            const department = this.department;
            if (department.id == 0) {
                departmentAdd(department).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getDepartmentsPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                departmentEdit(department).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getDepartmentsPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
        },

    },
});
</script>
<style lang='scss' scoped></style>