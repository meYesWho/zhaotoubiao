<template>
  <div>
    <bidInfo-title :bidInfo="bidInfo"></bidInfo-title>
    <h3>开商务标信息</h3>
    <el-table :data="businessList" size="mini" border style="width: 100%">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="supplierName"
        label="供方名称"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="tenderQuotation"
        label="商务报价（含税 元）"
        width="180"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.tenderQuotation != 0">
            <span v-if="!scope.row.ifHuiVal">****</span>
            <span :title="scope.row.tenderQuotationRemark" v-if="scope.row.ifHuiVal">{{scope.row.tenderQuotation}}</span>
          </div>
          <div v-if="scope.row.tenderQuotation == 0">
            <span>— {{scope.row.tenderQuotationRemark}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="quoteInputTax"
        label="商务报价进项税（元）"
        width="180"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.quoteInputTax != 0">
            <span v-if="!scope.row.ifHuiVal">****</span>
            <span :title="scope.row.quoteInputTaxRemark" v-if="scope.row.ifHuiVal">{{scope.row.quoteInputTax}}</span>
          </div>
          <div v-if="scope.row.quoteInputTax == 0">
            <span>— {{scope.row.quoteInputTaxRemark}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="商务标附件" width="180">
        <template slot-scope="scope">
          <div v-if="!scope.row.ifHuiVal">
            <span v-if="scope.row.businessFileCode">已上传</span>
            <span v-if="!scope.row.businessFileCode">未上传附件</span>
          </div>
          <a v-if="scope.row.ifHuiVal" target="_blank" :href="scope.row.businessFileUrl">下载附件</a>
        </template>
      </el-table-column>

      <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            :disabled="scope.row.ifHuiVal"
            size="mini"
            @click="openBuss(scope.row, scope.$index)"
          >开商务标</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" show-overflow-tooltip prop="nodeName" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            :disabled="!scope.row.ifHuiVal"
            size="mini"
            @click="showOut(scope.row, scope.$index)"
          >隐藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="text-align: center">
      <el-button size="mini" type="primary" :disabled="ifAlready" @click="loseBid">流标</el-button>
      <el-button size="mini" @click="cancelFn">关闭</el-button>
      <el-button size="mini" :disabled="ifAlready" type="primary" @click="overFn">完成开商务标</el-button>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from "vue";
export default Vue.component("process-nine", {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      businessList: [],
      ifAlready: false,
      tenderFileCode: "",
      
      bidInfo: {
        tenderName: "",
        tenderNumber: ""
      },
    };
  },
  mounted() {
    this.tenderFileCode = this.$route.query.tenderFileCode;
    if (this.$route.query.already == "tenderCompleteOpenBusiness" || this.$route.query.already == "tenderLost") {
      this.ifAlready = true;
    } else {
      this.ifAlready = false;
    }
    if(this.$route.query.ifProcess){
      this.ifAlready = true;
    }
    this.bidInfo.tenderNumber = this.$route.query.tenderNumber;
    this.bidInfo.tenderName = this.$route.query.tenderName;
    this.openBusiness();
  },
  methods: {
    // 获取列表
    openBusiness() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.openBusiness(this.sso_sessionid, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              for (var i = 0; i < res.data.data.length; i++) {
                res.data.data[i].ifHuiVal = false;
              }
              this.businessList = res.data.data;
            } else {
              this.businessList = [];
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 流标
    async loseBid() {
        this.$confirm("是否确认进行流标?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.loseBidY();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
    loseBidY() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .tenderLoseByOpenTechnical(this.sso_sessionid, params)
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("流标完成!");
              setTimeout(() => {
                window.location.href = "about:blank";
                window.close();
              }, 1000);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    cancelFn() {
      window.location.href = "about:blank";
      window.close();
    },
    // 完成
    overFn() {
      // for(var i=0;i<this.businessList.length;i++){
      //   if(!this.businessList[i].ifHuiVal){
      //     this.$message.error('请完成所有项目的开商务标！');
      //     return false;
      //   }
      // }
      this.ifAlready = true;
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular
        .completeOpenBusiness(this.sso_sessionid, params)
        .then(res => {
      this.ifAlready = false;
          if (res.status == 200) {
            if (res.data.returnCode == 0) {
              this.$message.success("成功!");
              setTimeout(() => {
                window.location.href = "about:blank";
                window.close();
              }, 1000);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    tableSearchFn(value) {
      this.selectionList = value;
    },
    openBuss(row, index) {
      this.businessList[index].ifHuiVal = true;
    },
    showOut(row, index) {
      this.businessList[index].ifHuiVal = false;
    }
  }
});
</script>
<style>
</style>
