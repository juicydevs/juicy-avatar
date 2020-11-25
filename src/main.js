import Vue from 'vue'
import Component from './Component.vue'

if (document.querySelector('#juicyAvatar'))
{
  Vue.component('juicy-avatar', Component)
  new Vue({
    el: '#juicyAvatar'
  });
}
export default Component
