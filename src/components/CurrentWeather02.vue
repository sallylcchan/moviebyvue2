<template>
    <div>
        <img v-if="!loading" v-bind:src="iconurl" v-bind:alt="iconurl" />
    </div>
</template>
<script>
export default {
  name: 'Currentweather',
  data() {
      return {        
        loading: true,
        iconurl: '',
      }
  },
  beforeMount() {
      //this.loading = true
      this.fetchWeather()  
  },
  methods: {
      async fetchWeather() {
            this.loading = true
            const mylink = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
            console.log('mylink: ' + mylink)            
            const res = await fetch(mylink) 
            const data = await res.json()
            if (Array.isArray(data.icon)) {
                this.iconurl = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${data.icon[0]}.png`                
                console.log('icon fetched')
                this.loading = false
            }
      }
  },  
}
</script>
