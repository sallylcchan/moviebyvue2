<template>
    <div>
    <div class="favor-widget">
        <input type="checkbox" v-bind:id="myfavorite" v-bind:checked="isfavorite" @click="favorClick()" />
        <label v-bind:for="myfavorite" class="fas fa-thumbs-up" v-bind:style="favorStyle()"></label>
        <p> {{ isfavorite }} </p>
    </div>
    </div>
</template>
<script>
  export default {
  name: 'Favorite',
  components: {
     
  },
  props: [ 'isfavorite', 'mymovieid', 'myfavorite'],
  data() {
      return {

      }
  },
  methods: {
    favorClick() {      
     console.log(`favorClick (${this.mymovieid}: ${this.isfavorite})`)

     this.$emit('favorclicked', this.mymovieid)
    }, 
    favorStyle() {
        console.log(`favorStyle (${this.mymovieid}: ${this.isfavorite})`)
        if (this.isfavorite === true) {            
            return {color: '#fd4'}
        } 
    },
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
    .favor-widget input{
        display: none;
    }
    .favor-widget label{
        font-size: 20px;
        color: #DDD;
        padding: 5px;
        float: right;
        transition: all 0.2s ease;
    }
    input:not(:checked) ~ label:hover{
        color: #fd4;
    }
</style>