<template>
  <div id="app">
    <el-row>
      <el-col :span="2" :offset="4">选择ip类型:</el-col>
      <el-col :span="4">
        <el-select v-model="ipType" placeholder="请选择ip类型">
          <el-option
            v-for="item in ipTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" v-if="ipType == 'point'">
        <el-button type="primary" icon="el-icon-plus" @click="addIp"></el-button>
      </el-col>
    </el-row>

    <div v-if="ipType == 'series' ">
      <el-row>
        <el-col :span="4" :offset="4">
          <ip-input v-on:getIP="getStartSeriesIp"></ip-input>
        </el-col>
        <el-col :span="1">
          <div style="width:100%;height:1px;margin:0px auto;padding:0px;overflow:hidden;"></div>
        </el-col>
        <el-col :span="4">
          <ip-input v-on:getIP="getEndSeriesIp"></ip-input>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row type="flex">
        <el-col :span="6" :offset="6">
          <div v-for="item in ipList" :key="item.key" style="height:50px;">
            <ip-input v-model="item.value" :ipInputKey="item.key" v-on:getIP="getCurrentIp"></ip-input>
            <el-button style="position:relative;left:200px;top:-57px;" type="primary" icon="el-icon-delete" @click="delIp(item.key)"></el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row style="margin-top:20px;">
      <el-col :span="2" :offset="4">选择端口类型:</el-col>
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

    <div style="margin-top:10px;">
    <div v-if="portType == 'series'">
      <el-row>
        <el-col :span="4" :offset="4">
          <el-input-number v-model="startSeriesPort" :precision="0" :step="1" :min="1" :max="60000"></el-input-number>
        </el-col>
        <el-col :span="4">
          <el-input-number v-model="endSeriesPort" :precision="0" :step="1" :min="1" :max="60000"></el-input-number>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row type="flex">
        <el-col :span="4" :offset="4">
          <div v-for="item in portList" :key="item.key" style="height:50px;">
            <el-input-number v-model="item.value" :precision="0" :step="1" :min="1" :max="60000"></el-input-number>
            <el-button style="position:relative;left:200px;top: -40px;" type="primary" icon="el-icon-delete" @click="delPort(item.key)"></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
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
            portType: 'series',
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
        };
    },
    methods: {
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
    },
};
</script>
<style>
#app {
    margin-top: 50px;
}
</style>

