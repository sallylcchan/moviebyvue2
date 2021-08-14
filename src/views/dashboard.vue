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
                    <p style="text-align: center;"> {{ movie.imdbid }} </p>
                    <star-input 
                        v-model:myrating="movie.rate" 
                        v-model:mymovieid="movie.imdbid"
                        v-model:myname="movie.starname"
                        v-model:myrate1="movie.starid[0]"
                        v-model:myrate2="movie.starid[1]"
                        v-model:myrate3="movie.starid[2]"
                        v-model:myrate4="movie.starid[3]"
                        v-model:myrate5="movie.starid[4]"
                        @starclicked="starclickHandler" 
                    />
                    <favor-input 
                        v-model:isfavorite="movie.isfavorite"
                        v-model:mymovieid="movie.imdbid"
                        v-model:myfavorite="movie.favorid"  
                        @favorclicked="favorclickHandler" 
                    />
                    <button @click="showDetail(movie.imdbid)" class="btn btn-primary">Movie Details</button>
                </div>
            </div>
            <p v-if="loading">Data is fetching...</p>
        </div>
    </div>
</template>
<script>
import Ratingstar from '../components/Ratingstar.vue'
import Favorite from '../components/Favorite.vue'
export default {
    components: {
        'star-input': Ratingstar,
        'favor-input': Favorite,
    },
    beforeMount() {
        let str = localStorage.getItem('login')
        if (str !== undefined) {
            this.login = true
            const obj = JSON.parse(str)
            if (obj !== undefined) {
                this.name = obj.name
                this.authkey = obj.authkey
                this.fetchMovie()
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
        favorclickHandler(m_id) {
            console.log('movieid: ' + m_id)
            let actualfavour = false
            let actualindex = -1
            this.movies.forEach(
                (val, idx) => {
                    if (val.imdbid == m_id) {                        
                        //this.movies[idx].isfavorite = !this.movies[idx].isfavorite
                        actualfavour = this.movies[idx].isfavorite
                        actualindex = idx
                    }
                }
            )
            const jsonBody = JSON.stringify({
                'imdbid': m_id, 'authkey': this.authkey
            })
            let urlUpdate = 'https://movieapi.zebramc36.repl.co/bookmarkmovie'
            fetch(urlUpdate, {
                    method: 'PUT',
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
                        throw 'User bookmark Failed'
                    }
                })
                .then( json => {
                    console.log(json.description)
                    this.movies[actualindex].isfavorite = !actualfavour
                })
                .catch( err => {
                    if (err) {                        
                        this.message = err
                    }
                })
        },
        //i is number of star(s) i.e. rate
        //m_id is movie's imdbid  
        starclickHandler(i, m_id) {
            console.log('rate: ' + i)
            console.log('movieid: ' + m_id)
            let actualrate = 0
            let actualindex = -1
            this.movies.forEach(
                (val, idx) => {
                    if (val.imdbid == m_id) {
                        //this.movies[idx].rate = i
                        if (this.movies[idx].rate == 1 && i == 1) {
                            //this.movies[idx].rate = 0
                            actualindex = idx
                            actualrate = 0
                        } else {
                            //this.movies[idx].rate = i
                            actualindex = idx
                            actualrate = i
                        }
                    }
                }
            )
            const jsonBody = JSON.stringify({
                'imdbid': m_id, 'authkey': this.authkey, 'rate': actualrate
            })
            let urlUpdate = 'https://movieapi.zebramc36.repl.co/ratemovie'
            fetch(urlUpdate, {
                    method: 'PUT',
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
                        throw 'User rate Failed'
                    }
                })
                .then( json => {
                    console.log(json.description)
                    this.movies[actualindex].rate = actualrate
                })
                .catch( err => {
                    if (err) {                        
                        this.message = err
                    }
                })
        },    
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
                //this.loading = false                        
                console.log('fetched (1)')
            }
            const jsonBody = JSON.stringify({ 'authkey': this.authkey })
            const mylink_1 = "https://movieapi.zebramc36.repl.co/userratelist"
            const res_1 = await fetch(mylink_1, 
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: jsonBody
                }
            )
            const data_1 = await res_1.json()
            const list_1 = data_1.list
            console.log('list_1: ' + list_1.length)
            if (Array.isArray(list_1)) {
                data.forEach(
                    (value, index) => {
                        console.log('imdbid: ' + value.imdbid)
                        let objfound = list_1.find(obj => obj.movieid == value.imdbid)
                        if (objfound === undefined) {
                            this.movies[index].rate = 0                            
                        } else {
                            this.movies[index].rate = objfound.movierate
                        }
                        this.movies[index].starname = 'star_' + value.imdbid
                        let lstStar = []
                        lstStar.push('star1_' + value.imdbid)
                        lstStar.push('star2_' + value.imdbid)
                        lstStar.push('star3_' + value.imdbid)
                        lstStar.push('star4_' + value.imdbid)
                        lstStar.push('star5_' + value.imdbid)
                        this.movies[index].starid = lstStar
                        this.movies[index].favorid = 'favor_' + value.imdbid
                        console.log(`${value.imdbid}: ${this.movies[index].rate}`)
                    }
                )
                console.log('fetched (2)')
                //this.loading = false
            }
            const mylink_2 = "https://movieapi.zebramc36.repl.co/userbookmarklist"
            const res_2 = await fetch(mylink_2, 
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: jsonBody
                }
            )
            const data_2 = await res_2.json()
            const list_2 = data_2.list            
            if (Array.isArray(list_2)) {
                console.log('list_2: ' + list_2.length)
                data.forEach(
                    (value, index) => {
                        console.log('imdbid: ' + value.imdbid)
                        let foundidx = list_2.indexOf(value.imdbid)
                        if (foundidx === -1) {
                            console.log(`${value.imdbid}: false`)
                            this.movies[index].isfavorite = false                            
                        } else {
                            console.log(`${value.imdbid}: true`)
                            this.movies[index].isfavorite = true
                        }
                    }
                )
            }
            console.log('fetched (3)')
            this.loading = false
        },
        showDetail(id) {
            this.$router.push({name: 'Moviedetail', params: {idx: id}})
        }
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

