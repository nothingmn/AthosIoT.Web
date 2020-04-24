<template>
   <div class="card">
    <div class="card-header">
      <h5 class="title">Select Server</h5>
      <p class="category">If you have more than one AthosIoT server, choose your instance here</p>
    </div>
    <div class="card-body all-icons">
      <div class="row">
         <input type="text" name="server"></input>
      </div>
    </div>
  </div>
</template>
<script>
  import BaseDropdown from '@/components/BaseDropdown';

  export default {
    components: {
      BaseDropdown
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      initBigChart(index) {
      }
    },
    mounted() {
    },
    beforeDestroy() {
    }
  };
</script>
<style>
</style>
