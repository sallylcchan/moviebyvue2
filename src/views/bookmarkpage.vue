<template>
    <div>
        <h1 class="mt-4">Bookmark Page</h1><div style="float:right;"><button @click="back()">Go Back To Dashboard</button></div>
    </div>
    <div>        
        <div class="container">
            <div id="movies" class="row" v-if="!loading">
                <div class="col-md-3" v-for="movie in movies" :key="movie.imdbid">                    
                    <img v-bind:src="movie.poster"  />
                    <p style="text-align: center;"> {{ movie.title }} </p>  
                    <p style="text-align: center;"> {{ movie.imdbid }} </p>
                </div>
            </div>
            <p v-if="loading">Data is fetching...</p>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        
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
        async fetchMovie() {
            this.loading = true
            //const mylink = "https://movieapi.zebramc36.repl.co/searchmovie/" + this.searchtext
            const mylink = "https://movieapi.zebramc36.repl.co/movielist"
            //console.log('searchtext: ' + mylink)            
            const res = await fetch(mylink) 
            const data = await res.json()
            if (Array.isArray(data)) {
                //this.movies = data
                //this.loading = false                        
                console.log('fetched (1)')
            }
            const jsonBody = JSON.stringify({ 'authkey': this.authkey })            
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
                        if (foundidx != -1) {
                            console.log(`${value.imdbid}: true`)
                            //this.movies[index].isfavorite = true
                            this.movies.push(data[index])
                        }
                    }
                )
            }
            console.log('fetched (2)')
            this.loading = false
        },
        showDetail(id) {
            this.$router.push({name: 'Moviedetail', params: {idx: id}})
        },
        back() { 
            return this.$router.go(-1)
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
