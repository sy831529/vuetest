<template>
    <!--  Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，  -->
    <!--  并将 Form-Item 的 prop 属性设置为需校验的字段名即可。  -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 30%" label-width="100px" class="demo-ruleForm">

        <el-form-item label="书籍名称" prop="name">
            <el-input placeholder="请输入书籍名称" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="书籍作者" prop="author">
            <el-input placeholder="请输入书籍作者" v-model="ruleForm.author"></el-input>
        </el-form-item>

        <el-form-item>

            <el-button type="success " @click="submitForm('ruleForm')" icon="el-icon-document-add">添加</el-button>
            <el-button type="warning" @click="resetForm('ruleForm')" icon="el-icon-delete-solid">重置</el-button>

        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                //  数据对象
                ruleForm: {
                    name: '',
                    author:  '',
                },
                //  验证信息对象
                rules: {
                    name: [
                        // required 属性，表示为必填项，参数为boolean类型
                        // message 属性，表示当前规则不满足时则提示该文字，参数为String类型
                        // trigger 属性，表示什么事件触发校验，'blur' 表示当前输入框失去鼠标焦点时触发，参数为特定字符串
                        { required: true, message: '请输入书籍名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入书籍作者', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            //  确认添加按钮提示函数
            submitForm(formName) {
                const _this=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 此处弹出提示框提示用户是否确认添加
                        this.$confirm('请确定是否添加书籍《'+_this.ruleForm.name+'》', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            _this.$options.methods.sendData(_this,formName);
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                        });
                    }
                })
            },
            //  添加数据函数
            sendData(_this,formName){
                axios.post('http://localhost:8181/Book/save', _this.ruleForm)
                .then(function (res) {
                    if(res.data){
                         // _this.$msgbox 为自定义提示框 ，需要一个const h = _this.$createElement对象
                         // _this.$msgbox 该方法需要使用全局实例对象_this调用
                        // const h = _this.$createElement;
                        // _this.$msgbox({
                        //     title:'error：',
                        //     //  此处 h()中参数p,b为对应标签
                        //     message: h('p', null, [
                        //         h('b', {style: 'color: red'}, '书籍《'+_this.ruleForm.name+'》添加失败'),
                        //         h('br', null, null),
                        //         h('b', {style: 'color: red'}, '详情信息 \n 请联系技术人员')
                        //     ]),
                        //     // center: true,
                        //     confirmButtonText: '确定',
                        // });
                        _this.$alert( '书籍《'+_this.ruleForm.name+'》添加失败,详情信息请联系技术人员!', 'error:', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.$message({
                                    center: true,
                                    type: 'error',
                                    message: '书籍《'+_this.ruleForm.name+'》:添加失败',
                                });
                            }
                        });
                    }else{
                        //  添加成功后消息提示框
                        _this.$message({
                            showClose: true,
                            center: true,
                            type: 'success',
                            message: '书籍《'+_this.ruleForm.name+'》:添加成功',
                        });
                        //  如果提交成功则重置输入框,也可通过以下设置跳转到对应路由
                        //  _this.$router.push('/Bookmanage')
                        _this.$refs[formName].resetFields();
                    }
                });
            },
            //  重置按钮函数
            resetForm(formName) {
                const _this=this
                //  危险按钮再次确认功能
                this.$confirm('此操作将重置输入框内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$refs[formName].resetFields();
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'success',
                        message: '重置成功!',
                    });
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        center: true,
                        type: 'info',
                        message: '已取消重置'
                    });
                });
            }
        }
    }
</script>