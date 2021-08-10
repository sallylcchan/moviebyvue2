<template>
  <div class="container">      
      <div class="star-widget">
        <input type="radio" name="rate" id="rate-5" @click="starclick(5)">
        <label for="rate-5" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-4" @click="starclick(4)">
        <label for="rate-4" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-3" @click="starclick(3)">
        <label for="rate-3" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-2" @click="starclick(2)">
        <label for="rate-2" class="fas fa-star"></label>
        <input type="radio" name="rate" id="rate-1" @click="starclick(1)">
        <label for="rate-1" class="fas fa-star"></label>        
      </div>
      <div class="rating"> {{ rating }} </div>      
    </div>
</template>
<script>
  export default {
  name: 'Ratingstar',
  components: {
     
  },
  data() {
    return {
      rating: 0,
    }
  },
  methods: {
    starclick(i) {
        if (this.rating == 1) {
            let elem = document.getElementById("rate-1")
            elem.checked = false
            this.rating = 0
            return
        }
        this.rating = i
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
input:checked ~ label{
  color: #fd4;
}
input#rate-5:checked ~ label{
  color: #fe7;
  text-shadow: 0 0 20px #952;
}

</style>