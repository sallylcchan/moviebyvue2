<template>
    <div class="row">
          <div class="col-md-4">
            <img v-bind:src="movie.Poster" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>{{ movie.Title }}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> {{ movie.Genre }}</li>
              <li class="list-group-item"><strong>Released:</strong> {{ movie.Released }}</li>
              <li class="list-group-item"><strong>Rated:</strong> {{ movie.Rated }}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> {{ movie.imdbRating }}</li>
              <li class="list-group-item"><strong>Director:</strong> {{ movie.Director }}</li>
              <li class="list-group-item"><strong>Writer:</strong> {{ movie.Writer }} </li>
              <li class="list-group-item"><strong>Actors:</strong> {{ movie.Actors }}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            {{ movie.Plot }}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
            <button @click="back()">Go Back To Search</button>
          </div>
        </div>
</template>
<style scoped>
    .row {
        display: flex;
        height: 100%;
        width: 100%;
    }
    /* Create two columns that sits next to each other */
    .columnLeft {
        flex: 30%;
        padding: 10px;
        background-color:#aaa;
        height: auto;
        /* height: 300px; */ /* Should be removed. Only for demonstration */
    }
    .columnRight {
        flex: 70%;
        padding: 10px;
        background-color:#bbb;
        height: auto;
    }
    img {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10%;
        display: block;
    }
    li {
        font-size: 1.5em;
    }
</style>
<script>
    export default {
        name: 'Moviedetail',
        data() {
            return {
                idx: '',
                movie: {},
                loading: false
            }
        },
        beforeMount(){
            this.fetchMovie(this.$route.params.idx)
        },
        methods: { 
            async fetchMovie(idx) {
                //const mylink = `http://47.242.250.90:18888/film/${idx}`
                //const mylink = "https://movieapi.zebramc36.repl.co/searchmovie/" + this.searchtext
                const mylink = `https://www.omdbapi.com/?apikey=8492cf8d&i=${idx}`
                console.log('link: ' + mylink) 
                const res = await fetch(mylink)
                const data = await res.json();
                this.movie = data
                this.loading = false
            },
            back() { 
                return this.$router.go(-1)
            }
        },        
    }
</script>
