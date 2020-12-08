<template>
  <b-list-group-item class="repo-list__item">
    <router-link
      v-bind:to="'/repository/' + repo.owner.login + '/' + repo.name"
    >
      <p class="repo-list__item-name mb-0">
        {{ repo.name }}
      </p>
    </router-link>
    <p class="text-muted mb-2">{{ repo.description }}</p>
    <p class="repo-list__item-pill text-muted mt-1 d-inline">
      <b-badge pill variant="success">{{ repo.language }}</b-badge>
    </p>
    <p
      v-if="repo.license"
      class="repo-list__item-pill text-muted mt-1 d-inline"
    >
      <b-badge pill variant="primary"
        >License: {{ repo.license.spdx_id }}</b-badge
      >
    </p>
    <p class="repo-list__item-pill text-muted mt-1 d-inline">
      <b-badge pill variant="dark">Forks: {{ repo.forks_count }}</b-badge>
    </p>
    <p class="repo-list__item-pill text-muted mt-1 d-inline">
      <b-badge pill variant="warning"
        >Stars: {{ repo.stargazers_count }}</b-badge
      >
    </p>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserRepository",
  props: {
    repo: {},
  },
});
</script>

<style lang="sass" scoped>
.repo-list__item
	&-name
		font-size: 2rem
	&-pill
		margin-right: .3rem
</style>
