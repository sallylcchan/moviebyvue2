<template>
    <div id="nav">
        <router-link to="/">Welcome</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/home">Home</router-link>
    </div>
    <div v-if="islogin" >
        <p class="lead mb-3">Welcome {{ name }}</p>
        <button @click="logout" class="btn btn-secondary">Logout</button>
    </div>
</template>
<script>
  export default {
    
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
    data() {
      return {
        name: '',
        islogin: false,
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
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>