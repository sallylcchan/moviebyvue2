<template>
    <div>
        <h1 class="mt-4">Dashboard</h1>
    </div>
    <div>        
        <div class="container">
            <div id="movies" class="row" v-if="!loading">
                <div class="col-md-3" v-for="movie in movies" :key="movie.imdbid">                    
                    <img v-bind:src="movie.poster"  />
                    <p style="text-align: center;"> {{ movie.title }} </p>                    
                    <Ratingstar />
                    <button @click="showDetail(movie.imdbid)" class="btn btn-primary">Movie Details</button>
                </div>
            </div>
            <p v-if="loading">Data is fetching...</p>
        </div>
    </div>
</template>
<script>
import Ratingstar from '../components/Ratingstar.vue'
export default {
    components: {
        Ratingstar,
    },
    beforeMount() {
        let str = localStorage.getItem('login')
        if (str !== undefined) {
            this.login = true
            const obj = JSON.parse(str)
            if (obj !== undefined) {
                this.name = obj.name
                this.fetchMovie()
            //return this.$router.push('dashboard')
            }            
        }
    },      
    data() {
      return {
        name: '',
        message: '',
        login: false,
        authkey: '',
        movies: [],
        searchtext: '',
        loading: false,
      }
    },
    methods: {      
        logout() {
          localStorage.clear()                
            this.login = false
            this.authkey = ''
            //window.location.reload()
            return this.$router.push('/')
        },
        async fetchMovie() {
            this.loading = true
            //const mylink = "https://movieapi.zebramc36.repl.co/searchmovie/" + this.searchtext
            const mylink = "https://movieapi.zebramc36.repl.co/movielist"
            //console.log('searchtext: ' + mylink)            
            const res = await fetch(mylink) 
            const data = await res.json()
            if (Array.isArray(data)) {
                this.movies = data
                this.loading = false                        
                console.log('fetched')
            }              
        },
        showDetail(id) {
            this.$router.push({name: 'Moviedetail', params: {idx: id}})
        },
    }
}
  
</script>
<style scoped>
    #movies img, #movie img{
        width:100%;
    }
    @media(min-width:960px){
        #movies .col-md-3 .well{
        height: 390px;
    }
    #movies .col-md-3 img{
        height:240px;
    }
}
</style>

