<template>
    <div class="outermost">
        <button v-bind:id="btnid" v-on:click="openModal()" style="width:auto;display:none;">Edit</button>
        <div v-show="isshowing" class="modal">
            <div class="modal-content animate">
                <div class="imgcontainer">
                    <span @click="closeModal()" class="close" title="Close Modal">&times;</span>
                </div>
                <div class="container">
                    <label><b>Movie Id: {{ mymovieid }}</b></label><br/>
                    <label for="title"><b>Movie title</b></label>
                    <input type="text" v-bind:value="mymovieobj.title" @input="changeTitle" placeholder="Movie title" name="title" required>
                    <label for="year"><b>Movie year</b></label>
                    <input type="text" v-bind:value="mymovieobj.year" @input="changeYear" placeholder="Movie year" name="year" required>
                    <label for="type"><b>Movie type</b></label>
                    <input type="text" v-bind:value="mymovieobj.type" @input="changeType" placeholder="Movie type" name="type" required>
                    <button v-on:click="movieupdate()">Edit Movie</button>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PopupMovieEdit',
        components: {
     
        },
        props: ['btnid', 'isshowing','mymovieid','mymovieobj'],        
        data() {
            return {
                mytitle: '',
                myyear: '',
                mytype: '',    
            }
        },
        methods: {
            closeModal() {
                //this.isShown = false
                this.$emit('popupclose')        
            },
            openModal() {
                //this.isShown = true
                this.$emit('popupshow')
            },
            movieupdate() {
                let objSend = {imdbid: this.mymovieid, title: this.mytitle, year: this.myyear, type: this.mytype}
                this.$emit('popupupdate', objSend)
            },
            changeTitle(event) {
                this.mytitle = event.target.value
            },
            changeYear(event) {
                this.myyear = event.target.value
            },
            changeType(event) {
                this.mytype = event.target.value
            },
        }
    }
</script>
<style scoped>
    .outermost {font-family: Arial, Helvetica, sans-serif;}

    /* Full-width input fields */
    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    /* Set a style for all buttons */
    button {
        background-color: #04AA6D;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
        opacity: 0.8;
    }

    /* Extra styles for the cancel button */
    .cancelbtn {
        width: auto;
        padding: 10px 18px;
        background-color: #f44336;
    }

    /* Center the image and position the close button */
    .imgcontainer {
        text-align: center;
        margin: 24px 0 12px 0;
        position: relative;
    }

    img.avatar {
        width: 40%;
        border-radius: 50%;
    }

    .container {
        padding: 16px;
    }

    span.psw {
        float: right;
        padding-top: 16px;
    }

    /* The Modal (background) */
    .modal {
        display: block; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        padding-top: 60px;
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
    }   

    /* The Close Button (x) */
    .close {
        position: absolute;
        right: 25px;
        top: 0;
        color: #000;
        font-size: 35px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: red;
        cursor: pointer;
    }

    /* Add Zoom Animation */
    .animate {
        -webkit-animation: animatezoom 0.6s;
        animation: animatezoom 0.6s
    }

    @-webkit-keyframes animatezoom {
        from {-webkit-transform: scale(0)} 
        to {-webkit-transform: scale(1)}
    }
  
    @keyframes animatezoom {
        from {transform: scale(0)} 
        to {transform: scale(1)}
    }

    /* Change styles for span and cancel button on extra small screens */
    @media screen and (max-width: 300px) {
        span.psw {
            display: block;
            float: none;
        }
        .cancelbtn {
            width: 100%;
        }
    }
</style>

