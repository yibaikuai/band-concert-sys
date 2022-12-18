<template>
  <div>
    <el-table
      :data="performData"
      border
      :row-style="iRowStyle"
      style="width: 100%;margin-top: 20px"
    >
      <el-table-column
        prop="bandName"
        label="演出乐队"
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
        prop="holdingTime"
        label="举办时间"
      >
        <template #default="scope">
          <span v-if="!scope.row.isEdit"> {{ scope.row.holdingTime }}</span>
          <el-date-picker
            v-if="scope.row.isEdit"
            v-model="scope.row.holdingTime"
            style="width: 150px;"
            type="datetime"
            placeholder="选择日期"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="holdingPlace"
        label="举办地点"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.holdingPlace }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.holdingPlace"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="duration"
        label="持续时间"
      >
        <template #default="scope">
          <span v-show="!scope.row.isEdit"> {{ scope.row.duration }}</span>
          <el-input
            v-show="scope.row.isEdit"
            v-model="scope.row.duration"
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
            type="text"
            size="small"
            @click="checkPerformDetail(scope.row)"
          >
            查看详情
          </el-button>
          <el-button
            v-permission="['admin','singer',scope.row.bandName]"
            type="text"
            size="small"
            @click="editPerformanceInfo(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-show="scope.row.isEdit"
            type="text"
            size="small"
            @click="confirmPerformanceInfo(scope.row)"
          >
            确认
          </el-button>
          <el-button
            v-show="scope.row.isEdit"
            type="text"
            size="small"
            @click="cancelEditPerformanceInfo(scope.row)"
          >
            取消编辑
          </el-button>
          <el-button
            v-permission="['admin','singer',scope.row.bandName]"
            type="text"
            size="small"
            style="color: red;"
            @click="deletePerformanceInfo(scope.row)"
          >
            删除
          </el-button>
          <div @click="joinPerformance(scope.row)">
            <el-button
              v-show="!scope.row.isLike"
              v-permission="['fan']"
              type="text"
              size="small"
            >
              参加
            </el-button>
            <el-button
              v-show="scope.row.isLike"
              v-permission="['fan']"
              type="text"
              size="small"
              style="color: red;"
            >
              取消参加
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="currentRole!== 'fan'"
      type="primary"
      style="margin-top: 20px"
      @click="addPerformance"
    >
      添加演唱会
    </el-button>
    <el-dialog
      v-model="actingSongVisible"
      title="演出歌单"
      width="40vw"
      center
    >
      <template #title>
        <span>演出详情</span>
      </template>
      <el-button
        v-if="currentBandName === selectBandName"
        type="primary"
        @click="addActingSong"
      >
        添加歌单
      </el-button>
      <el-table
        :data="actingSongData"
        border
        :row-style="iRowStyle"
        style="width: 100%;margin-top: 20px"
      >
        <el-table-column
          prop="songOrder"
          label="歌曲序号"
        >
          <template #default="scope">
            <span> {{ scope.row.songOrder }}</span>
          </template>
        </el-table-column>
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
          v-if="selectBandName===currentBandName && currentBandName!=='fan'"
          fixed="right"
          label="操作"
        >
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="editActingSong(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-show="scope.row.isEdit"
              type="text"
              size="small"
              @click="confirmActingSong(scope.row)"
            >
              确认
            </el-button>
            <el-button
              v-show="scope.row.isEdit"
              type="text"
              size="small"
              @click="cancelEditActingSong(scope.row)"
            >
              取消编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              style="color: red;"
              @click="deleteActingSong(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      v-model="performVisible"
      title="演出详情"
      width="30%"
      center
    >
      <el-form
        ref="performanceForm"
        :model="addPerformInfo"
        :rules="performanceRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="演出乐队"
          prop="bandName"
          required
        >
          <el-input v-model="addPerformInfo.bandName" />
        </el-form-item>
        <el-form-item
          label="举办时间"
          prop="举办时间"
          required
        >
          <el-date-picker
            v-model="addPerformInfo.holdingTime"
            style="width: 150px;"
            type="datetime"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          label="举办地点"
          required
          prop="holdingPlace"
        >
          <el-input v-model="addPerformInfo.holdingPlace" />
        </el-form-item>
        <el-form-item
          label="持续时间"
          required
          prop="duration"
        >
          <el-input v-model="addPerformInfo.duration" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitPerformanceForm"
          >
            立即创建
          </el-button>
          <el-button @click="resetForm('performanceForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="addActingSongVisible"
      title="歌曲详情"
      width="30%"
      center
    >
      <el-form
        ref="actingSongForm"
        :model="addActingSongInfo"
        :rules="actingSongRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="歌曲名称"
          prop="songName"
          required
        >
          <el-input v-model="addActingSongInfo.songName" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitActingSongForm"
          >
            立即创建
          </el-button>
          <el-button @click="resetForm('actingSongForm')">
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
import {formatDataTime} from "@/utils/format";
import {changePerformanceJoin} from "@/utils/like";
import {getList} from "@/api/info";
import {
  addPerformApi,
  addSongPerformApi,
  deletePerformApi,
  deleteSongPerformApi,
  editPerformApi,
  editSongPerformApi
} from "@/api/perform";

export default {
  name: "PerformanceList",
  data(){
    return{
      currentPage: 1,
      total: 0,
      addBandName: '',
      currentRole: '',
      selectBandName: '',
      currentBandName: '',
      performVisible: false,
      actingSongVisible: false,
      addActingSongVisible: false,
      isPerformEdit:false,
      isActingSongEdit:false,
      performData:[
      ],
      actingSongData:[
      ],
      editPerformInfo:{
        bandName: "",
        holdingTime: "",
        holdingPlace: "",
        duration: "",
        isEdit: false
      },
      addPerformInfo:{
        bandName: "",
        holdingTime: "",
        holdingPlace: "",
        duration: "",
        isEdit: false,
        isLike:false
      },
      editActingSongInfo:{
        songOrder: "",
        bandName: "",
        songName: "",
        holdingTime: "",
        isEdit: false
      },
      addActingSongInfo:{
        songOrder: "",
        bandName: '',
        songName: "",
        holdingTime: "",
        isEdit: false
      },
      performanceRules: {
        performBand: [
          { required: true, message: "请输入演出乐队", trigger: "blur" }
        ],
        holdingTime: [
          { required: true, message: "请选择举办时间", trigger: "change" }
        ],
        holdingPlace: [
          { required: true, message: "请输入举办地点", trigger: "blur" }
        ]
      },
      actingSongRules: {
        songName: [
          { required: true, message: "请输入歌曲名称", trigger: "blur" }
        ]
      },
      joinInfo:{
        fanName: "",
        fanId: "",
        holdingTime: "",
      }
    }
  },
  created() {
    let {userInfo} = JSON.parse(localStorage.getItem('userInfo'))
    this.selectBandName = this.currentBandName = userInfo.role==='singer' ? userInfo.bandName : ''
    this.currentRole = userInfo.role
    this.getPerformData()
  },
  methods:{
    formatDataTime,
    changePerformanceJoin,
    checkPerformDetail(row){
      this.actingSongVisible = true;
      this.actingSongData = row.actingSongData;
      if(this.currentRole ==='admin'){
      }else{
        this.selectBandName = row.bandName;
      }
      this.addBandName = row.bandName;
    },
    editPerformanceInfo(row){
      if(this.isPerformEdit){
        this.$message({
          message: '请先完成当前编辑',
          type: 'warning'
        });
        return
      }
      this.isPerformEdit = true
      row.isEdit = true
    },
    cancelEditPerformanceInfo(row){
      row.isEdit = false;
      this.isPerformEdit = false
    },
    confirmPerformanceInfo(row){
      for(let item in row){
        if(item ==='holdingTime' && row['holdingTime'] === null){
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return;
        }
        if(row[item] === ''){
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return
        }
      }
      row.isEdit = false;
      this.isPerformEdit = false
      this.editPerformInfo = row;
      this.editPerformInfo.holdingTime = this.formatDataTime(this.editPerformInfo.holdingTime)
      editPerformApi(this.editPerformInfo).then(res=>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });

        this.getPerformData()
      }).catch(()=>{})
    },
    addPerformance(){
      if(this.isPerformEdit){
        this.$message({
          message: '请先完成当前编辑',
          type: 'warning'
        });
        return
      }

      this.performVisible = true
    },
    deletePerformanceInfo(row){
      this.$confirm('此操作将永久删除该演出信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePerformApi(row.bandName,row.holdingTime).then(res=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getPerformData()
        }).catch(()=>{})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editActingSong(row) {
      if(this.isActingSongEdit){
        this.$message({
          message: '请先完成当前编辑',
          type: 'warning'
        });
        return
      }

      this.isActingSongEdit = true
      row.isEdit = true
    },
    cancelEditActingSong(row) {
      row.isEdit = false;
      this.isActingSongEdit = false
    },
    confirmActingSong(row) {
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
      this.isActingSongEdit = false
      this.editActingSongInfo = row;
      editSongPerformApi(this.editActingSongInfo).then(res=>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.getPerformData()
      }).catch(()=>{})
    },
    addActingSong(){
      if(this.isPerformEdit){
        this.$message({
          message: '请先完成当前编辑',
          type: 'warning'
        });
        return
      }
      if(this.currentBandName!==this.selectBandName){
        this.$message({
          message: '您没有权限添加该乐队的演出信息',
          type: 'error'
        });
        return
      }
      this.addActingSongVisible = true

    },
    deleteActingSong(row){
      this.$confirm('此操作将永久删除该歌单信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        deleteSongPerformApi(row.id).then(res=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getPerformData()
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
    submitPerformanceForm(){
      console.log(this.addPerformInfo)
      for (let item in this.addPerformInfo) {
        if (item === 'holdingTime' && this.addPerformInfo['holdingTime'] === null) {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return;
        }
        if (this.addPerformInfo[item] === '') {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return
        }
      }
      this.performVisible = false
      this.isPerformEdit = false
      this.addPerformInfo.holdingTime = this.formatDataTime(this.addPerformInfo.holdingTime)
      addPerformApi(this.addPerformInfo).then(res=>{
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.getPerformData()
      }).catch(()=>{})
    },
    submitActingSongForm(){
      this.addActingSongInfo.bandName = this.addBandName;
      this.addActingSongInfo.songOrder = this.actingSongData.length+1
      this.addActingSongInfo.holdingTime = this.formatDataTime(this.addActingSongInfo.holdingTime)
      for (let item in this.addActingSongInfo) {
        if (this.addActingSongInfo[item] === "") {
          this.$message({
            message: "请填写完整信息",
            type: "warning"
          });
          return;
        }
      }
      this.addActingSongVisible = false
      this.isActingSongEdit = false
      addSongPerformApi(this.addActingSongInfo).then(res=>{
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.getPerformData()
      }).catch(()=>{})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    joinPerformance(row){
      this.joinInfo.holdingTime = row.holdingTime
      this.changePerformanceJoin(row)
      console.log(this.joinInfo)
    },
    getPerformData(){
      getList(this.currentPage,10,4).then(res=>{
        let {data} = res.data
        this.performData = data.performData
        this.total = data.total
        this.actingSongVisible = false;
      })
    },
    handleSelectionChange(val) {
      this.bandData = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPerformData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPerformData()
    },
    goPrePage(){
      this.getPerformData()
    },
    goNextPage(){
      this.getPerformData()
    },
  }
}
</script>

<style scoped>

</style>