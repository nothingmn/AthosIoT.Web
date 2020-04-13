<template>
    <modal name="rename-device-modal"  @before-open="beforeOpen">
        <div class="row">
          <div class="col">
            <h1 class="text-primary">Rename Device</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="text-primary">Please enter the new name for the device:{{device.id}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input v-model="device.name" placeholder="Device Name">
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-primary btn-simple float-right" @click="hide()">
            Cancel
            </button>
            <button type="submit" class="btn btn-primary btn-simple float-right" @click="device_rename()">
            Save
            </button>
          </div>
      </div>
    </modal>
</template>
<script>

import Vue from 'vue'

export default {
  components: {
  },  
  name: 'rename-device-modal',  
  data () {
    return {
      device : {}
    }
  },
  methods: {
    beforeOpen (event) {
      this.device = event.params.model.device;
    
    },
    hide() {
        this.$modal.hide('rename-device-modal');
    },
    device_rename(){
        var send =  { action : "rename-device", deviceid : this.device.deviceid, name: this.device.name };
        console.log("object model:", send);
        Vue.prototype.$socket.send(JSON.stringify(send));
        this.$modal.hide('rename-device-modal');
    }
  }
}
</script>