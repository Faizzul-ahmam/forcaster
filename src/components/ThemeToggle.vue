<template>
  <img :src="theme_icon" @click="changeTheme" class="self-mid theme-icon">
</template>

<script>
import {computed, onMounted, ref } from 'vue';
import {useStore} from 'vuex';
import returnImage from '../assets/image/weather'

export default {
  name:'ThemeToggle',
  components:{},
  setup(){
    //Data/Variable
    const store = useStore()
    const current_theme = computed(()=>store.getters.getCurrentTheme)
    const theme_icon = ref('')
    

    const setCurrentTheme = () => {
      let theme = document.getElementsByTagName("HTML")[0].attributes["data-theme"].value
      store.commit("SET_CURRENT_THEME",theme)
    }

    const getImage=()=>{ 
      if (current_theme.value == 'light')
      {
        theme_icon.value = returnImage().day
      }
      else
      {
        theme_icon.value = returnImage().night
      }
    }

    const changeTheme = async ()=>{
      store.dispatch('setTheme')
      getImage()
      setCurrentTheme()
      // let tag = document.getElementsByTagName("HTML")[0];
      // store.dispatch('theme_transition')
      // tag.setAttribute("data-theme", theme.value == 'light' ? "dark":"light");
      // setCurrentTheme();
    }

    //LifeCycle Hook
    onMounted(()=>{
      setCurrentTheme()
      getImage()
    })
    
    return{
      changeTheme ,theme_icon
    }
  }
}
</script>

<style>

</style>