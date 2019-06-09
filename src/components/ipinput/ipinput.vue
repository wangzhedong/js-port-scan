<template>
  <ul class="ipAdress">
    <li v-for="(item,index) in ipAdress" :key="index">
      <input
        type="text"
        @input="checkIpVal(item,index)"
        @keyup="turnIpPOS(item,index,$event)"
        v-model="item.value"
        ref="ipInput"
        @blur="setDefaultVal(item)"
      >
      <div></div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "ip-input",
  props:{
    ipInputKey:String
  },
  data() {
    return {
      ipAdress: [
        {
          value: ""
        },
        {
          value: ""
        },
        {
          value: ""
        },
        {
          value: ""
        }
      ]
    };
  },
  watch: {
    ipAdress: {
      handler(newVal, oldVal) {
        let ip = '';
        for(let i = 0;i<newVal.length;i++){
          let v = newVal[i].value
          if(v == ""){
            v = '0';
          }
          if(i == newVal.length -1){
            ip += v
          }else{
            ip += (v+".") 
          }
        }
        this.$emit("getIP",ip,this.ipInputKey);
      },
      deep: true
    }
  },
  methods: {
    checkIpVal(item, index) {
      //确保每个值都处于0-255
      let val = item.value;
      //当输入的是空格时，值赋为空
      val = val.trim();
      val = parseInt(val, 10);
      if (isNaN(val)) {
        val = "";
      } else {
        val = val < 0 ? 0 : val;
        val = val > 255 ? 255 : val;
      }
      item.value = val;
    },
    turnIpPOS(item, index, event) {
      let e = event || window.event;
      //左箭头向左跳转，左一不做任何措施
      if (e.keyCode == 37) {
        if (index == 0) {
        } else {
          this.$refs.ipInput[index - 1].focus();
        }
      }
      //删除键把当前数据删除完毕后会跳转到前一个input，左一不做任何处理
      if (e.keyCode == 8) {
        let val = item.value;
        if (index == 0) {
        } else {
          this.$refs.ipInput[index - 1].focus();
        }
      }
      //右箭头、回车键、空格键、冒号均向右跳转，右一不做任何措施
      if (
        e.keyCode == 39 ||
        e.keyCode == 13 ||
        e.keyCode == 32 ||
        e.keyCode == 190
      ) {
        if (index == 3) {
        } else {
          this.$refs.ipInput[index + 1].focus();
        }
      }
    },
    setDefaultVal(item) {
      //当input失去焦点，而ip没有赋值时，会自动赋值为0
      let val = item.value;
      if (val == "") {
        item.value = "0";
      }
    }
  }
};
</script>
<style>
.ipAdress {
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  width: 148px;
  margin-right: 10px;
}
.ipAdress li {
  position: relative;
  height: 40px;
  margin: 0;
  list-style-type: none;
}
ul[class="ipAdress"] input[type="text"] {
  border: none;
  width: 100%;
  height: 40px;
  text-align: center;
  background: transparent;
  font-size: 18px;
  /* color: #efefef; */
}
.ipAdress li div {
  position: absolute;
  bottom: 2px;
  right: 0;
  border-radius: 50%;
  background: #000000;
  width: 2px;
  height: 2px;
}
/*只需要3个div*/
.ipAdress li:last-child div {
  display: none;
}
/*取消掉默认的input focus状态*/
.ipAdress input:focus {
  outline: none;
}
</style>
