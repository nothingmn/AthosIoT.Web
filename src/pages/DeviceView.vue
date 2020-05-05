<template>
    <card class="col" >
        <div class="row" v-if="device.visible">
            <badger-accordion class="col-12 ">
                <badger-accordion-item class="col-12">
                    <template slot="header" class="row">
                        <div class="table-responsive card-body">
                            <table class="table">
                                <tbody>
                                    <tr class="row">
                                        <td class="col col-8">
                                            <h3 slot="header" class="col card-title " :title="tooltip(device)">
                                                {{device.name}}
                                                <p class="mouse text-muted">{{moment(device.timeStamp).fromNow()}}</p>
                                            </h3>
                                        </td>
                                        <td class="col col-1">
                                            <div class="col pull-right">
                                                <div v-if="device.system && device.system.rssi_percent"
                                                    title="Wifi Signal Strength" style="color:white"
                                                    class="tim-icons icon-wifi">
                                                    <p class="big-mouse text-muted">{{device.system.rssi_percent}}%</p>&nbsp;&nbsp;</div>
                                            </div>
                                        </td>
                                        <td class="col col-3">
                                            <div class="col pull-right">
                                                <div v-if="device.system && device.system.rssi_percent" title="Wifi Signal Strength" :style="wifiStyle">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </template>
                    <template slot="content" class="col-12">
                        <div class="table-responsive card-body">
                            <table class="table">
                                <tbody>
                                    <tr class="row">
                                        <td class="col">
                                            <button type="submit" class="btn btn-info btn-simple  float-right"
                                                @click.prevent="wipe">
                                                <p>Wipe</p>
                                            </button>
                                            <button type="submit" class="btn btn-info  btn-simple float-right"
                                                @click.prevent="reset">
                                                <p>Reset</p>
                                            </button>
                                            <button type="submit" class="btn btn-info  btn-simple float-right"
                                                @click.prevent="restart">
                                                <p>Restart</p>
                                            </button>
                                            <button type="submit" class="btn btn-info btn-simple float-right"
                                                @click.prevent="firmware_update(device)">
                                                <p>Firmware</p>
                                            </button>
                                            <button type="submit" class="btn btn-info  btn-simple float-right"
                                                @click.prevent="delete_device(device)">
                                                <p>Delete</p>
                                            </button>
                                            <button type="submit" class="btn btn-info btn-simple float-right"
                                                @click.prevent="rename(device)">
                                                <p>Rename</p>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr class="row">
                                        <td class="col">
                                            <button type="submit" class="btn btn-primary btn-simple float-right"
                                                @click.prevent="ping">
                                                <p>Ping</p>
                                            </button>
                                            <div v-if="(device.relay)">
                                                <button type="submit" class="btn btn-primary btn-simple float-right"
                                                    @click.prevent="all_off(device)">
                                                    <p>All Off</p>
                                                </button>
                                                <button type="submit" class="btn btn-primary btn-simple float-right"
                                                    @click.prevent="all_on(device)">
                                                    <p>All On</p>
                                                </button>
                                            </div>
                                            <div v-if="(device.NeoPixel)">
                                                <button type="submit" class="btn btn-primary btn-simple float-right"
                                                    @click.prevent="all_off(device)">
                                                    <p>All Off</p>
                                                </button>
                                                <button type="submit" class="btn btn-primary btn-simple float-right"
                                                    @click.prevent="all_on(device)">
                                                    <p>All On</p>
                                                </button>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <div v-if="device.ping" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Ping Delay</p>
                                            </th>
                                            <td class="col">
                                                <div v-if="device.ping">
                                                    <p>{{device.ping.roundTrip}} seconds</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq135" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <div v-if="device.mq135">
                                                    <p>{{device.mq135.ratio}}%</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Carbon_dioxide"
                                                        target="_new">Carbon Dioxide</a></p>
                                            </th>
                                            <td class="col">
                                                <div v-if="device.mq135">
                                                    <p>{{device.mq135.co2}}ppm</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.NeoPixel" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Device Pin</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.NeoPixel.Pin}}</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Pixel Count</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.NeoPixel.Count}}</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq8" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <div v-if="device.mq8">
                                                    <p>{{device.mq8.ratio}}%</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Hydrogen"
                                                        target="_new">Hydrogen</a></p>
                                            </th>
                                            <td class="col">
                                                <div v-if="device.mq8">
                                                    <p>{{device.mq8.hydrogen}}ppm</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq7" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <div v-if="device.mq7">
                                                    <p>{{device.mq7.ratio}}%</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Carbon_Monoxide"
                                                        target="_new">Carbon Monoxide</a></p>
                                            </th>
                                            <td class="col">
                                                <div v-if="device.mq7">
                                                    <p>{{device.mq7.co}}ppm</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.bmp280" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Temperature"
                                                        target="_new">Temperature</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.bmp280.temp}}&deg;C</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Humidity"
                                                        target="_new">Humidity</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.bmp280.humidity}}% Relative Humidity</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Atmospheric_pressure"
                                                        target="_new">Atmospheric Pressure</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.bmp280.pressure}} hPa</p>
                                            </td>
                                        </tr>
                                        <tr class="row">

                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Altitude"
                                                        target="_new">Altitude</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.bmp280.altitude}} meters</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.tmp36" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Temperature"
                                                        target="_new">Temperature</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.tmp36.temp}}&deg;C</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.button" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Buttons</p>
                                            </th>
                                            <td class="col">
                                                    <p v-for="(item, index) in device.button" :key="item">
                                                        {{index}} = {{item}}
                                                    </p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.dht11" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Temperature"
                                                        target="_new">Temperature</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.dht11.temp}}&deg;C</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Humidity"
                                                        target="_new">Humidity</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.dht11.humidity}} % Relative Humidity</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Heat_index" target="_new">Heat
                                                        Index</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.dht11.headIndex}}&deg;C</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.dht22" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Temperature"
                                                        target="_new">Temperature</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.dht22.temp}}&deg;C</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Humidity"
                                                        target="_new">Humidity</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.dht22.humidity}} % Relative Humidity</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Heat_index" target="_new">Heat
                                                        Index</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.dht22.headIndex}}&deg;C</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.moisture" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Moisture Level</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.moisture.level}}%</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq2" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq2.ratio}}%</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Liquefied_petroleum_gas"
                                                        target="_new">Liquefied petroleum gas</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq2.lpg}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Methane"
                                                        target="_new">Methane</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq2.methane}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Smoke" target="_new">Smoke</a>
                                                </p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq2.smoke}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Hydrogen"
                                                        target="_new">Hydrogen</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq2.hydrogen}} ppm</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq9" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq9.ratio}}%</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Liquefied_petroleum_gas"
                                                        target="_new">Liquefied petroleum gas</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq9.lpg}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Methane"
                                                        target="_new">Methane</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq9.methane}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Carbon_monoxide"
                                                        target="_new">Carbon Monoxide</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq9.co}} ppm</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq6" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq6.ratio}}%</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Liquefied_petroleum_gas"
                                                        target="_new">Liquefied petroleum gas</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq6.lpg}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Butane"
                                                        target="_new">Butane</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq6.butane}} ppm</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq5" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq5.ratio}}%</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Liquefied_petroleum_gas"
                                                        target="_new">Liquefied petroleum gas</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq5.lpg}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Methane"
                                                        target="_new">Methane</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq5.methane}} ppm</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq4" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq4.ratio}}%</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Compressed_natural_gas"
                                                        target="_new">Compressed natural gas</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq4.cng}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Methane"
                                                        target="_new">Methane</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq4.methane}} ppm</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.mq3" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Sensor Resistance Ratio</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq3.ratio}}%</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Alcohol"
                                                        target="_new">Alcohol</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq3.alcoholPPM}} ppm</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p><a href="https://en.wikipedia.org/wiki/Alcohol"
                                                        target="_new">Alcohol</a></p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.mq3.alcoholMGL}} mG/L</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.pir" class="col">
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>Last Movement</p>
                                            </th>
                                            <td class="col">
                                                <p>{{(new Date(device.pir.movement.timeStamp)).toLocaleString()}}</p>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th scope="row" class="col">
                                                <p>State</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.pir.movement.moved}}</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div v-if="device.relay" class="col">
                                        <tr class="row" v-for="o in device.relay" v-if="o.id" v-bind:key="o.id">
                                            <th class="col">
                                                <p>{{o.id}} : {{o.name}}</p>
                                            </th>
                                            <td class="float-right col">
                                                <button type="submit" class="btn btn-primary btn-simple float-right"
                                                    @click="relay_rename(device, o)">
                                                    <p>Rename</p>
                                                </button>
                                                <div v-if="!o.id.startsWith('M')">
                                                    <button type="submit" class="btn btn-primary btn-simple float-right"
                                                        @click.prevent="relay_off(device, o)">
                                                        <p>Off</p>
                                                    </button>
                                                    <button type="submit" class="btn btn-primary btn-simple float-right"
                                                        @click.prevent="relay_on(device, o)">
                                                        <p>On</p>
                                                    </button>
                                                </div>
                                                <div v-if="o.id.startsWith('M')">
                                                    <button type="submit" class="btn btn-primary btn-simple float-right"
                                                        @click.prevent="relay_off(device, o)">
                                                        <p>Toggle</p>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </div>
                                    <div class="col">
                                        <tr class="row">
                                            <th class="col">
                                                <p>Id</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.deviceid}}</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div class="col">
                                        <tr class="row">
                                            <th class="col">
                                                <p>Type</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.type}}</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div class="col">
                                        <tr class="row">
                                            <th class="col">
                                                <p>Version</p>
                                            </th>
                                            <td class="col">
                                                <p>{{device.version}}</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <div class="col">
                                        <tr class="row">
                                            <th class="col">
                                                <p>Last Updated</p>
                                            </th>
                                            <td class="col">
                                                <p>{{(new Date(device.timeStamp)).toLocaleString()}}</p>
                                            </td>
                                        </tr>
                                    </div>
                                    <tr>
                                        <th></th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="clearfix"></div>
                        <rename-relay-modal name="rename-relay-modal" />
                        <rename-device-modal name="rename-device-modal" />
                        <device-firmware-update-modal name="device-firmware-update-modal" />

                    </template>
                </badger-accordion-item>

            </badger-accordion>
        </div>
    </card>

</template>
<script>
const Card = () => import(/* webpackChunkName: "common" */ "@/components/Cards/Card.vue");
import RenameRelayModal from "@/components/RenameRelayModal.vue";
import RenameDeviceModal from "@/components/RenameDeviceModal.vue";
import DeviceFirmwareUpdateModal from "@/components/DeviceFirmwareUpdateModal.vue";
import Vue from 'vue'
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'

export default {
    components: {
      Card,
      RenameRelayModal,
      RenameDeviceModal,
      DeviceFirmwareUpdateModal,
      BadgerAccordion,
      BadgerAccordionItem
    },
    props : ['device', 'visible'],
    data () {
      return {
        
      }
    },
    computed : {
        wifiStyle : function() {        
          if(this.device && this.device.system && this.device.system.rssi_percent) {
            var p = this.device.system.rssi_percent;
            var color = "green";
            var fontColor = "white";
            if(p <= 25) {
              color = "red"            
            } else if( p > 25 && p<= 75) {
              color = "yellow";
              fontColor = "black";
            }
            return  "background-color:"+color+"; width:"+ p +"px; color:"+fontColor+"; vertical-align:bottom; text-align:center;  height:25px";
          } else {
            return "width:0px; vertical-align: middle; height:0px";
          }
        }
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
            if(device.system.rssi_percent) tip +=      "Signal Strength:          " + device.system.rssi_percent + "%\n";
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
        restart() {
          console.log('restart device:', this.device.deviceid );
          Vue.prototype.$socket.send(JSON.stringify({ action : "restart-device", deviceid : this.device.deviceid }));
        },
        delete_device() {
          console.log('delete-device:', this.device.deviceid );
          Vue.prototype.$socket.send(JSON.stringify({ action : "delete-device", deviceid : this.device.deviceid }));
        }
    }
  }

</script>
<style>
.mouse {
/*  12px  */
  font-size:0.75rem;
}
.big-mouse {
/*  12px  */
  font-size:0.85rem;
}
</style>
