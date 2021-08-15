<template>
    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3">
                    <i class="fas fa-user-plus">Register</i>
                </h1>      
                <div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            class="form-control"
                            placeholder="Enter Name"
                            v-model="name" />
                    </div>
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
                            placeholder="Create Password"
                            v-model="password" />
                    </div>
                    <div class="form-group">
                        <label for="password2">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            class="form-control"
                            placeholder="Confirm Password"
                            v-model="password2" />
                    </div>
                    <div v-if="isspecialcode" class="form-group">
                        <label for="specialcode">Special Code</label>
                        <input
                            type="text"
                            id="specialcode"
                            name="specialcode"
                            class="form-control"
                            placeholder="Enter Special Code"
                            v-model="specialcode" />
                    </div>
                    <button @click="register" class="btn btn-primary btn-block">
                        Register
                    </button>
                    <p style="color: red; font-size: 150%"> {{ message }} </p>
                </div>
                <p class="lead mt-4">Have An Account?
                    <router-link to="/login">Login</router-link>
                </p>
                <p class="lead mt-4">Have An Special Code?
                    <button @click="togglecode">Special Code</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                password2: '',
                role: '',
                lsterror: [],
                message: '',
                isvalid: false,
                isspecialcode: false,
                specialcode: '',
            }
        },
        methods: {    
            beforeMount() {
                if (localStorage.getItem('login')) {
                    this.login = true
                    return this.$router.push('dashboard')
                }
            }, 
            delayReload() {
                setTimeout( function(){ window.location.reload()},100 )
            },          
            register() {
                if (this.name === '' || this.email === '' || this.password === '' || this.password2 === '') {
                    this.message = "Please input all fields!"
                    return
                }
                if (this.password !== this.password2) {
                    this.message = "Please ensure 2 passwords are equal!"
                    return
                }
                /*
                const postedjson = JSON.stringify({
                    'name': this.name,
                    'email': this.email,
                    'password': this.password
                })
                */
                const jsonBody = JSON.stringify({
                    'email': this.email,
                    'password': this.password,
                    'name': this.name,
                    'specialcode': this.specialcode
                })
                let url_2 = 'https://movieapi.zebramc36.repl.co/applyuser'
                fetch(url_2, {
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
                    if (res.status == 201) {
                        return res.json()
                    } else {
                        throw 'User register Failed'
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
            togglecode(){
                this.isspecialcode = ! this.isspecialcode
            }
        }
    }
</script>
