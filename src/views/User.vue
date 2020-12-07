<template>
  <div class="user">
    <b-container class="user-info">
      <b-row class="mb-4 user-info__main p-3">
        <b-col cols="2">
          <img :src="user.avatar_url" alt="avatar" class="img-fluid" />
        </b-col>
        <b-col>
          <h3>
            {{ user.name }} <span v-if="user.name">/</span>
            <span class="text-muted">{{ user.login }}</span>
          </h3>
          <p class="text-muted" v-if="user.bio">{{ user.bio }}</p>
          <div>
            <span v-if="user.location">&#x1F3E6; {{ user.location }}</span>
            <span v-if="user.blog">
              &#x1F517; <a :href="user.blog">{{ user.blog }}</a>
            </span>
          </div>
        </b-col>
      </b-row>
      <b-row class="flex-column mb-5">
        <h3>Repositories {{ user.public_repos }}</h3>
        <b-list-group class="repo-list">
          <b-list-group-item
            v-for="repo in repos"
            v-bind:key="repo.id"
            class="repo-list__item"
          >
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
              <b-badge pill variant="dark"
                >Forks: {{ repo.forks_count }}</b-badge
              >
            </p>
            <p class="repo-list__item-pill text-muted mt-1 d-inline">
              <b-badge pill variant="warning"
                >Stars: {{ repo.stargazers_count }}</b-badge
              >
            </p>
          </b-list-group-item>
        </b-list-group>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "User",
  data() {
    return {
      login: this.$route.params.login,
      user: {},
      repos: [],
      totalRepos: 0 as number,
      page: 1,
      perPage: 10,
    };
  },
  methods: {
    fetchRepos: function(url: string) {
      this.$http
        .get(url + `?page=${this.page}&per_page=${this.perPage}`)
        .then((response) => response.json())
        .then(
          (data) => {
            this.repos = data;
          },
          (error) => console.log(error)
        );
    },
  },
  created() {
    this.$http
      .get(`https://api.github.com/users/${this.login}`)
      .then((response) => response.json())
      .then(
        (data) => {
          this.user = data;
          this.fetchRepos(data.repos_url);
        },
        (error) => console.log(error)
      );
  },
});
</script>

<style lang="sass" scoped>
.user-info
  &__main
    border: 1px solid #ddd
    border-radius: 10px

.repo-list
  &__item
    &-name
      font-size: 2rem
    &-pill
      margin-right: .3rem
</style>
