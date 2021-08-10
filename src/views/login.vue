<template>
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt">Login</i></h1>                
                <div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Enter Email" 
                            v-model="email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-control"
                            placeholder="Enter Password" 
                            v-model="password" />
                    </div>
                    <button @click="checklogin" class="btn btn-primary btn-block">Login</button>
                </div>                
                <p class="lead mt-4">No Account? <router-link to="/register">Register</router-link></p>
            </div>
        </div>
    </div>
</template>
<script>
  export default {  
    beforeMount() {
      
      if (localStorage.getItem('login')) {
        this.login = true
        return this.$router.push('dashboard')
      }      
    },      
    data() {
      return {
        email: '',
        password: '',
        message: '',
        login: false,
        authkey: '',
        role: '',
      }
    },
    methods: {
      checklogin() {
        //check if email, password have value
        if(this.email.length == 0 || this.email.length == 0) {
          this.message = "Please provide neccessary information"
          return
        }
        const jsonBody = JSON.stringify({
          'email': this.email,
          'password': this.password
        })
        let url_1 = 'https://movieapi.zebramc36.repl.co/login'
        fetch(url_1, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json'
          },
          body: jsonBody
        })
        .then( (res, err) => { 
          if (err) {
            throw 'communication error'
          }
          if (res.status == 200) {
            return res.json()
          } else {
              throw 'Login Failed'
          }
        })
        .then( json => {
            this.login = true            
            this.authkey = json.authkey
            this.role = json.role
            console.log('json(auth): ' + JSON.stringify(json))
            console.log('authkey(auth): ' + this.authkey)
            console.log('role: ' + this.role)
            this.email = ''
            this.password = ''
            localStorage.setItem('login', JSON.stringify(json))
            //window.location.reload()
            this.delayReload()
            if (this.role == 'customer') {
              return this.$router.push('dashboard')
            }
            if (this.role == 'staff') {
              return this.$router.push('movieforpost')
            }
            return this.$router.push('/')
        })
        .catch( err => {
            if (err) {
              this.login = false
              this.message = err
            }
          })
        },
        logout() {
          localStorage.clear()                
            this.login = false
            this.authkey = ''
            window.location.reload()
        },
        delayReload() {
          setTimeout( function(){
            window.location.reload()
          },100)
        }
      }
  }
</script>