<template>
<div>
  <input v-model.number="center.lng">
  <input v-model.number="center.lat">
  <input v-model.number="zoom">
  <baidu-map
    class="map"
    :scroll-wheel-zoom="true"
    :center="center"
    :zoom="zoom"
    @moving="syncCenter"
    @moveend="syncCenter"
    @zoomend="syncZoom">
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  </baidu-map>
</div>
</template>

<script>
  export default {
      name:'map',
    data () {
      return {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        zoom: 15
      }
    },
    methods: {
      syncCenter (e) {
//          console.log(e)
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
      },
      syncZoom (e) {
        this.zoom = e.target.getZoom()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {
    width: 100%;
    height: 500px;
  }
</style>
