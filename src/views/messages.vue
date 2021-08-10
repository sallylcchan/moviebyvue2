<template>
    <div>
        <div v-if="issuccess" class="alert alert-success alert-dismissible fade show" role="alert">
            {{ success_msg }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div v-if="iserrmsg" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ error_msg }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div v-if="iserror" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ error }}        
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['success_msg', 'error_msg', 'error', 'issuccess', 'iserrormsg', 'iserror']
    }
</script>
