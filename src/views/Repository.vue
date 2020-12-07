<template>
  <div class="repository">Repository</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Repository",
  data() {
    return {
      params: {
        owner: this.$route.params.owner,
        repo: this.$route.params.repo,
      },
      repo: {},
    };
  },
  created() {
    this.$http
      .get(
        `https://api.github.com/repos/${this.params.owner}/${this.params.repo}`
      )
      .then((response) => response.json())
      .then(
        (data) => {
          this.repo = data;
          // console.log(data);
        },
        (error) => console.log(error)
      );
  },
});
</script>

<style></style>
