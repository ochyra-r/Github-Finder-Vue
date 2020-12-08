<template>
  <div class="repository">
    <b-container class="repository-info mb-4">
      <b-row class="flex-column">
        <div class="repository-info__main">
          &#x1F4D6;
          <router-link
            v-bind:to="'/user/' + owner.login"
            class="repository-info__main-user"
          >
            {{ owner.login }}
          </router-link>
          / <span class="repository-info__main-repo">{{ repo.name }}</span>
        </div>
        <div class="repository-info__desc">
          <p class="repository-info__desc-text">{{ repo.description }}</p>
        </div>
      </b-row>
    </b-container>
    <b-container class="repository-content mb-5">
      <b-row>
        <b-col class="px-0">
          <b-card no-body class="repository-content__container">
            <b-tabs card>
              <Commits v-bind:commits="commits" />
              <Contributors v-bind:contributors="contributors" />
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Contributors from "../components/Contributors.vue";
import Commits from "../components/Commits.vue";

export default Vue.extend({
  name: "Repository",
  components: {
    Contributors,
    Commits,
  },
  data() {
    return {
      params: {
        owner: this.$route.params.owner as string,
        repo: this.$route.params.repo as string,
      },
      repo: {} as object,
      owner: {} as object,
      contributors: [] as Array<object>,
      commits: [] as Array<object>,
      page: {
        commits: 1 as number,
        contributors: 1 as number,
      },
      perPage: {
        commits: 100 as number,
        contributors: 100 as number,
      },
    };
  },
  methods: {
    fetchContributors: function(url: string): void {
      this.$http
        .get(
          url +
            `?page=${this.page.contributors}&per_page=${this.perPage.contributors}`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.contributors = data;
          },
          (error) => console.log(error)
        );
    },
    fetchCommits: function(url: string): void {
      this.$http
        .get(
          url + `?page=${this.page.commits}&per_page=${this.perPage.commits}`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.commits = data;
          },
          (error) => console.log(error)
        );
    },
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
          this.owner = data.owner;
          this.fetchContributors(data.contributors_url);
          this.fetchCommits(
            `https://api.github.com/repos/${this.params.owner}/${this.params.repo}/commits`
          );
        },
        (error) => console.log(error)
      );
  },
});
</script>

<style lang="sass" scoped>
.repository
  &-info
    border-bottom: 1px solid #ddd
    &__main
      font-size: 2rem

.repository-content__commits
  &-list
    .repo-list__item
      &-info
        img
          width: 40px
          height: 40px
          border-radius: 50%
</style>
