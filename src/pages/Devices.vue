<template>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-lg-6" v-for="(card, index) in cards" :key="index">
          <component  :is="card['card-type']" :device="card.card.device">
          </component>
      </div>
  </div>
</template>
<script>
  import { Card } from "@/components/Cards/Card.vue";
  import DeviceView from '@/pages/DeviceView.vue';
  import Vue from 'vue'

  export default {
    components: {
      DeviceView
    },
      data() {
        return {
          cards: [
          ],
          filter : ""
        }
    },
      mounted() {    
        var vm = this;    
        Vue.eventBus.$on("search", function(value) {
          vm.filter = value;
            for(var c in vm.cards) {
              var card = vm.cards[c];
              var device = card.card.device;
              device.visible = vm.isVisible(device, vm.filter);
          }
        });
        var sock = Vue.prototype.$socket;
        sock.send(JSON.stringify({ action : "get-devices" }));
        console.log("get-devices sent");

        sock.onmessage = function(event) {          
          if(event && event.data) {
            var msg = JSON.parse(event.data);
            console.log('onmessage', msg);        

            if(msg.action && msg.action === "devices-list") {
              vm.cards = [];
              for(var d in msg.devices) {
                var device = msg.devices[d];
                device.visible = vm.isVisible(device, vm.filter);
                if(device == null) continue;                
                if(device && device.last && device.last.timeStamp) {
                  device.last.timeStamp = (new Date(device.last.timeStamp));
                }
                var exists = false;
                if(vm.cards) {
                  for(var c in vm.cards) {
                    var card = vm.cards[c];
                    if(card && card.card && card.card.device && card.card.device.deviceid && card.card.device.deviceid == device.deviceid) {
                      exists = true;
                      card.card.device = device;
                    }
                  }
                }
                if(!exists) {
                  var card = {'card': { device : device }, 'card-type' : DeviceView};
                  vm.cards.push(card);
                }

              }
            }          
        }
        };
      },   
      methods: {
        isVisible : function(device, filter) {
          if(filter == "") return true;
          if(!device) return true;
          var filter_lower = filter.toLowerCase();
          if(JSON) {
            var json = JSON.stringify(device).toLowerCase();
            return (json.includes(filter_lower))
          }
          return false;
        }      
    }
  }

</script>
<style>
</style>
