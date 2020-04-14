<template  >
  <card>
  <div class="row" v-if="device.visible" >
    <h3 slot="header" class="col card-title " :title="tooltip(device)">
      {{device.name}} 
    </h3>    
    <div class="table-responsive card-body">
      <table class="table">
          <tbody>
            <tr class="row">
              <td class="col">
                <button type="submit" class="btn btn-info btn-simple  float-right" @click.prevent="wipe">
                  <p>Wipe</p>
                </button>
                <button type="submit" class="btn btn-info  btn-simple float-right" @click.prevent="reset">
                  <p>Reset</p>
                </button>
                <button type="submit" class="btn btn-info btn-simple float-right" @click.prevent="firmware_update(device)">
                  <p>Firmware</p>
                </button>    
                <button type="submit" class="btn btn-info  btn-simple float-right" @click.prevent="delete_device(device)">
                  <p>Delete</p>
                </button>                   
                <button type="submit" class="btn btn-info btn-simple float-right" @click.prevent="rename(device)">
                  <p>Rename</p>
                </button>
              </td>
            </tr>               
          <tr class="row">
            <td class="col">
                <button type="submit" class="btn btn-primary btn-simple float-right" @click.prevent="ping">
                  <p>Ping</p>
                </button>        
                <div v-if="device.relay">
                    <button type="submit" class="btn btn-primary btn-simple float-right" @click.prevent="all_off(device)">
                      <p>All Off</p>
                    </button>
                    <button type="submit" class="btn btn-primary btn-simple float-right" @click.prevent="all_on(device)">
                      <p>All On</p>
                    </button>            
                </div>
            </td>
            <td></td>
          </tr>
            <div v-if="device.ping" class="col">
              <tr class="row">
                <th scope="row" class="col"><p>Ping Delay</p></th>
                <td class="col"><div v-if="device.ping"><p>{{device.ping.roundTrip}} seconds</p></div></td>
              </tr>
            </div>
            <div v-if="device.bmp280"  class="col">
              <tr class="row">
                <th class="col"><p>Temperature</p></th>
                <td class="col"><p>{{device.bmp280.temp}}&deg;C</p></td>
              </tr>
              <tr class="row">
                <th class="col"><p>Humidity</p></th>
                <td class="col"><p>{{device.bmp280.humidity}}% Relative Humidity</p></td>
              </tr>
              <tr  class="row">
                <th class="col"><p>Pressure</p></th>
                <td class="col"><p>{{device.bmp280.pressure}} hPa</p></td>
              </tr>
              <tr  class="row">
                <th class="col"><p>Altitude</p></th>
                <td class="col"><p>{{device.bmp280.altitude}} meters</p></td>
              </tr>
            </div>
            <div v-if="device.tmp36" class="col">
              <tr  class="row">
                <th scope="row" class="col"><p>Temperature</p></th>
                <td class="col"><p>{{device.tmp36.temp}}&deg;C</p></td>
              </tr>                  
            </div>
            <div v-if="device.dht11" class="col">
              <tr  class="row">
                <th scope="row" class="col"><p>Temperature</p></th>
                <td class="col"><p>{{device.dht11.temp}}&deg;C</p></td>
              </tr>
              <tr  class="row">
                <th scope="row" class="col"><p>Humidity</p></th>
                <td class="col"><p>{{device.dht11.humidity}} % Relative Humidity</p></td>
              </tr>
              <tr  class="row">
                <th scope="row" class="col"><p>Heat Index</p></th>
                <td class="col"><p>{{device.dht11.headIndex}}&deg;C</p></td>
              </tr>
            </div>          
            <div v-if="device.moisture"  class="col">
              <tr  class="row">
                <th scope="row" class="col"><p>Moisture Level</p></th>
                <td class="col"><p>{{device.moisture.level}}%</p></td>
              </tr>
            </div>               
            <div v-if="device.mq2" class="col">
              <tr  class="row">
                <th scope="row" class="col"><p>Ratio</p></th>
                <td class="col"><p>{{device.mq2.ratio}}%</p></td>
              </tr>
              <tr  class="row">
                <th scope="row" class="col"><p>LPG</p></th>
                <td class="col"><p>{{device.mq2.lpg}} ppm</p></td>
              </tr>
              <tr  class="row">
                <th scope="row" class="col"><p>Methane</p></th>
                <td class="col"><p>{{device.mq2.methane}} ppm</p></td>
              </tr>
              <tr  class="row">
                <th scope="row" class="col"><p>Smoke</p></th>
                <td class="col"><p>{{device.mq2.smoke}} ppm</p></td>
              </tr>
              <tr  class="row">
                <th scope="row" class="col"><p>Hydrogen</p></th>
                <td class="col"><p>{{device.mq2.hydrogen}} ppm</p></td>
              </tr>
            </div>               
            <div v-if="device.pir" class="col">
              <tr  class="row">
                <th scope="row" class="col"><p>Last Movement</p></th>
                <td class="col"><p>{{(new Date(device.pir.movement.timeStamp)).toLocaleString()}}</p></td>
              </tr>
              <tr  class="row">
                <th scope="row" class="col"><p>State</p></th>
                <td class="col"><p>{{device.pir.movement.moved}}</p></td>
              </tr>
            </div>               
            <div v-if="device.relay" class="col">
              <tr class="row" v-for="o in device.relay"  v-if="o.id" v-bind:key="o.id" >
                <th class="col"><p>{{o.id}} : {{o.name}}</p></th>
                <td class="float-right col">
                  <button type="submit" class="btn btn-primary btn-simple float-right" @click="relay_rename(device, o)">
                  <p>Rename</p>
                  </button>
                  <div v-if="!o.id.startsWith('M')">
                    <button type="submit" class="btn btn-primary btn-simple float-right" @click.prevent="relay_off(device, o)">
                      <p>Off</p>
                    </button>
                    <button type="submit" class="btn btn-primary btn-simple float-right" @click.prevent="relay_on(device, o)">
                      <p>On</p>
                    </button>        
                  </div>             
                  <div v-if="o.id.startsWith('M')">
                    <button type="submit" class="btn btn-primary btn-simple float-right" @click.prevent="relay_off(device, o)">
                      <p>Toggle</p>
                    </button>
                  </div>             
                </td>
              </tr>
            </div>
            <div class="col">
              <tr  class="row">
                <th class="col"><p>Id</p></th>
                <td class="col"><p>{{device.deviceid}}</p></td>
              </tr>
            </div>
            <div class="col">
              <tr  class="row">
                <th class="col"><p> Type</p></th>
                <td class="col"><p>{{device.type}}</p></td>
              </tr>
            </div>
            <div class="col">
              <tr  class="row">
                <th class="col"><p>Version</p></th>
                <td class="col"><p>{{device.version}}</p></td>
              </tr>
            </div>
            <div class="col">
              <tr  class="row">
                <th class="col"><p>Last Updated</p></th>
                <td class="col"><p>{{(new Date(device.timeStamp)).toLocaleString()}}</p></td>
              </tr>
            </div>    
            <tr><th></th><td></td></tr>           
          </tbody>
        </table>
    </div>
    <div class="clearfix"></div>
    <rename-relay-modal name="rename-relay-modal"/>
    <rename-device-modal name="rename-device-modal"/>
    <device-firmware-update-modal name="device-firmware-update-modal"/>
  </div>  
  </card>

</template>
<script>
const Card = () => import(/* webpackChunkName: "common" */ "@/components/Cards/Card.vue");
import RenameRelayModal from "@/components/RenameRelayModal.vue";
import RenameDeviceModal from "@/components/RenameDeviceModal.vue";
import DeviceFirmwareUpdateModal from "@/components/DeviceFirmwareUpdateModal.vue";
import Vue from 'vue'

export default {
    components: {
      Card,
      RenameRelayModal,
      RenameDeviceModal,
      DeviceFirmwareUpdateModal
    },
    props : ['device', 'visible'],
    data () {
      return {
      }
    },
    computed : {
    },
      mounted() {    
      },   
      methods: {
        tooltip(device) {
          var tip =                                    "Name:                        " + device.name + "\n";
          tip +=                                       "Version:                     " + device.version + "\n";
          tip +=                                       "Device Id:                   " + device.deviceid + "\n";
          if(device.system) {
            if(device.system.localIP) tip +=           "Local IP:                     " + device.system.localIP + "\n";
            if(device.system.macAddress) tip +=        "Mac Address:             " + device.system.macAddress + "\n";
            if(device.system.gatewayIP) tip +=         "Gateway IP:               " + device.system.gatewayIP + "\n";
            if(device.system.SSID) tip +=              "SSID:                           " + device.system.SSID + "\n";
            if(device.system.rssi) tip +=              "RSSI:                          " + device.system.rssi + "dB\n";
            if(device.system.SSID) tip +=              "---------------------------------------------------------------------------\n";
            if(device.system.chipId) tip +=            "Chip Id:                      " + device.system.chipId + "\n";
            if(device.system.cpuFreqMHz) tip +=        "CPU Freq MHz:           " + device.system.cpuFreqMHz + "Mhz\n";
            if(device.system.flashChipVendorId) tip += "Flash Chip Vendor Id: " + device.system.flashChipVendorId + "\n";
            if(device.system.freeSketchSpace) tip +=   "Free Sketch Space:     " + device.system.freeSketchSpace + "\n";
            if(device.system.sketchMD5) tip +=         "Sketch MD5:               " + device.system.sketchMD5 + "\n";
            if(device.system.vcc) tip +=               "Vcc:                             " + device.system.vcc + "mV\n";
            if(device.system.coreVersion) tip +=       "Core Version:              " + device.system.coreVersion + "\n";
            if(device.system.sdkVersion) tip +=        "SDK Version:               " + device.system.sdkVersion + "\n";
            if(device.system.rssi_strength) {
              if(device.system.rssi_strength) tip +=              "---------------------------------------------------------------------------\n";
              if(device.system.rssi_strength.title) tip += "This node's Signal Stregth is " + device.system.rssi_strength.title + "\n";
              if(device.system.rssi_strength.desc) tip +=  device.system.rssi_strength.desc + "\n";
            }

          }
          return tip;
        },
        all_on(device) {
          console.log('all_on:',  device.deviceid);
          Vue.prototype.$socket.send(JSON.stringify({ action : "all-on", deviceid : device.deviceid }));

        },
        all_off(device) {
          console.log('all_off:',  device.deviceid);
          Vue.prototype.$socket.send(JSON.stringify({ action : "all-off", deviceid : device.deviceid }));
        },
        firmware_update(device) {
          console.log('firmware_update:',  device.deviceid);

          this.$modal.show('device-firmware-update-modal', { model : {
            device : device
          }});
        },
        relay_rename(device, relay){
          console.log('rename relay:',  device.deviceid, relay.id);

          this.$modal.show('rename-relay-modal', { model : {
            relay : relay,
            device : device,
          }});
        },
        relay_on(device, relay){
          console.log('on relay:',  device.deviceid, relay.id);
          Vue.prototype.$socket.send(JSON.stringify({ action : "relay-on", deviceid : device.deviceid, relay : relay.id }));
        },
        relay_off(device, relay){
          console.log('off relay:',  device.deviceid, relay.id);
          Vue.prototype.$socket.send(JSON.stringify({ action : "relay-off", deviceid : device.deviceid, relay : relay.id }));
        },
        ping() {
          console.log('pinging device:', this.device.deviceid );
          Vue.prototype.$socket.send(JSON.stringify({ action : "ping-device", ts: new Date(), deviceid : this.device.deviceid }));
        }, 
        rename(device) {
          console.log('rename device:', this.device.deviceid );
          this.$modal.show('rename-device-modal', { model : { device : device }});
        }, 
        wipe() {
          console.log('wiping device:', this.device.deviceid );
          Vue.prototype.$socket.send(JSON.stringify({ action : "wipe-device", deviceid : this.device.deviceid }));
        }, 
        reset() {
          console.log('reset device:', this.device.deviceid );
          Vue.prototype.$socket.send(JSON.stringify({ action : "reset-device", deviceid : this.device.deviceid }));
        },
        reboot() {
          console.log('reboot device:', this.device.deviceid );
          Vue.prototype.$socket.send(JSON.stringify({ action : "reboot-device", deviceid : this.device.deviceid }));
        },
        delete_device() {
          console.log('delete-device:', this.device.deviceid );
          Vue.prototype.$socket.send(JSON.stringify({ action : "delete-device", deviceid : this.device.deviceid }));
        }
    }
  }

</script>
<style>

</style>
