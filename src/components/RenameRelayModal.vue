<template>
    <modal name="rename-relay-modal"  @before-open="beforeOpen">
        <div class="row">
          <div class="col">
            <h1 class="text-primary">Rename Relay</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="text-primary">Please enter the new name for the pin:{{relay.id}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input v-model="relay.name" placeholder="Relay Name">
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-primary btn-simple float-right" @click="hide()">
            Cancel
            </button>
            <button type="submit" class="btn btn-primary btn-simple float-right" @click="relay_rename()">
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
  name: 'rename-relay-modal',  
  //props : ['relay', 'device', 'existingName'],
  data () {
    return {
      relay : {},
      device : {}
    }
  },
  methods: {
    beforeOpen (event) {
      this.relay = event.params.model.relay;
      this.device = event.params.model.device;
    },
    hide() {
        this.$modal.hide('rename-relay-modal');
    },
    relay_rename(){
          console.log('renaming relay switch:', this.relay.id, this.relay.name );
          Vue.prototype.$socket.send(JSON.stringify({ action : "rename-relay-switch", device : this.device, relay : this.relay, name: this.relay.name }));
          this.$modal.hide('rename-relay-modal');

        },
  }
}
</script>