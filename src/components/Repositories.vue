<template>
  <ul class="results-list px-2 mb-5">
    <li
      v-for="repo in repos"
      v-bind:key="repo.id"
      class="results-list__item px-3 py-4"
    >
      <router-link
        v-bind:to="'/repository/' + repo.owner.login + '/' + repo.name"
      >
        <p class="results-list__repo-name mb-0">
          &#x1F4D6; {{ repo.full_name }}
        </p>
      </router-link>
      <p class="results-list__repo-desc mb-0" v-if="repo.description">
        {{ repo.description }}
      </p>
      <p class="results-list__repo-lng text-muted mt-1 d-inline">
        <b-badge pill variant="success">{{ repo.language }}</b-badge>
      </p>
      <p class="results-list__repo-update text-muted mt-1 d-inline">
        updated on {{ repo.updated_at | formatDate }}
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Repositories",
  props: {
    repos: {},
  },
});
</script>

<style lang="sass" scoped>
.results-list
  list-style: none
  &__item
    border-bottom: 1px solid #ddd
  &__repo
    &-name
      font-size: 1.4rem
    &-desc
      font-size: 1.1rem
    &-update, &-lng
      font-size: 0.8rem
</style>
