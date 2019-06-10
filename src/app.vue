<template>
  <div id="app">
    <el-row>
      <el-col :span="2" :offset="4">
        <div class="textCenter">选择ip类型：</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="ipType" @change="changeIpType" placeholder="请选择ip类型">
          <el-option
            v-for="item in ipTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" v-bind:style="{visibility:isShow}">
        <el-button type="primary" icon="el-icon-plus" @click="addIp"></el-button>
      </el-col>

      <el-col :span="2" :offset="2">
        <div class="textCenter">选择端口类型：</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="portType" placeholder="请选择端口类型">
          <el-option
            v-for="item in portTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" v-if="portType == 'point'">
        <el-button type="primary" icon="el-icon-plus" @click="addPort"></el-button>
      </el-col>
    </el-row>

    <el-row style="max-height:300px;overflow-y:auto">
      <el-col :span="6" :offset="6">
        <div v-if="ipType == 'series' ">
          <div>
            <ip-input v-on:getIP="getStartSeriesIp"></ip-input>
          </div>
          <div
            style="border-bottom: 1px solid;width:15px;position: relative;top: -37px;left: 200px;"
          ></div>
          <div style="position: relative;top: -74px;left: 221px;">
            <ip-input v-on:getIP="getEndSeriesIp"></ip-input>
          </div>
        </div>
        <div v-else>
          <div v-for="item in ipList" :key="item.key" style="height:50px;">
            <ip-input v-model="item.value" :ipInputKey="item.key" v-on:getIP="getCurrentIp"></ip-input>
            <el-button
              style="position:relative;left:200px;top:-57px;"
              type="primary"
              icon="el-icon-delete"
              @click="delIp(item.key)"
            ></el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10" :offset="marginLeft" style="margin-top:10px">
        <div v-if="portType == 'series'">
          <el-input-number v-model="startSeriesPort" :precision="0" :step="1" :min="1" :max="60000"></el-input-number>
          <div
            style="border-bottom: 1px solid;width:15px;position: relative;top: -20px;left: 190px;"
          ></div>
          <el-input-number
            style="left: 215px;top: -40px;"
            v-model="endSeriesPort"
            :precision="0"
            :step="1"
            :min="1"
            :max="60000"
          ></el-input-number>
        </div>
        <div v-else>
          <div v-for="item in portList" :key="item.key" style="height:50px;margin-left:125px">
            <el-input-number v-model="item.value" :precision="0" :step="1" :min="1" :max="60000"></el-input-number>
            <el-button type="primary" icon="el-icon-delete" @click="delPort(item.key)"></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="position: absolute;left: 20%;top: 55%;width:80%">
      <h5>扫描结果：</h5>
      <el-table :data="tableData" border style="width: 50%;" height="250">
        <el-table-column prop="ip" label="ip地址" width="180"></el-table-column>
        <el-table-column prop="port" label="端口" width="180"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </div>

    <el-row style="position: absolute;left: 70%;top: 90%;">
      <el-button type="success" @click="startScan">开始扫描</el-button>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'app',
    data() {
        return {
            ipTypeList: [
                { label: 'ip段', value: 'series' },
                { label: '指定ip', value: 'point' },
            ],
            portTypeList: [
                { label: '端口段', value: 'series' },
                { label: '指定端口', value: 'point' },
            ],
            ipType: 'series',
            portType: 'point',
            startSeriesIp: '',
            endSeriesIp: '',
            startSeriesPort: 1,
            endSeriesPort: 1,
            portList: [
                { key: '135', value: '135' },
                { key: '136', value: '136' },
                { key: '137', value: '137' },
                { key: '138', value: '138' },
                { key: '139', value: '139' },
                { key: '445', value: '445' },
            ],
            ipList: [{ key: '1', value: '' }],
            marginLeft: 2,
            tableData: [],
            fullscreenLoading: false,
        };
    },
    computed: {
        isShow: function() {
            if (this.ipType == 'series') {
                return 'hidden';
            } else {
                return 'visible';
            }
        },
    },
    methods: {
        changeIpType(type) {
            if (type === 'series') {
                this.marginLeft = 2;
            } else {
                if (this.ipList.length == 0) {
                    this.marginLeft = 14;
                }
            }
        },
        getStartSeriesIp(data) {
            console.info(data);
            this.startSeriesIp = data;
        },
        getEndSeriesIp(data) {
            console.info(data);
            this.endSeriesIp = data;
        },
        getCurrentIp(data, key) {
            console.log(data, key);
            this.ipList.forEach(item => {
                if (item.key === key) {
                    item.value = data;
                }
            });
        },
        addIp() {
            if (this.ipList.length == 0) {
                this.marginLeft = 2;
            }
            this.ipList.push({ key: Date.now().toString(), value: '' });
        },
        delIp(key) {
            let index = null;
            for (let i = 0; i < this.ipList.length; i++) {
                if (this.ipList[i].key === key) {
                    index = i;
                }
            }
            if (index != null) {
                this.ipList.splice(index, 1);
            }
            if (this.ipList.length == 0) {
                this.marginLeft = 14;
            }
        },
        addPort() {
            this.portList.push({ key: Date.now().toString(), value: '' });
        },
        delPort(key) {
            console.log(key);
            let index = null;
            for (let i = 0; i < this.portList.length; i++) {
                if (this.portList[i].key === key) {
                    index = i;
                }
            }
            if (index != null) {
                this.portList.splice(index, 1);
            }
        },
        /**
         * 开始扫描端口
         */
        startScan() {
            let data = {
                ipType: this.ipType,
                portType: this.portType,
                ports: [],
                ips: [],
            };
            if (this.ipType === 'series') {
                let start = this.startSeriesIp;
                let end = this.endSeriesIp;
                if (start === '' || end === '') {
                    this.$message.error('起始或终止ip为空！');
                    return;
                }
                let s = start.substring(
                    start.lastIndexOf('.') + 1,
                    start.length
                );
                let e = end.substring(end.lastIndexOf('.') + 1, end.length);
                console.log('s,e', s, e);
                if (Number(s) >= Number(e)) {
                    this.$message.error('开始ip地址不能大于结束ip地址');
                    return;
                }
                data.ips.push(start);
                data.ips.push(end);
            } else {
                if (!this.ipList) {
                    this.$message.error('ip不能为空');
                    return;
                }
                this.ipList.forEach(item=>{
                  data.ips.push(item.value);
                });
            }

            if (this.portType === 'series') {
                let start = this.startSeriesPort;
                let end = this.endSeriesPort;
                if (start >= end) {
                    this.$message.error('开始端口不能大于结束端口');
                    return;
                }
                data.ports.push(start);
                data.ports.push(end);
            } else {
                if (!this.portList) {
                    this.$message.error('端口不能为空');
                    return;
                }
                this.portList.forEach(item => {
                   data.ports.push(item.value);
                });
            }
            console.log("data",data);
           

            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            let url = window.document.location.origin;
            axios.post(url+'/port/scan/start', data)
            .then(res => {
              if(res.data.status == '1'){
                let resdata = res.data.data;
                this.tableData = resdata;
                console.log("resdata",resdata);
                loading.close();
              }else{
                loading.close();
                this.$message.error(res.data.msg);
              }
              console.log(res);

            })
            .catch(error => {
              console.log(error);
              loading.close();
              this.$message.error(error.toString());
            });
        },
    },
};
</script>
<style>
#app {
    margin-top: 50px;
}

.textCenter{
  text-align:center;
  padding-top: 8px;
}

</style>

