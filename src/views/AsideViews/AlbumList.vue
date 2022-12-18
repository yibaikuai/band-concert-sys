<template>
  <div>
    <el-table
      :data="albumData"
      border
      :row-style="iRowStyle"
      style="width: 100%;margin-top: 20px"
    >
      <el-table-column
        prop="bandName"
        label="专辑名称"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.albumName }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.albumName"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="performBand"
        label="乐队名称"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.performBand }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.performBand"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        label="发行时间"
      >
        <template #default="scope">
          <span v-if="!scope.row.isEdit"> {{ scope.row.releaseTime }}</span>
          <el-date-picker
            v-if="scope.row.isEdit"
            v-model="scope.row.releaseTime"
            style="width: 150px;"
            type="date"
            placeholder="选择日期"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="releaseCompany"
        label="发行公司"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.releaseCompany }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.releaseCompany"
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
      >
        <template #default="scope">
          <el-button
            v-permission="['admin','singer',scope.row.performBand]"
            type="text"
            size="small"
            @click="editAlbum(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-show="scope.row.isEdit"
            type="text"
            size="small"
            @click="confirmAlbumInfo(scope.row)"
          >
            确认
          </el-button>
          <el-button
            v-show="scope.row.isEdit"
            type="text"
            size="small"
            @click="cancelEditAlbumInfo(scope.row)"
          >
            取消编辑
          </el-button>
          <el-button
            v-permission="['admin','singer',scope.row.performBand]"
            type="text"
            size="small"
            style="color: red"
            @click="deleteAlbum(scope.row)"
          >
            删除
          </el-button>
          <div
            v-permission="['singer','fan']"
            @click="changeAlbumLike(scope.row)"
          >
            <i
              v-show="!scope.row.isLike"
              class="iconfont icon-jurassic_love"
            />
            <i
              v-show="scope.row.isLike"
              class="iconfont icon-jurassic_love1"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="currentRole!=='fan'"
      type="primary"
      style="margin-top: 20px"
      @click="addAlbum"
    >
      添加专辑
    </el-button>
    <el-dialog
      v-model="albumVisible"
      title="提示"
      width="30vw"
      center
    >
      <el-form
        ref="addAlbumForm"
        :model="addAlbumInfo"
        :rules="albumRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="专辑名称"
          prop="bandName"
          required
        >
          <el-input v-model="addAlbumInfo.albumName" />
        </el-form-item>
        <el-form-item
          v-if="currentRole==='admin'"
          label="乐队名称"
          prop="performBand"
        >
          <el-input v-model="addAlbumInfo.performBand" />
        </el-form-item>
        <el-form-item
          label="发行时间"
          required
        >
          <el-col :span="11">
            <el-form-item prop="releaseTime">
              <el-date-picker
                v-model="addAlbumInfo.releaseTime"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="发行公司"
          prop="releaseCompany"
        >
          <el-input v-model="addAlbumInfo.releaseCompany" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitAddAlbumForm"
          >
            立即创建
          </el-button>
          <el-button @click="resetForm('addAlbumForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-pagination
      background
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="total"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @next-click="goNextPage"
      @prev-click="goPrePage"
    />
  </div>
</template>

<script>
import {formatTime} from "@/utils/format";
import {changeAlbumLike} from "@/utils/like";
import {getList} from "@/api/info";
import {addAlbumApi, deleteAlbumApi, editAlbumApi} from "@/api/album";

export default {
  name: "AlbumList",
  data(){
    return{
      currentPage: 1,
      total: 0,
      currentRole:'',
      currentBandName: '',
      albumVisible: false,
      isAlbumEdit:false,
      albumData:[
      ],
      addAlbumInfo:{
        albumName:"",
        performBand:"",
        releaseTime:"",
        releaseCompany:"",
        isEdit:false,
        isLike:false
      },
      editAlbumInfo:
        {
          albumName:"",
          performBand:"",
          releaseTime:"",
          releaseCompany:"",
          isEdit:false,
          isLike: false
        },
      albumRules:{
        albumName:[
          {required:true,message:"请输入专辑名称",trigger:"blur"}
        ],
        performBand:[
          {required:true,message:"请输入表演乐队",trigger:"blur"}
        ],
        releaseTime:[
          {required:true,message:"请输入发行时间",trigger:"blur"}
        ],
        releaseCompany:[
          {required:true,message:"请输入发行公司",trigger:"blur"}
        ]
      }
    }
  },
  created() {
    let {userInfo} = JSON.parse(localStorage.getItem('userInfo'))
    this.currentBandName= userInfo.role==='singer'? userInfo.bandName : ''
    this.currentRole = userInfo.role
    this.getAlbumData()
  },
  methods:{
    formatTime,
    changeAlbumLike,
    editAlbum(row){
      if(this.isAlbumEdit){
        this.$message({
          message: '请先完成当前编辑',
          type: 'warning'
        });
        return
      }
      row.isEdit = true;
      this.isAlbumEdit = true
    },
    cancelEditAlbumInfo(row){
      row.isEdit = false;
      this.isAlbumEdit = false
    },
    confirmAlbumInfo(row){
      for(let item in row){
        if(item ==='releaseTime' && row['releaseTime'] === null){
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return;
        }
        if( row[item] === ''){
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return
        }
      }
      row.isEdit = false;
      this.isAlbumEdit = false
      this.editAlbumInfo = row;
      editAlbumApi(this.editAlbumInfo).then(res=>{
        console.log(res)
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.getAlbumData()
      }).catch(()=>{})
    },
    iRowStyle({row, rowIndex}) {
      return 'height:65px';
    },
    addAlbum(){
      this.albumVisible = true
    },
    deleteAlbum(row){
      this.$confirm('此操作将永久删除该专辑, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAlbumApi(row.albumName).then(res=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAlbumData()
        }).catch(()=>{})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitAddAlbumForm() {
      if(this.currentRole==='admin'){
      }else{
        this.addAlbumInfo.performBand = this.currentBandName
      }
      for (let item in this.addAlbumInfo) {
        if (item === 'releaseTime' && this.addAlbumInfo['releaseTime'] === null) {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return;
        }
        if (this.addAlbumInfo[item] === '') {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return
        }
      }
      this.albumVisible = false;
      this.addAlbumInfo.releaseTime = this.formatTime(this.addAlbumInfo.releaseTime)
      addAlbumApi(this.addAlbumInfo).then(res=>{
        console.log(res)
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.getAlbumData()
      }).catch(()=>{})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getAlbumData(){
      getList(this.currentPage,10,2).then(res=>{
        let {data} = res.data
        this.albumData = data.albumData
        this.total = data.total
      })
    },
    handleSelectionChange(val) {
      this.albumData = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAlbumData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAlbumData()
    },
    goPrePage(){
      this.getAlbumData()
    },
    goNextPage(){
      this.getAlbumData()
    },
  }
}
</script>

<style scoped>

</style>