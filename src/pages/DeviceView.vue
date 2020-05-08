<template>
    <card class="col"  :id=device.deviceid>
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
                                    <tr class="row row-12">
                                        <td class="col col-12">
                                            <table width="100%">
                                                <tr><td><span v-if="device.system && device.system.boot && device.system.boot.timeStamp" class="mouse text-muted"><b>First</b>: {{moment(device.system.boot.timeStamp).fromNow()}}<br /></span></td><td><span class="mouse text-muted"><b>Device Id</b>: {{device.deviceid}}</span></td></tr>
                                                <tr><td><span class="mouse text-muted"><b>Last</b>: {{moment(device.timeStamp).fromNow()}}</span></td><td><span class="mouse text-muted"><b>IP Address</b>: {{device.system.localIP}}</span></td></tr>
                                            </table>
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
                                                    <p v-for="(item, index) in device.button" :key="index">
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
                                    
                                    <div v-if="device.NeoPixel" class="col" >
                                        <tr class="row">
                                            <th class="col">
                                                Animation:
                                            </th>
                                            <td class="float-right col">
                                                <select class="animate-animation">
                                                    <option value="FX_MODE_STATIC">STATIC</option>
                                                    <option value="FX_MODE_BLINK">BLINK</option>
                                                    <option value="FX_MODE_BREATH">BREATH</option>
                                                    <option value="FX_MODE_COLOR_WIPE">COLOR WIPE</option>
                                                    <option value="FX_MODE_COLOR_WIPE_INV">COLOR WIPE INV</option>
                                                    <option value="FX_MODE_COLOR_WIPE_REV">COLOR WIPE REV</option>
                                                    <option value="FX_MODE_COLOR_WIPE_REV_INV">COLOR WIPE REV INV</option>
                                                    <option value="FX_MODE_COLOR_WIPE_RANDOM">COLOR WIPE RANDOM</option>
                                                    <option value="FX_MODE_RANDOM_COLOR">RANDOM COLOR</option>
                                                    <option value="FX_MODE_SINGLE_DYNAMIC">SINGLE DYNAMIC</option>
                                                    <option value="FX_MODE_MULTI_DYNAMIC">MULTI DYNAMIC</option>
                                                    <option value="FX_MODE_RAINBOW">RAINBOW</option>
                                                    <option value="FX_MODE_RAINBOW_CYCLE">RAINBOW CYCLE</option>
                                                    <option value="FX_MODE_SCAN">SCAN</option>
                                                    <option value="FX_MODE_DUAL_SCAN">DUAL SCAN</option>
                                                    <option value="FX_MODE_FADE">FADE</option>
                                                    <option value="FX_MODE_THEATER_CHASE">THEATER CHASE</option>
                                                    <option value="FX_MODE_THEATER_CHASE_RAINBOW">THEATER CHASE RAINBOW</option>
                                                    <option value="FX_MODE_RUNNING_LIGHTS">RUNNING LIGHTS</option>
                                                    <option value="FX_MODE_TWINKLE">TWINKLE</option>
                                                    <option value="FX_MODE_TWINKLE_RANDOM">TWINKLE RANDOM</option>
                                                    <option value="FX_MODE_TWINKLE_FADE">TWINKLE FADE</option>
                                                    <option value="FX_MODE_TWINKLE_FADE_RANDOM">TWINKLE FADE RANDOM</option>
                                                    <option value="FX_MODE_SPARKLE">SPARKLE</option>
                                                    <option value="FX_MODE_FLASH_SPARKLE">FLASH SPARKLE</option>
                                                    <option value="FX_MODE_HYPER_SPARKLE">HYPER SPARKLE</option>
                                                    <option value="FX_MODE_STROBE">STROBE</option>
                                                    <option value="FX_MODE_STROBE_RAINBOW">STROBE RAINBOW</option>
                                                    <option value="FX_MODE_MULTI_STROBE">MULTI STROBE</option>
                                                    <option value="FX_MODE_BLINK_RAINBOW">BLINK RAINBOW</option>
                                                    <option value="FX_MODE_CHASE_WHITE">CHASE WHITE</option>
                                                    <option value="FX_MODE_CHASE_COLOR">CHASE COLOR</option>
                                                    <option value="FX_MODE_CHASE_RANDOM">CHASE RANDOM</option>
                                                    <option value="FX_MODE_CHASE_RAINBOW">CHASE RAINBOW</option>
                                                    <option value="FX_MODE_CHASE_FLASH">CHASE FLASH</option>
                                                    <option value="FX_MODE_CHASE_FLASH_RANDOM">CHASE FLASH RANDOM</option>
                                                    <option value="FX_MODE_CHASE_RAINBOW_WHITE">CHASE RAINBOW WHITE</option>
                                                    <option value="FX_MODE_CHASE_BLACKOUT">CHASE BLACKOUT</option>
                                                    <option value="FX_MODE_CHASE_BLACKOUT_RAINBOW">CHASE BLACKOUT RAINBOW</option>
                                                    <option value="FX_MODE_COLOR_SWEEP_RANDOM">COLOR SWEEP RANDOM</option>
                                                    <option value="FX_MODE_RUNNING_COLOR">RUNNING COLOR</option>
                                                    <option value="FX_MODE_RUNNING_RED_BLUE">RUNNING RED BLUE</option>
                                                    <option value="FX_MODE_RUNNING_RANDOM">RUNNING RANDOM</option>
                                                    <option value="FX_MODE_LARSON_SCANNER">LARSON SCANNER</option>
                                                    <option value="FX_MODE_COMET">COMET</option>
                                                    <option value="FX_MODE_FIREWORKS">FIREWORKS</option>
                                                    <option value="FX_MODE_FIREWORKS_RANDOM">FIREWORKS RANDOM</option>
                                                    <option value="FX_MODE_MERRY_CHRISTMAS">MERRY CHRISTMAS</option>
                                                    <option value="FX_MODE_HALLOWEEN">HALLOWEEN</option>
                                                    <option value="FX_MODE_FIRE_FLICKER">FIRE FLICKER</option>
                                                    <option value="FX_MODE_FIRE_FLICKER_SOFT">FIRE FLICKER SOFT</option>
                                                    <option value="FX_MODE_FIRE_FLICKER_INTENSE">FIRE FLICKER INTENSE</option>
                                                    <option value="FX_MODE_CIRCUS_COMBUSTUS">CIRCUS COMBUSTUS</option>
                                                    <option value="FX_MODE_BICOLOR_CHASE">BICOLOR CHASE</option>
                                                    <option value="FX_MODE_TRICOLOR_CHASE">TRICOLOR CHASE</option>
                                                    <option value="FX_MODE_ICU">ICU</option>
                                                </select> 
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th class="col">
                                                Color:
                                            </th>
                                            <td class="float-right col">
                                                Red:
                                                <select class="animate-red">
                                                    <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option><option>60</option><option>61</option><option>62</option><option>63</option><option>64</option><option>65</option><option>66</option><option>67</option><option>68</option><option>69</option><option>70</option><option>71</option><option>72</option><option>73</option><option>74</option><option>75</option><option>76</option><option>77</option><option>78</option><option>79</option><option>80</option><option>81</option><option>82</option><option>83</option><option>84</option><option>85</option><option>86</option><option>87</option><option>88</option><option>89</option><option>90</option><option>91</option><option>92</option><option>93</option><option>94</option><option>95</option><option>96</option><option>97</option><option>98</option><option>99</option><option>100</option><option>101</option><option>102</option><option>103</option><option>104</option><option>105</option><option>106</option><option>107</option><option>108</option><option>109</option><option>110</option><option>111</option><option>112</option><option>113</option><option>114</option><option>115</option><option>116</option><option>117</option><option>118</option><option>119</option><option>120</option><option>121</option><option>122</option><option>123</option><option>124</option><option>125</option><option>126</option><option>127</option><option>128</option><option>129</option><option>130</option><option>131</option><option>132</option><option>133</option><option>134</option><option>135</option><option>136</option><option>137</option><option>138</option><option>139</option><option>140</option><option>141</option><option>142</option><option>143</option><option>144</option><option>145</option><option>146</option><option>147</option><option>148</option><option>149</option><option>150</option><option>151</option><option>152</option><option>153</option><option>154</option><option>155</option><option>156</option><option>157</option><option>158</option><option>159</option><option>160</option><option>161</option><option>162</option><option>163</option><option>164</option><option>165</option><option>166</option><option>167</option><option>168</option><option>169</option><option>170</option><option>171</option><option>172</option><option>173</option><option>174</option><option>175</option><option>176</option><option>177</option><option>178</option><option>179</option><option>180</option><option>181</option><option>182</option><option>183</option><option>184</option><option>185</option><option>186</option><option>187</option><option>188</option><option>189</option><option>190</option><option>191</option><option>192</option><option>193</option><option>194</option><option>195</option><option>196</option><option>197</option><option>198</option><option>199</option><option>200</option><option>201</option><option>202</option><option>203</option><option>204</option><option>205</option><option>206</option><option>207</option><option>208</option><option>209</option><option>210</option><option>211</option><option>212</option><option>213</option><option>214</option><option>215</option><option>216</option><option>217</option><option>218</option><option>219</option><option>220</option><option>221</option><option>222</option><option>223</option><option>224</option><option>225</option><option>226</option><option>227</option><option>228</option><option>229</option><option>230</option><option>231</option><option>232</option><option>233</option><option>234</option><option>235</option><option>236</option><option>237</option><option>238</option><option>239</option><option>240</option><option>241</option><option>242</option><option>243</option><option>244</option><option>245</option><option>246</option><option>247</option><option>248</option><option>249</option><option>250</option><option>251</option><option>252</option><option>253</option><option>254</option><option selected>255</option>
                                                </select> 
                                                Green:
                                                <select class="animate-green">
                                                    <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option><option>60</option><option>61</option><option>62</option><option>63</option><option>64</option><option>65</option><option>66</option><option>67</option><option>68</option><option>69</option><option>70</option><option>71</option><option>72</option><option>73</option><option>74</option><option>75</option><option>76</option><option>77</option><option>78</option><option>79</option><option>80</option><option>81</option><option>82</option><option>83</option><option>84</option><option>85</option><option>86</option><option>87</option><option>88</option><option>89</option><option>90</option><option>91</option><option>92</option><option>93</option><option>94</option><option>95</option><option>96</option><option>97</option><option>98</option><option>99</option><option>100</option><option>101</option><option>102</option><option>103</option><option>104</option><option>105</option><option>106</option><option>107</option><option>108</option><option>109</option><option>110</option><option>111</option><option>112</option><option>113</option><option>114</option><option>115</option><option>116</option><option>117</option><option>118</option><option>119</option><option>120</option><option>121</option><option>122</option><option>123</option><option>124</option><option>125</option><option>126</option><option>127</option><option>128</option><option>129</option><option>130</option><option>131</option><option>132</option><option>133</option><option>134</option><option>135</option><option>136</option><option>137</option><option>138</option><option>139</option><option>140</option><option>141</option><option>142</option><option>143</option><option>144</option><option>145</option><option>146</option><option>147</option><option>148</option><option>149</option><option>150</option><option>151</option><option>152</option><option>153</option><option>154</option><option>155</option><option>156</option><option>157</option><option>158</option><option>159</option><option>160</option><option>161</option><option>162</option><option>163</option><option>164</option><option>165</option><option>166</option><option>167</option><option>168</option><option>169</option><option>170</option><option>171</option><option>172</option><option>173</option><option>174</option><option>175</option><option>176</option><option>177</option><option>178</option><option>179</option><option>180</option><option>181</option><option>182</option><option>183</option><option>184</option><option>185</option><option>186</option><option>187</option><option>188</option><option>189</option><option>190</option><option>191</option><option>192</option><option>193</option><option>194</option><option>195</option><option>196</option><option>197</option><option>198</option><option>199</option><option>200</option><option>201</option><option>202</option><option>203</option><option>204</option><option>205</option><option>206</option><option>207</option><option>208</option><option>209</option><option>210</option><option>211</option><option>212</option><option>213</option><option>214</option><option>215</option><option>216</option><option>217</option><option>218</option><option>219</option><option>220</option><option>221</option><option>222</option><option>223</option><option>224</option><option>225</option><option>226</option><option>227</option><option>228</option><option>229</option><option>230</option><option>231</option><option>232</option><option>233</option><option>234</option><option>235</option><option>236</option><option>237</option><option>238</option><option>239</option><option>240</option><option>241</option><option>242</option><option>243</option><option>244</option><option>245</option><option>246</option><option>247</option><option>248</option><option>249</option><option>250</option><option>251</option><option>252</option><option>253</option><option>254</option><option selected>255</option>
                                                </select> 
                                                Blue:
                                                <select class="animate-blue">
                                                    <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option><option>60</option><option>61</option><option>62</option><option>63</option><option>64</option><option>65</option><option>66</option><option>67</option><option>68</option><option>69</option><option>70</option><option>71</option><option>72</option><option>73</option><option>74</option><option>75</option><option>76</option><option>77</option><option>78</option><option>79</option><option>80</option><option>81</option><option>82</option><option>83</option><option>84</option><option>85</option><option>86</option><option>87</option><option>88</option><option>89</option><option>90</option><option>91</option><option>92</option><option>93</option><option>94</option><option>95</option><option>96</option><option>97</option><option>98</option><option>99</option><option>100</option><option>101</option><option>102</option><option>103</option><option>104</option><option>105</option><option>106</option><option>107</option><option>108</option><option>109</option><option>110</option><option>111</option><option>112</option><option>113</option><option>114</option><option>115</option><option>116</option><option>117</option><option>118</option><option>119</option><option>120</option><option>121</option><option>122</option><option>123</option><option>124</option><option>125</option><option>126</option><option>127</option><option>128</option><option>129</option><option>130</option><option>131</option><option>132</option><option>133</option><option>134</option><option>135</option><option>136</option><option>137</option><option>138</option><option>139</option><option>140</option><option>141</option><option>142</option><option>143</option><option>144</option><option>145</option><option>146</option><option>147</option><option>148</option><option>149</option><option>150</option><option>151</option><option>152</option><option>153</option><option>154</option><option>155</option><option>156</option><option>157</option><option>158</option><option>159</option><option>160</option><option>161</option><option>162</option><option>163</option><option>164</option><option>165</option><option>166</option><option>167</option><option>168</option><option>169</option><option>170</option><option>171</option><option>172</option><option>173</option><option>174</option><option>175</option><option>176</option><option>177</option><option>178</option><option>179</option><option>180</option><option>181</option><option>182</option><option>183</option><option>184</option><option>185</option><option>186</option><option>187</option><option>188</option><option>189</option><option>190</option><option>191</option><option>192</option><option>193</option><option>194</option><option>195</option><option>196</option><option>197</option><option>198</option><option>199</option><option>200</option><option>201</option><option>202</option><option>203</option><option>204</option><option>205</option><option>206</option><option>207</option><option>208</option><option>209</option><option>210</option><option>211</option><option>212</option><option>213</option><option>214</option><option>215</option><option>216</option><option>217</option><option>218</option><option>219</option><option>220</option><option>221</option><option>222</option><option>223</option><option>224</option><option>225</option><option>226</option><option>227</option><option>228</option><option>229</option><option>230</option><option>231</option><option>232</option><option>233</option><option>234</option><option>235</option><option>236</option><option>237</option><option>238</option><option>239</option><option>240</option><option>241</option><option>242</option><option>243</option><option>244</option><option>245</option><option>246</option><option>247</option><option>248</option><option>249</option><option>250</option><option>251</option><option>252</option><option>253</option><option>254</option><option selected>255</option>
                                                </select> 
                                                White:
                                                <select class="animate-white">
                                                    <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option><option>60</option><option>61</option><option>62</option><option>63</option><option>64</option><option>65</option><option>66</option><option>67</option><option>68</option><option>69</option><option>70</option><option>71</option><option>72</option><option>73</option><option>74</option><option>75</option><option>76</option><option>77</option><option>78</option><option>79</option><option>80</option><option>81</option><option>82</option><option>83</option><option>84</option><option>85</option><option>86</option><option>87</option><option>88</option><option>89</option><option>90</option><option>91</option><option>92</option><option>93</option><option>94</option><option>95</option><option>96</option><option>97</option><option>98</option><option>99</option><option>100</option><option>101</option><option>102</option><option>103</option><option>104</option><option>105</option><option>106</option><option>107</option><option>108</option><option>109</option><option>110</option><option>111</option><option>112</option><option>113</option><option>114</option><option>115</option><option>116</option><option>117</option><option>118</option><option>119</option><option>120</option><option>121</option><option>122</option><option>123</option><option>124</option><option>125</option><option>126</option><option>127</option><option>128</option><option>129</option><option>130</option><option>131</option><option>132</option><option>133</option><option>134</option><option>135</option><option>136</option><option>137</option><option>138</option><option>139</option><option>140</option><option>141</option><option>142</option><option>143</option><option>144</option><option>145</option><option>146</option><option>147</option><option>148</option><option>149</option><option>150</option><option>151</option><option>152</option><option>153</option><option>154</option><option>155</option><option>156</option><option>157</option><option>158</option><option>159</option><option>160</option><option>161</option><option>162</option><option>163</option><option>164</option><option>165</option><option>166</option><option>167</option><option>168</option><option>169</option><option>170</option><option>171</option><option>172</option><option>173</option><option>174</option><option>175</option><option>176</option><option>177</option><option>178</option><option>179</option><option>180</option><option>181</option><option>182</option><option>183</option><option>184</option><option>185</option><option>186</option><option>187</option><option>188</option><option>189</option><option>190</option><option>191</option><option>192</option><option>193</option><option>194</option><option>195</option><option>196</option><option>197</option><option>198</option><option>199</option><option>200</option><option>201</option><option>202</option><option>203</option><option>204</option><option>205</option><option>206</option><option>207</option><option>208</option><option>209</option><option>210</option><option>211</option><option>212</option><option>213</option><option>214</option><option>215</option><option>216</option><option>217</option><option>218</option><option>219</option><option>220</option><option>221</option><option>222</option><option>223</option><option>224</option><option>225</option><option>226</option><option>227</option><option>228</option><option>229</option><option>230</option><option>231</option><option>232</option><option>233</option><option>234</option><option>235</option><option>236</option><option>237</option><option>238</option><option>239</option><option>240</option><option>241</option><option>242</option><option>243</option><option>244</option><option>245</option><option>246</option><option>247</option><option>248</option><option>249</option><option>250</option><option>251</option><option>252</option><option>253</option><option>254</option><option selected>255</option>
                                                </select> 
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <th class="col">
                                                Speed:
                                            </th>
                                            <td class="float-right col">
                                                <select class="animate-speed">
                                                    <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option><option>60</option><option>61</option><option>62</option><option>63</option><option>64</option><option>65</option><option>66</option><option>67</option><option>68</option><option>69</option><option>70</option><option>71</option><option>72</option><option>73</option><option>74</option><option>75</option><option>76</option><option>77</option><option>78</option><option>79</option><option>80</option><option>81</option><option>82</option><option>83</option><option>84</option><option>85</option><option>86</option><option>87</option><option>88</option><option>89</option><option>90</option><option>91</option><option>92</option><option>93</option><option>94</option><option>95</option><option>96</option><option>97</option><option>98</option><option>99</option><option>100</option><option>101</option><option>102</option><option>103</option><option>104</option><option>105</option><option>106</option><option>107</option><option>108</option><option>109</option><option>110</option><option>111</option><option>112</option><option>113</option><option>114</option><option>115</option><option>116</option><option>117</option><option>118</option><option>119</option><option>120</option><option>121</option><option>122</option><option>123</option><option>124</option><option>125</option><option>126</option><option>127</option><option>128</option><option>129</option><option>130</option><option>131</option><option>132</option><option>133</option><option>134</option><option>135</option><option>136</option><option>137</option><option>138</option><option>139</option><option>140</option><option>141</option><option>142</option><option>143</option><option>144</option><option>145</option><option>146</option><option>147</option><option>148</option><option>149</option><option>150</option><option>151</option><option>152</option><option>153</option><option>154</option><option>155</option><option>156</option><option>157</option><option>158</option><option>159</option><option>160</option><option>161</option><option>162</option><option>163</option><option>164</option><option>165</option><option>166</option><option>167</option><option>168</option><option>169</option><option>170</option><option>171</option><option>172</option><option>173</option><option>174</option><option>175</option><option>176</option><option>177</option><option>178</option><option>179</option><option>180</option><option>181</option><option>182</option><option>183</option><option>184</option><option>185</option><option>186</option><option>187</option><option>188</option><option>189</option><option>190</option><option>191</option><option>192</option><option>193</option><option>194</option><option>195</option><option>196</option><option>197</option><option>198</option><option>199</option><option>200</option><option>201</option><option>202</option><option>203</option><option>204</option><option>205</option><option>206</option><option>207</option><option>208</option><option>209</option><option>210</option><option>211</option><option>212</option><option>213</option><option>214</option><option>215</option><option>216</option><option>217</option><option>218</option><option>219</option><option>220</option><option>221</option><option>222</option><option>223</option><option>224</option><option>225</option><option>226</option><option>227</option><option>228</option><option>229</option><option>230</option><option>231</option><option>232</option><option>233</option><option>234</option><option>235</option><option>236</option><option>237</option><option>238</option><option>239</option><option>240</option><option>241</option><option>242</option><option>243</option><option>244</option><option>245</option><option>246</option><option>247</option><option>248</option><option>249</option><option>250</option><option>251</option><option>252</option><option>253</option><option>254</option><option selected>255</option>
                                                    <option>200</option>
                                                    <option>250</option>
                                                    <option>300</option>
                                                    <option>400</option>
                                                    <option>500</option>
                                                    <option>750</option>
                                                    <option>1000</option>
                                                </select> 
                                            </td>
                                        </tr>                                        
                                        <tr class="row">
                                            <th class="col">
                                                Brightness Level:
                                            </th>
                                            <td class="float-right col">
                                                <select class="animate-level">
                                                    <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option><option>60</option><option>61</option><option>62</option><option>63</option><option>64</option><option>65</option><option>66</option><option>67</option><option>68</option><option>69</option><option>70</option><option>71</option><option>72</option><option>73</option><option>74</option><option>75</option><option>76</option><option>77</option><option>78</option><option>79</option><option>80</option><option>81</option><option>82</option><option>83</option><option>84</option><option>85</option><option>86</option><option>87</option><option>88</option><option>89</option><option>90</option><option>91</option><option>92</option><option>93</option><option>94</option><option>95</option><option>96</option><option>97</option><option>98</option><option>99</option><option>100</option><option>101</option><option>102</option><option>103</option><option>104</option><option>105</option><option>106</option><option>107</option><option>108</option><option>109</option><option>110</option><option>111</option><option>112</option><option>113</option><option>114</option><option>115</option><option>116</option><option>117</option><option>118</option><option>119</option><option>120</option><option>121</option><option>122</option><option>123</option><option>124</option><option>125</option><option>126</option><option>127</option><option>128</option><option>129</option><option>130</option><option>131</option><option>132</option><option>133</option><option>134</option><option>135</option><option>136</option><option>137</option><option>138</option><option>139</option><option>140</option><option>141</option><option>142</option><option>143</option><option>144</option><option>145</option><option>146</option><option>147</option><option>148</option><option>149</option><option>150</option><option>151</option><option>152</option><option>153</option><option>154</option><option>155</option><option>156</option><option>157</option><option>158</option><option>159</option><option>160</option><option>161</option><option>162</option><option>163</option><option>164</option><option>165</option><option>166</option><option>167</option><option>168</option><option>169</option><option>170</option><option>171</option><option>172</option><option>173</option><option>174</option><option>175</option><option>176</option><option>177</option><option>178</option><option>179</option><option>180</option><option>181</option><option>182</option><option>183</option><option>184</option><option>185</option><option>186</option><option>187</option><option>188</option><option>189</option><option>190</option><option>191</option><option>192</option><option>193</option><option>194</option><option>195</option><option>196</option><option>197</option><option>198</option><option>199</option><option>200</option><option>201</option><option>202</option><option>203</option><option>204</option><option>205</option><option>206</option><option>207</option><option>208</option><option>209</option><option>210</option><option>211</option><option>212</option><option>213</option><option>214</option><option>215</option><option>216</option><option>217</option><option>218</option><option>219</option><option>220</option><option>221</option><option>222</option><option>223</option><option>224</option><option>225</option><option>226</option><option>227</option><option>228</option><option>229</option><option>230</option><option>231</option><option>232</option><option>233</option><option>234</option><option>235</option><option>236</option><option>237</option><option>238</option><option>239</option><option>240</option><option>241</option><option>242</option><option>243</option><option>244</option><option>245</option><option>246</option><option>247</option><option>248</option><option>249</option><option>250</option><option>251</option><option>252</option><option>253</option><option>254</option><option selected>255</option>
                                                </select> 
                                                <button type="submit" class="btn btn-info btn-simple  float-right"
                                                    @click.prevent="animate">
                                                    <p>Animate!</p>
                                                </button>

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
        },
        animate() {
            console.log('animate', this.device.deviceid);
            var root = document.getElementById(this.device.deviceid);
            var settings = {
                deviceid : this.device.deviceid,
                animation : root.getElementsByClassName("animate-animation")[0].value,
                speed : root.getElementsByClassName("animate-speed")[0].value,
                level : root.getElementsByClassName("animate-level")[0].value,
                red : root.getElementsByClassName("animate-red")[0].value,
                green  : root.getElementsByClassName("animate-green")[0].value,
                blue : root.getElementsByClassName("animate-blue")[0].value,
                white : root.getElementsByClassName("animate-white")[0].value
            }
            console.log('animate', settings);
            Vue.prototype.$socket.send(JSON.stringify({ action : "pixel-animate", command : settings }));

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
