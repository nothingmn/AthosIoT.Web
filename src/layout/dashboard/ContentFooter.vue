<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        <a href="https://github.com/nothingmn/AthosIoT/" target="_new">© {{year}} Athos IoT</a>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
