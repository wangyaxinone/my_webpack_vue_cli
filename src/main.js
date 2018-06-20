import Vue from "vue";
import App from './app.vue';
require('./assets/main.less');
import retinajs from "retinajs";
retinajs();
console.log(retinajs);
window.baseImgUrl = 'img/'
var vm=new Vue({
    el: '#app',
    data(){
      return {
      
      }
    },
    template: '<App/>',
    components: { App },
    
  })
  
