<template>
  <div class="container">    
    <div class="box"> 
      <div class="box-row">
        <div class="box-cell box1">
          <h2 style="float: left; color: black;">Home</h2>
          <weathericon style="float:right;" />
        </div>
        <div class="box-cell box2">
          <div id="nav">
            <router-link to="/">Welcome</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/home">Home</router-link>
          </div>
        </div>
        <div class="box-cell box3">
          <div v-if="islogin" >
            <p style="float: left;" class="lead mb-3">Welcome {{ name }}</p>
            <button style="float:right;" @click="logout" class="btn btn-secondary">Logout</button>
          </div>
        </div>
      </div>      
    </div> 
    <hr />
  </div>
</template>
<script>
  import Currentweather from '../components/CurrentWeather02.vue'
  export default {
    components: {
      'weathericon': Currentweather
    },          
    data() {
      return {
        name: '',
        islogin: false,
      }
    },    
    beforeMount() {
        let str = localStorage.getItem('login')
        this.islogin = false
        if (str !== undefined && str !== null ) {            
            try {
              const obj = JSON.parse(str);
              if (obj !== undefined && obj !== null) {
                this.name = obj.name
                this.islogin = true
                //return this.$router.push('dashboard')
              }
            } catch (err) {
              console.log('header: ' + err.message)
            }                       
        }
    },
    methods: {      
        logout() {
          localStorage.clear()                
            this.islogin = false
            this.authkey = ''
            //window.location.reload()
            return this.$router.push('/')
        },        
    }
}  
</script>

<style scoped>
  .container {
    width: 100%;
    /* border-width: thin; */
    /* background:lime; */
  }
  .container .box { 
    width: auto; 
    margin:0px; 
    display:table; 
  } 
  .container .box .box-row { 
    display:table-row; 
  } 
  .container .box .box-cell { 
    display:table-cell;     
    padding:5px; 
  } 
  .container .box .box-cell.box1 { 
    /* background:green; */ 
    color:white; 
    text-align:justify; 
    width:30%;
    bottom: 0px;
  } 
  .container .box .box-cell.box2 { 
    /* background:lightgreen; */ 
    text-align:justify;
    width: 55%; 
    bottom: 0px;
  } 
  .container .box .box-cell.box3 { 
    background:white; 
    text-align:justify;
    width:25%; 
    bottom: 0px;
  }
  #nav {
    padding: 10px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>