
<script>

// @ is an alias to /src

export default {

  name: 'Home',

  data() {
    return {
      bde_server_greeting: '',
    };
  },
  created() {
    this.$axios.get('http://localhost:5100/bde/healthcheck')
      .then((response) => { this.bde_server_greeting = response.data; });
  },
};
</script>

<template>
  <div class="home">
    <p>{{ bde_server_greeting.api_title }} </p>
    <p>Version {{ bde_server_greeting.api_version }}</p>
    <p>Commit ID {{ bde_server_greeting.commit_id }}</p>
    <p>BDE running for {{ bde_server_greeting.uptime }} seconds</p>
  </div>

</template>
