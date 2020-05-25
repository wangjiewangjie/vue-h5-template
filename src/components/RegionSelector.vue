<template>
  <div class="address-select-wrapper">
    <div class="my-input my-address" @click="selectAddress">
      <span class="my-address-left">所在地址</span>
      <span class="my-address-right">{{ address ? address : "请选择" }}</span>
    </div>
    <div class="w-addres-mask" v-if="showSelectAddress"></div>
    <div class="w-address-bg" @click="selectAddress">
      <transition name="fold">
        <div class="w-address-content" @click.stop v-if="showSelectAddress">
          <div class="content-header">
            <span>配送至</span>
            <i class="close-w-address" @click="selectAddress"
              ><a href="javascript:void(0)" class="close"></a
            ></i>
          </div>
          <div class="content-body">
            <div class="selected-list">
              <div
                class="selected-list-item"
                :class="provinceActive ? 'active-item' : ''"
                @click="getProvinces"
              >
                {{ province ? province : "请选择" }}
              </div>
              <div
                class="selected-list-item"
                :class="cityActive ? 'active-item' : ''"
                @click="toggleCity"
              >
                {{
                  city
                    ? city
                    : JSON.stringify(citysList) !== "{}"
                    ? "请选择"
                    : ""
                }}
              </div>
              <div
                class="selected-list-item"
                :class="districtActive ? 'active-item' : ''"
                @click="toggleDistrice"
              >
                {{
                  district
                    ? district
                    : JSON.stringify(districtList) !== "{}"
                    ? "请选择"
                    : ""
                }}
              </div>
              <div
                class="selected-list-item"
                :class="townActive ? 'active-item' : ''"
                @click="toggleTown"
              >
                {{
                  town
                    ? town
                    : JSON.stringify(townList) !== "{}"
                    ? "请选择"
                    : ""
                }}
              </div>
            </div>
            <div class="w-area">
              <ul class="w-area-list">
                <li
                  class="area-list-item"
                  v-show="showProvinces"
                  :class="province === label ? 'active-item' : ''"
                  @click="selectProvinceItem(value, label)"
                  v-for="(value, label) in provincesList"
                  :key="value"
                >
                  {{ label }}
                </li>
                <li
                  class="area-list-item"
                  v-show="showcitys"
                  :class="city === label ? 'active-item' : ''"
                  @click="selectCityItem(value, label)"
                  v-for="(value, label) in citysList"
                  :key="value"
                >
                  {{ label }}
                </li>
                <li
                  class="area-list-item"
                  v-show="showDistrict"
                  :class="district === label ? 'active-item' : ''"
                  @click="selectDistrictItem(value, label)"
                  v-for="(value, label) in districtList"
                  :key="value"
                >
                  {{ label }}
                </li>
                <li
                  class="area-list-item"
                  v-show="showTown"
                  :class="town === label ? 'active-item' : ''"
                  @click="selectTown(value, label)"
                  v-for="(value, label) in townList"
                  :key="value"
                >
                  {{ label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addressCode: Array
  },
  data() {
    return {
      // 省市区镇列表
      provincesList: {},
      citysList: {},
      districtList: {},
      townList: {},
      // 省市区镇文字
      province: "",
      city: "",
      district: "",
      town: "",
      // 省市区ID
      provinceId: "",
      cityId: "",
      districtId: "",
      townId: "",
      // 展示省市区镇列表
      showProvinces: false,
      showcitys: false,
      showDistrict: false,
      showTown: false,
      // 设置选中时省市区镇高亮样式
      provinceActive: false,
      cityActive: false,
      districtActive: false,
      townActive: false,
      ids: [],
      names: [],
      showSelectAddress: false,
      address: ""
    };
  },
  created() {
    this.getProvinces();
  },
  methods: {
    getProvinces() {
      this.$api.getJdAreaApi({ id: 0, type: 0 }).then(res => {
        this.provincesList = res.data;
        this.showProvinces = true;
        this.showcitys = false;
        this.showDistrict = false;
        this.showTown = false;
        this.provinceActive = true;
        this.cityActive = false;
        this.districtActive = false;
        this.townActive = false;
      });
    },
    selectProvinceItem(value, label) {
      this.province = label;
      this.provinceId = value;
      this.$api
        .getJdAreaApi({ id: Number(this.provinceId), type: 1 })
        .then(res => {
          this.citysList = res.data;
          this.showProvinces = false;
          this.showcitys = true;
          this.showDistrict = false;
          this.showTown = false;
          this.provinceActive = false;
          this.cityActive = true;
          this.districtActive = false;
          this.townActive = false;
          this.city = ""; // 清空城市
          this.district = ""; // 清空区
          this.town = ""; // 清空乡镇
          this.districtList = {}; // 清空区列表
          this.townList = {}; // 清空乡镇列表
        });
    },
    selectCityItem(value, label) {
      this.city = label;
      this.cityId = value;
      this.$api.getJdAreaApi({ id: Number(this.cityId), type: 2 }).then(res => {
        this.districtList = res.data;
        this.showProvinces = false;
        this.showcitys = false;
        this.showDistrict = true;
        this.showTown = false;
        this.provinceActive = false;
        this.cityActive = false;
        this.districtActive = true;
        this.townActive = false;
        this.district = ""; // 清空区
        this.town = ""; // 清空乡镇
        this.townList = {}; // 清空乡镇列表
      });
    },
    selectDistrictItem(value, label) {
      this.district = label;
      this.districtId = value;
      this.$api
        .getJdAreaApi({ id: Number(this.districtId), type: 3 })
        .then(res => {
          this.ids = [];
          this.ids.push(this.provinceId);
          this.ids.push(this.cityId);
          this.ids.push(this.districtId);
          this.address = "";
          this.names = [];
          this.names.push(this.province);
          this.names.push(this.city);
          this.names.push(this.district);
          this.address = this.names[0] + this.names[1] + this.names[2];
          this.$emit("change", this.ids, this.names);
          if (JSON.stringify(res.data) === "{}") {
            this.townList = {};
            this.showDistrict = true;
            this.showTown = false;
            this.districtActive = true;
            this.townActive = false;
            this.showSelectAddress = false; // 关闭挑选地址列表
          } else {
            this.townList = res.data;
            this.showDistrict = false;
            this.showTown = true;
            this.districtActive = false;
            this.townActive = true;
          }
          this.showProvinces = false;
          this.showcitys = false;
          this.provinceActive = false;
          this.cityActive = false;
          this.town = ""; // 清空乡镇
        });
    },
    selectTown(value, label) {
      this.town = label;
      this.townId = value;
      this.ids = [];
      this.ids.push(this.provinceId);
      this.ids.push(this.cityId);
      this.ids.push(this.districtId);
      this.ids.push(this.townId);
      this.address = "";
      this.names = [];
      this.names.push(this.province);
      this.names.push(this.city);
      this.names.push(this.district);
      this.names.push(this.town);
      this.address =
        this.names[0] + this.names[1] + this.names[2] + this.names[3];
      this.$emit("change", this.ids, this.names);
      this.showSelectAddress = false; // 关闭挑选地址列表
    },
    toggleCity() {
      this.showProvinces = false;
      this.showcitys = true;
      this.showDistrict = false;
      this.showTown = false;
      this.provinceActive = false;
      this.cityActive = true;
      this.districtActive = false;
      this.townActive = false;
    },
    toggleDistrice() {
      this.showProvinces = false;
      this.showcitys = false;
      this.showDistrict = true;
      this.showTown = false;
      this.provinceActive = false;
      this.cityActive = false;
      this.districtActive = true;
      this.townActive = false;
    },
    toggleTown() {
      this.showProvinces = false;
      this.showcitys = false;
      this.showDistrict = false;
      this.showTown = true;
      this.provinceActive = false;
      this.cityActive = false;
      this.districtActive = false;
      this.townActive = true;
    },
    closeAddress() {
      this.showSelectAddress = false; // 关闭挑选地址列表
    },
    async initAddress(newValue) {
      // 初始化省市区镇
      if (newValue.length !== 0) {
        this.address = "";
        this.provinceId = newValue[0];
        this.cityId = newValue[1];
        this.districtId = newValue[2];
        this.townId = newValue[3] ? newValue[3] : "";
        let p1 = new Promise((resolve, reject) => {
          this.$api.getJdAreaApi({ id: 0, type: 0 }).then(res => {
            resolve(res.data);
          });
        });
        let p2 = new Promise((resolve, reject) => {
          this.$api
            .getJdAreaApi({ id: Number(this.provinceId), type: 1 })
            .then(res => {
              resolve(res.data);
            });
        });
        let p3 = new Promise((resolve, reject) => {
          this.$api
            .getJdAreaApi({ id: Number(this.cityId), type: 2 })
            .then(res => {
              resolve(res.data);
            });
        });
        let p4 = new Promise((resolve, reject) => {
          this.$api
            .getJdAreaApi({ id: Number(this.districtId), type: 3 })
            .then(res => {
              resolve(res.data);
            });
        });
        const resArr = await Promise.all([p1, p2, p3, p4]);
        resArr.forEach((item, index) => {
          if (index === 0) {
            for (let k in resArr[0]) {
              if (this.provinceId === resArr[0][k]) {
                this.province = k;
                this.address += k;
              }
            }
          }
          if (index === 1) {
            this.citysList = resArr[1];
            for (let k in resArr[1]) {
              if (this.cityId === resArr[1][k]) {
                this.city = k;
                this.address += k;
              }
            }
          }
          if (index === 2) {
            this.districtList = resArr[2];
            for (let k in resArr[2]) {
              if (this.districtId === resArr[2][k]) {
                this.district = k;
                this.address += k;
              }
            }
          }
          if (index === 3) {
            this.townList = resArr[3];
            for (let k in resArr[3]) {
              if (this.townId === resArr[3][k]) {
                this.town = k;
                this.address += k;
              }
            }
          }
        });
      }
    },
    selectAddress() {
      this.showSelectAddress = !this.showSelectAddress;
    }
  },
  watch: {
    async addressCode(newValue, oldValue) {
      this.addressCode = newValue;
      this.initAddress(newValue); // 通过监听地址的变化来初始化选中的地区
    },
    showSelectAddress(newValue, oldValue) {
      if (newValue) {
        this.ids.length !== 0
          ? this.initAddress(this.ids)
          : this.initAddress(this.addressCode); // 通过监听地址的变化来初始化选中的地区
      }
    }
  }
};
</script>

<style lang="scss" scope>
.my-address {
  display: flex;
  align-items: center;
  .my-address-left {
    display: inline-block;
    width: 118px;
    height: 32px;
    font-size: 28px;
    font-family: DIN;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 32px;
    margin-right: 70px;
    white-space: nowrap;
  }
  .my-address-right {
    width: 400px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.address-select-wrapper {
  width: 100%;
  background-color: #fff;
  .w-addres-mask {
    z-index: 9999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  .w-address-bg {
    .w-address-content {
      width: 100%;
      height: 700px;
      position: absolute;
      bottom: -700px;
      left: 0;
      background-color: #fff;
      transform: translate3d(0, -100%, 0);
      z-index: 2;
      &.fold-enter-active,
      &.fold-leave-active {
        transition: all 0.5s;
      }
      &.fold-enter,
      &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .content-header {
        position: relative;
        text-align: center;
        color: #666;
        line-height: 80px;
        .close-w-address {
          position: absolute;
          width: 40px;
          height: 40px;
          top: 50%;
          right: 80px;
          transform: translateY(-50%);
          /*关闭按钮*/
          .close {
            width: 40px;
            height: 40px;
            position: relative;
            display: block;
          }

          .close:before,
          .close:after {
            content: "";
            position: absolute;
            top: 50%;
            width: 40px;
            height: 1px;
            background-color: #999;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
          }

          .close:after {
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }
        }
      }
      .content-body {
        .active-item {
          color: $primary-1 !important;
        }
        .selected-list {
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          line-height: 70px;
          display: flex;
          .selected-list-item {
            margin: 0 40px;
            color: #333;
            font-size: 28px;
          }
        }
        .w-area {
          overflow-y: scroll;
          height: 550px;
          .w-area-list {
            .area-list-item {
              list-style: none;
              color: #333;
              margin: 20px 0 30px 40px;
              font-size: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
