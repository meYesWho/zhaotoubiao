<template>
  <div>
    <h2>第一资产-供应商管理平台</h2>
    <div class="cneterDiv">
      <el-form
        label-position="right"
        style="padding-top:36px"
        size="mini"
        label-width="100px"
        :model="supplierLoginData"
      >
        <el-form-item label="供应商名称" align="left">
          <el-input style="width: 90%" v-model="supplierLoginData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="密码" align="left">
          <el-input style="width: 90%" type="password" v-model="supplierLoginData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      sso_sessionid: this.$store.state.sso_sessionid,
      supplierLoginData: {
        token: "93388744142ea9fdb65e742b6d7805d8",
        pageNum: 1,
        pageSize: 10,
        supplierName: "",
        categoryName: "",
        servecategoryNames: "",
        supplierCode: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      // if (this.supplierLoginData.password != "123456") {
      //   this.$message.error("请输入正确的用户名密码！");
      //   return false;
      // }
      // this.$api.modular
      //   .getSupplierByMaterialCateGory(
      //     this.sso_sessionid,
      //     this.supplierLoginData
      //   )
      //   .then(res => {
      //     if (res.status == 200) {
      //       if (res.data.returnCode == 0) {
      //         // that.supplierList = res.data.data;
      //         if (!res.data.data) {
      //           this.$message.error("请输入正确的用户名密码！");
      //           return false;
      //         }
      //         if (res.data.data.length == 1) {
      //           if (this.supplierLoginData.password != "123456") {
      //             this.$message.error("请输入正确的用户名密码！");
      //           } else {
      //             if (
      //               res.data.data[0].supplierName ==
      //               this.supplierLoginData.supplierName
      //             ) {
      //               var supplierInfo = JSON.stringify(res.data.data[0]);
      //               sessionStorage.setItem("supplierInfo", supplierInfo);
      //               this.$router.push({
      //                 path: "/startBid"
      //               });
      //             } else {
      //               this.$message.error("请输入正确的用户名密码！");
      //             }
      //           }
      //         } else {
      //           if (res.data.data.length > 1) {
      //             if (
      //               res.data.data[0].supplierName ==
      //               this.supplierLoginData.supplierName
      //             ) {
      //               var supplierInfo = JSON.stringify(res.data.data[0]);
      //               sessionStorage.setItem("supplierInfo", supplierInfo);
      //               this.$router.push({
      //                 path: "/startBid"
      //               });
      //             } else {
      //               this.$message.error("请输入正确的用户名密码！");
      //             }
      //           } else {
      //             this.$message.error("请输入正确的用户名密码！");
      //           }
      //         }
      //       } else {
      //         this.$message.error("请输入正确的用户名密码！");
      //       }
      //     } else {
      //       this.$message.error("请输入正确的用户名密码！");
      //     }
      //   });
    },
    resetForm() {
      this.supplierLoginData = {
        token: "93388744142ea9fdb65e742b6d7805d8",
        pageNum: 1,
        pageSize: 10,
        supplierName: "",
        categoryName: "",
        servecategoryNames: "",
        supplierCode: "",
        password: ""
      };
    }
  }
};
</script>

<style scoped>
.cneterDiv {
  width: 400px;
  height: 200px;
  margin: 5% auto;
  box-shadow: 0 0 6px 0 #ccc;
  border-radius: 10px;
  background: #fff;
}
</style>
