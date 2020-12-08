<template>
  <div class="user">
    <b-container class="user-info">
      <UserBio v-bind:user="user" />
      <b-row class="flex-column mb-5">
        <h3>Repositories: {{ user.public_repos }}</h3>
        <UserRepositories v-bind:repos="repos" />
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          v-on:page-click="userReposChange"
          align="center"
          class="mt-4"
        ></b-pagination>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserRepositories from "../components/UserRepositories.vue";
import UserBio from "../components/UserBio.vue";

export default Vue.extend({
  name: "User",
  components: {
    UserRepositories,
    UserBio,
  },
  data() {
    return {
      login: this.$route.params.login as string,
      repoURL: "" as string,
      user: {} as object,
      repos: [] as Array<object>,
      totalRepos: 0 as number,
      currentPage: 1 as number,
      page: 1 as number,
      perPage: 20 as number,
    };
  },
  methods: {
    fetchRepos: function(url: string): void {
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
    userReposChange: function(
      bvEvt: EventListenerOrEventListenerObject,
      page: number
    ): void {
      this.page = page;
      this.repos = [];
      this.fetchRepos(this.repoURL);
    },
  },
  computed: {
    totalRows: function(): number {
      return this.totalRepos;
    },
  },
  created() {
    this.$http
      .get(`https://api.github.com/users/${this.login}`)
      .then((response) => response.json())
      .then(
        (data) => {
          this.user = data;
          this.repoURL = data.repos_url;
          this.totalRepos = data.public_repos;
          this.fetchRepos(data.repos_url);
        },
        (error) => console.log(error)
      );
  },
});
</script>
