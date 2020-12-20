<template>
  <el-dialog title="招标公告" :visible.sync="detailData.isShow" width="1000px">
    <div class="bidissuing">
      <el-row class="hang">
        <el-col :span="5">
          <div class="lie lieTitle">关联招标项</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{bidIssuing.TENDER_NAME}}</div>
        </el-col>
        <el-col :span="5">
          <div class="lie lieTitle">项目位置</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{bidIssuing.TENDER_PROJECT_ADDRESS}}</div>
        </el-col>
      </el-row>
      <el-row class="hang">
        <el-col :span="5">
          <div class="lie lieTitle">招标内容</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{bidIssuing.TENDER_FILE_CONTENT}}</div>
        </el-col>
        <el-col :span="5">
          <div class="lie lieTitle">领取招标文件时间</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{formatDate(bidIssuing.RECEIVE_FILE_DATE)}}</div>
        </el-col>
      </el-row>
      <el-row class="hang">
        <el-col :span="5">
          <div class="lie lieTitle">提交疑问的时间截止</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{formatDate(bidIssuing.SUBMIT_QUESTION_END)}}</div>
        </el-col>
        <el-col :span="5">
          <div class="lie lieTitle">投标截止时间</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{formatDate(bidIssuing.SUBMIT_TENDER_DOCUMENT_END)}}</div>
        </el-col>
      </el-row>
      <el-row class="hang">
        <el-col :span="5">
          <div class="lie lieTitle">招标联系人</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{bidIssuing.TENDER_FILE_TENDERER}}</div>
        </el-col>
        <el-col :span="5">
          <div class="lie lieTitle">招标联系电话</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{bidIssuing.TENDEREE_PHONE}}</div>
        </el-col>
      </el-row>
      <el-row class="hang">
        <el-col :span="5">
          <div class="lie lieTitle">电子邮箱</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{bidIssuing.TENDEREE_EMAIL}}</div>
        </el-col>
        <el-col :span="5">
          <div class="lie lieTitle">中标监督电话</div>
        </el-col>
        <el-col :span="7">
          <div class="lie">{{bidIssuing.ANTI_FRAUD_PHONE}}</div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeGongGao">关 闭</el-button>
      <!-- <el-button size="mini" type="primary" @click="toBid">投 标</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import Vue from "vue";
export default Vue.component("gg-detail", {
  props: {
    detailData: {
      type: Object,
      default: {
        isShow: false,
        code: ""
      }
    }
  },
  watch: {
    detailData: {
      handler(newVal, oldVal) {
        if (newVal.isShow) {
          this.tenderFileCode = newVal.code;
          this.gongGao();
        }
      },
      deep: true
    }
  },
  data() {
    return {
      bidIssuing: {},
      tenderFileCode: ""
    };
  },
  methods: {
    gongGao() {
      var params = {
        tenderFileCode: this.tenderFileCode
      };
      this.$api.modular.getTenderFileByCode(params, params).then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data.length > 0) {
              this.bidIssuing = res.data.data[0];
            }
          }
        }
      });
    },
    // toBid() {
    //   this.detailData.isShow = false;
    //   this.$router.push({
    //     name: "startBid"
    //   });
    // },
    closeGongGao() {
      this.detailData.isShow = false;
      this.bidIssuing = {};
    },
    formatDate(date) {
      return this.formatDate(date);
    },
    formatDate(value) {
      if (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d;
      } else {
        return "";
      }
    }
  }
});
</script>
<style scoped>
.bidissuing {
  border: 1px solid #e9e9e9;
  margin-bottom: 20px;
}
.bidissuing .hang {
  border-top: 1px solid #e9e9e9;
  height: 40px;
  line-height: 40px;
}
.bidissuing .hang:first-child {
  border-top: none;
}
.bidissuing .hang .lie {
  border-left: 1px solid #e9e9e9;
  text-align: left;
  padding-left: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bidissuing .hang .el-col:first-child .lie {
  border-left: none;
}
.bidissuing .hang .lieTitle {
  text-align: right;
  padding-right: 12px;
}
</style>
