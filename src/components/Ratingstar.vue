<template>
  <div class="container">      
      <div class="star-widget">
        <input type="radio" v-bind:name="myname" v-bind:id="myrate5" @click="starclick(5)">
        <label v-bind:for="myrate5" class="fas fa-star" :style="ratingStyle(5)"></label>
        <input type="radio" v-bind:name="myname" v-bind:id="myrate4" @click="starclick(4)">
        <label v-bind:for="myrate4" class="fas fa-star" :style="ratingStyle(4)"></label>
        <input type="radio" v-bind:name="myname" v-bind:id="myrate3" @click="starclick(3)">
        <label v-bind:for="myrate3" class="fas fa-star" :style="ratingStyle(3)"></label>
        <input type="radio" v-bind:name="myname" v-bind:id="myrate2" @click="starclick(2)">
        <label v-bind:for="myrate2" class="fas fa-star" :style="ratingStyle(2)"></label>
        <input type="radio" v-bind:name="myname" v-bind:id="myrate1" @click="starclick(1)">
        <label v-bind:for="myrate1" class="fas fa-star" :style="ratingStyle(1)"></label>        
      </div>
      <div class="rating"> {{ myrating }} </div>      
    </div>
</template>
<script>
  export default {
  name: 'Ratingstar',
  components: {
     
  },
  props: [ 'myrating', 'mymovieid', 'myrate5', 'myrate4', 'myrate3', 'myrate2', 'myrate1', 'myname' ],
  data() {
    return {
      //rating: 0,
    }
  },
  computed: {
    
  },
  methods: {
    starclick(i) {
      /*
        if (this.rating == 1 && i == 1) {
            let elem = document.getElementById(this.myrate1)
            elem.checked = false
            this.myrating = 0
            return
        }
        this.rating = i
      */
     //console.log('mymovieid: ' + this.mymovieid)
     this.$emit('starclicked', i, this.mymovieid)
    }, 
    ratingStyle(j) {
      if (this.myrating > j-1) {
        return {color: '#fd4'}
      }
    }
  }
}
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.container{
  position: relative;
  width: 180px;
  background: transparent;
  padding: 5px 5px;
  border: 2px solid #444;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.container .text{
  font-size: 25px;
  color: #666;
  font-weight: 500;
}
.container .star-widget input{
  display: none;
}
.star-widget label{
  font-size: 20px;
  color: #DDD;
  padding: 5px;
  float: right;
  transition: all 0.2s ease;
}
input:not(:checked) ~ label:hover,
input:not(:checked) ~ label:hover ~ label{
  color: #fd4;
}
/*
input:checked ~ label{
  color: #fd4;
}
input#rate-5:checked ~ label{
  color: #fe7;
  text-shadow: 0 0 20px #952;
}
*/
</style>