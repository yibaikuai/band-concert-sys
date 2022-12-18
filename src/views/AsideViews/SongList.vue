<template>
  <div>
    <el-table
      :data="songData"
      border
      :row-style="iRowStyle"
      style="width: 100%;margin-top: 20px"
    >
      <el-table-column
        prop="songName"
        label="歌曲名称"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.songName }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.songName"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="bandName"
        label="创作乐队"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.bandName }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.bandName"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="albumBelong"
        label="所在专辑"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.albumBelong }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.albumBelong"
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
            v-permission="['admin','singer','notBandThing']"
            type="text"
            size="small"
            @click="editSong(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-show="scope.row.isEdit"
            type="text"
            size="small"
            @click="confirmSongInfo(scope.row)"
          >
            确认
          </el-button>
          <el-button
            v-permission="['admin','singer',scope.row.bandName]"
            type="text"
            size="small"
            style="color: red"
            @click="deleteSong(scope.row)"
          >
            删除
          </el-button>
          <el-button
            v-show="scope.row.isEdit"
            type="text"
            size="small"
            @click="cancelEditSongInfo(scope.row)"
          >
            取消编辑
          </el-button>
          <div
            v-permission="['singer','fan']"
            @click="changeSongLike(scope.row)"
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
      @click="addSong"
    >
      添加歌曲
    </el-button>
    <el-dialog
      v-model="songVisible"
      title="提示"
      width="30vw"
      center
    >
      <el-form
        ref="addAlbumForm"
        :model="addSongInfo"
        :rules="songRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-if="currentRole!=='singer'"
          label="乐队名称"
          prop="bandName"
          required
        >
          <el-input v-model="addSongInfo.bandName" />
        </el-form-item>
        <el-form-item
          label="歌曲名称"
          prop="songName"
          required
        >
          <el-input v-model="addSongInfo.songName" />
        </el-form-item>
        <el-form-item
          label="所在专辑"
          prop="albumBelong"
        >
          <el-input v-model="addSongInfo.albumBelong" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitAddSongForm"
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
import {changeSongLike} from "@/utils/like";
import {getList} from "@/api/info";
import {addSongApi, deleteSongApi, editSongApi} from "@/api/song";

export default {
  name: "SongList",
  data(){
    return{
      currentPage: 1,
      total: 0,
      currentRole:'',
      currentBandName:'',
      songVisible: false,
      isSongEdit:false,
      songData:[
      ],
      editSongInfo:
        {
          songName:"",
          bandName:"",
          albumBelong:"",
          isEdit:false
        },
      addSongInfo:{
        songName:"",
        bandName:"",
        albumBelong:"",
        isEdit:false,
        isLike:false
      },
      songRules:{
        bandName:[
          {required:true,message:"请输入乐队名称",trigger:"blur"}
        ],
        songName:[
          {required:true,message:"请输入歌曲名称",trigger:"blur"}
        ],
        creator:[
          {required:true,message:"请输入创作乐队",trigger:"blur"}
        ],
        albumBelong:[
          {required:true,message:"请输入所在专辑",trigger:"blur"}
        ]
      }
    }
  },
  created() {
    let {userInfo} = JSON.parse(localStorage.getItem('userInfo'))
    this.currentBandName= userInfo.role==='singer'? userInfo.bandName : ''
    this.currentRole = userInfo.role
    this.getSongData()
  },
  methods:{
    changeSongLike,
    editSong(row){
      if(this.isSongEdit){
        this.$message({
          message: '请先完成当前编辑',
          type: 'warning'
        });
        return
      }
      this.isSongEdit = true
      row.isEdit = true;
    },
    cancelEditSongInfo(row){
      row.isEdit = false;
      this.isSongEdit = false
    },
    confirmSongInfo(row){
      for(let item in row){
        if(row[item] === ''){
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return
        }
      }
      row.isEdit = false;
      this.isSongEdit = false
      this.editSongInfo = row;
      editSongApi(this.editSongInfo).then(res=>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.getSongData()
      }).catch(()=>{})
    },
    addSong(){
      if(this.isSongEdit){
        this.$message({
          message: '请先完成当前编辑',
          type: 'warning'
        });
        return
      }
      this.songVisible = true
    },
    deleteSong(row){
      this.$confirm('此操作将永久删除该歌曲, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSongApi(row.songName,row.bandName).then(res=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getSongData()
        }).catch(()=>{})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    iRowStyle({row, rowIndex}) {
      return 'height:65px';
    },
    submitAddSongForm() {
      console.log(this.addSongInfo)
      if(this.currentRole==='admin'){
      }else{
        this.addSongInfo.bandName = this.currentBandName
      }
      for (let item in this.addSongInfo) {
        if (this.addSongInfo[item] === '') {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return
        }
      }
      this.songVisible = false;
      addSongApi(this.addSongInfo).then(res=>{
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.getSongData()
      }).catch(()=>{})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getSongData(){
      getList(this.currentPage,10,3).then(res=>{
        let {data} = res.data
        this.songData = data.songData
        this.total = data.total
      })
    },
    handleSelectionChange(val) {
      this.bandData = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSongData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSongData()
    },
    goPrePage(){
      this.getSongData()
    },
    goNextPage(){
      this.getSongData()
    },
  }
}
</script>

<style scoped>

</style>