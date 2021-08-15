<template>
    <div>
        <h1 class="mt-4">Movie For Post</h1>
    </div>
    <div>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.html">MovieInfo</a>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="jumbotron">
                <h3 class="text-center">Search For Any Movie</h3>
                <div id="searchForm">
                    <input type="text" @keyup.enter="fetchMovie()" v-model="searchtext" class="form-control" id="searchText" placeholder="Search Movies...">
                    <button @click="fetchMovie()">Search</button>
                </div>
            </div>
        </div>
        <div class="container">
            <div id="movies" class="row" v-if="!loading">
                <div class="col-md-3" v-for="movie in movies" :key="movie.imdbID">                    
                    <img v-bind:src="movie.Poster"  />
                    <p style="text-align: center;"> {{ movie.Title }} </p>
                    <input type="checkbox" v-model="movie.added" @change="changeMovie(movie.imdbID, movie.added)"  >
                    <label for="checkbox"> id: {{movie.imdbID}}</label>                    
                    <button @click="showDetail(movie.imdbID)" class="btn btn-primary">Details</button>&nbsp;
                    <button v-show="movie.added"  @click="openEditDialog(movie.imdbID)" class="btn btn-info">Edit</button>
                </div>
            </div>
            <p v-if="loading">Data is fetching...</p>
            <PopupEditor 
                btnid="popupdlg"
                v-model:isshowing="ispopupshow"
                v-model:mymovieid="popupmovieid"
                v-model:mymovieobj="popupmovieobj"
                @popupclose="popupCloseHandler()"
                @popupshow="popupShowHandler()"
                @popupupdate="popupUpdateHander"
            />
        </div>
    </div>
</template>
<script>

import PopupEditor from '../components/PopupMovieEdit.vue'
export default {
    components: {
        PopupEditor,
    },
    beforeMount() {
        let str = localStorage.getItem('login')
        if (str == undefined || str == null) {
            return this.$router.push('/')
        }
        this.login = true
        const obj = JSON.parse(str)
        if (obj.role == 'customer') {                
            return this.$router.push('dashboard')
        }
        this.name = obj.name
        this.authkey = obj.authkey
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
        ispopupshow: false,
        popupmovieid: '',
        popupmovieobj: {},
      }
    },
    methods: {
        openEditDialog(_id) {
            console.log('id: ' + _id)
            this.popupmovieid = _id
            this.popupmovieobj = this.findMovie(_id)
            this.ispopupshow=true
        },  
        popupCloseHandler(){
            this.ispopupshow = false
        },
        popupShowHandler() {
            this.ispopupshow = true
        },
        popupUpdateHander(_obj){
            console.log('handler')
            const {imdbid, title, year, type} = _obj
            //console.log(`imdbid: ${_imdbid}\ntitle:${_title}\nyear:${_year}\ntype:${_type}`)
            console.log(`vals passing in: ${imdbid}, ${title}, ${year}, ${type}`)            
            let postdata = JSON.stringify({
                title: title,
                year: year,
                imdbid: imdbid, 
                type: type,
                role: 'staff'
            })
            console.log('posting data (popupUpdateHandler): ' + postdata)
            let postreq = {method: 'PUT', mode: 'cors', headers: {'Content-type': 'application/json'}, body: postdata}
            let posturl = "https://movieapi.zebramc36.repl.co/updatemovie"         
            fetch(posturl, postreq)
            .then( (res, err) => {
                if (err) {
                    console.log('error' + err)
                    throw 'communication error'
                }
                if (res.status == 201) {
                    console.log('movie update done')
                    //console.log(res.json())
                    return res.json()
                } 
                else {
                    throw 'Post Failed!'
                }
            })
            .then( (json) => {
                console.log('response after post: ' + JSON.stringify(json))
                //update the movies list if update successfully
                let foundidx = this.findMovieIndex(imdbid)
                if (foundidx != -1) {
                    let objOrigin = this.movies[foundidx]
                    let objNew = {
                        imdbID: objOrigin.imdbID,
                        Title: title,
                        Year: year,                        
                        Type: type,
                        Poster: objOrigin.Poster,
                        added: true
                    }
                    this.movies.splice(foundidx, 1, objNew)    
                }
                //close the modal 
                this.ispopupshow = false    
            })
            .catch( (err) => {
                if (err) {
                    this.myError = err
                }
            })
        },
        findMovie(_id) {
            let obj = {}
            this.movies.forEach(
                (value) => {
                    console.log("findMovie - imdbID: " + value.imdbID)
                    if (value.imdbID == _id) {
                        obj.title = value.Title
                        obj.year = value.Year
                        obj.imdbid = value.imdbID
                        obj.type = value.Type
                        obj.poster = value.Poster
                    }
                }            
            )
            return obj
        },
        findMovieIndex(_id){
            let idx = -1
            this.movies.forEach(
                (value, Index) => {
                    console.log("findMovieIndex - imdbID: " + value.imdbID)
                    if (value.imdbID == _id) {
                        idx = Index
                    }
                }            
            )
            return idx
        },
        async fetchMovie() {
            this.loading = true
            this.movies = []
            if (this.searchtext == "") {
                await this.fetchMovieFromMongodb()
                //this.loading = false
                return
            } 
            const mylink = "https://movieapi.zebramc36.repl.co/searchmovie/" + this.searchtext
            console.log('searchtext: ' + mylink)            
            const res = await fetch(mylink) 
            const data = await res.json()
            if (Array.isArray(data.description)) {
                this.movies = data.description              
                console.log('fetched (1)')
            } else {
                return
            }                      
            const mylink_4 = "https://movieapi.zebramc36.repl.co/movielist"
            const res_4 = await fetch(mylink_4) 
            const data_4 = await res_4.json()            
            if (Array.isArray(data_4)) {
                console.log('Count of data_4: ' + data_4.length)
                //return the list of imdbid from mongodb
                const lstImdbid = data_4.map( elem => elem.imdbid )
                this.movies.forEach(
                    (value, index) => {
                        let foundidx = lstImdbid.indexOf(value.imdbID)
                        if (foundidx == -1) {
                            this.movies[index].added = false
                        } else {
                            //this.movies[index].added = true
                            //convert movie found from mongodb to one from network
                            let objtmp = {
                                imdbID: data_4[foundidx].imdbid,
                                Title: data_4[foundidx].title,
                                Year: data_4[foundidx].year,
                                Type: data_4[foundidx].type,
                                Poster: data_4[foundidx].poster,
                                added: true
                            }
                            //replace the movie from network by one from mongodb
                            this.movies.splice(index, 1, objtmp)
                        }
                    }
                )
                this.loading = false                        
                console.log('fetched (2)')
            }          
        },    
        async fetchMovieFromMongodb(){
            this.movies = []
            const mylink_3 = "https://movieapi.zebramc36.repl.co/movielist"
            const res_3 = await fetch(mylink_3) 
            const data_3 = await res_3.json()            
            if (Array.isArray(data_3)) {
                data_3.forEach(
                    (value) => {
                        let objtmp = {
                                imdbID: value.imdbid,
                                Title: value.title,
                                Year: value.year,
                                Type: value.type,
                                Poster: value.poster,
                                added: true
                            }
                        this.movies.push(objtmp)
                    })
            }
            this.loading = false
        },    
        showDetail(id) {
            this.$router.push({name: 'Moviedetail', params: {idx: id}})
        },
        changeMovie(id, ischecked){
            if (ischecked) {
                this.addMovie(id)
            } else {
                this.delMovie(id)
            }
        },
        addMovie(id) {
            const mylink_1 = "https://movieapi.zebramc36.repl.co/addmovie"
            console.log('imdbid: ' + id)
            const jsonBody = this.findMovie(id)
            jsonBody.role = "staff"
            if (jsonBody.imdbid == undefined || jsonBody.imdbid == null) {
                return
            }
            const jsonOption = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(jsonBody)
            }
            fetch(mylink_1, jsonOption)
            .then( (res, err) => { 
                if (err) {
                    throw 'communication error'
                }
                if (res.status == 200) {
                    return res.json()
                } else {
                    throw 'Add Movie Failed'
                }
            })
            .then( json => {
                console.log(`${json.imdbid} is added`) 
                /*
                this.movies.forEach(
                    (value, index) => {
                        if ( value.imdbID == id ) {
                            this.movies[index].added = true
                        } 
                    }
                ) 
                */  
            })
            .catch( err => {
                if (err) {
                    //this.login = false
                    this.message = err
                }
            })
        },
        async delMovie(id) {
            const mylink_2 = "https://movieapi.zebramc36.repl.co/deletemovie"
            console.log('imdbid: ' + id)
            const jsonBody = this.findMovie(id)
            jsonBody.role = "staff"
            if (jsonBody.imdbid == undefined || jsonBody.imdbid == null) {
                return
            }
            const jsonOption = {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(jsonBody)
            }
            fetch(mylink_2, jsonOption)
            .then( (res, err) => { 
                if (err) {
                    throw 'communication error'
                }
                if (res.status == 200) {
                    return res.json()
                } else {
                    throw 'Delete Movie Failed'
                }
            })
            .then( json => {
                console.log(`${json.imdbid} is deleted`) 
                /*
                this.movies.forEach(
                    (value, index) => {
                        if ( value.imdbID == id ) {
                            this.movies[index].added = false
                        } 
                    }
                ) 
                */  
            })
            .catch( err => {
                if (err) {
                    //this.login = false
                    this.message = err
                }
            })
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
