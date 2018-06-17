import Vue from "vue";
import App from './app.vue';
require('./assets/main.less');
alert(1);
var vm=new Vue({
    el: '#app',
    data(){
      return {
      
      }
    },
    template: '<App/>',
    components: { App },
    
  })
  
