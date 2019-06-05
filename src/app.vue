<template>
  <div id="app">
    <el-row>
      <el-col :span="2" :offset="4">
        选择ip类型:
      </el-col>
      <el-col :span="4">
        <el-select v-model="ipType" placeholder="请选择ip类型">
          <el-option v-for="item in ipTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
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
      <el-row>
        <el-col :span="4" :offset="6">
           <ip-input v-on:getIP="getStartSeriesIp"></ip-input>
        </el-col>
      </el-row>
    </div>

    <el-row style="margin-top:20px;">
      <el-col :span="2" :offset="4">
        选择端口类型:
      </el-col>
      <el-col :span="4">
        <el-select v-model="portType" placeholder="请选择端口类型">
          <el-option v-for="item in portTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
   
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
      <!-- <el-input-number v-model="num" :precision="2" :step="0.1" :max="10"></el-input-number> -->
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
            portTypeList:[
                { label: '端口段', value: 'series' },
                { label: '指定端口', value: 'point' },
            ],
            ipType: 'series',
            portType:'series',
            startSeriesIp:'',
            endSeriesIp:'',
            startSeriesPort: 1,
            endSeriesPort: 1
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
    },
};
</script>
<style>
#app{
  margin-top:50px;
}
</style>

