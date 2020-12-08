<template>
  <b-list-group class="repo-list">
    <UserRepository
      v-for="repo in repos"
      v-bind:repo="repo"
      v-bind:key="repo.id"
    />
  </b-list-group>
</template>

<script lang="ts">
import Vue from "vue";
import UserRepository from "./UserRepository.vue";

export default Vue.extend({
  name: "UserRepositories",
  components: {
    UserRepository,
  },
  props: {
    repos: {},
  },
});
</script>
