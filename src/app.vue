<template>
  <div>
    <h1 class="example">{{ url }}</h1>  
    <img :src="url+'logo.jpg'"  data-rjs="3"  style="width:300px;height:300px;"/> 
    <img src="./assets/images/logo.jpg" style="width:300px;height:300px;"/> 
  </div> 
</template>

<script>

export default {
  data () {
    return {
      url: window.baseImgUrl,
    }
  },
  computed:{

  }
}
</script>

<style scoped lang="less" >
.example {
  color: yellow;
  font-size:36px;/*px*/
  
}
</style>