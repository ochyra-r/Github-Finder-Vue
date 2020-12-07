<template>
  <div class="user">User</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "User",
  data() {
    return {
      login: this.$route.params.login,
      user: {},
    };
  },
  created() {
    this.$http
      .get(`https://api.github.com/users/${this.login}`)
      .then((response) => response.json())
      .then(
        (data) => {
          this.user = data;
          // console.log(data);
        },
        (error) => console.log(error)
      );
  },
});
</script>

<style></style>
