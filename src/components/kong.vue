<template>
  <div class='kong'>
      <slot></slot>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
    
    };
  },
  props:{
    data:{
      type:Array,
      default:()=>[]
    }
  },
  computed: {},
  methods: {
    init(){
    },
  },
  created() {
  
  },
  mounted() {
  
  },
  beforeUnmount() { 
  },
}
</script>

<style lang='scss' scoped>
.kong{
    width: 100%;
    height: 100%;
}
</style>