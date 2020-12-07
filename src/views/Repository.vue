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
              <b-tab title="Commits" active class="repository-content__commits">
                <b-list-group class="repository-content__commits-list">
                  <b-list-group-item
                    v-for="commit in commits"
                    v-bind:key="commit.sha"
                    class="repo-list__item"
                  >
                    <h5 class="repo-list__item-message">
                      {{ commit.commit.message | getMessage }}
                    </h5>
                    <div class="repo-list__item-info">
                      <img
                        :src="commit.author.avatar_url"
                        alt="avatar"
                        class="mr-2"
                      />
                      <span class="mr-4">{{ commit.author.login }}</span>
                      <span class="text-muted"
                        >comitted:
                        {{ commit.commit.author.date | formatDateHour }}
                        {{ commit.commit.author.date | formatDate }}</span
                      >
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </b-tab>
              <b-tab
                title="Contributors"
                class="repository-content__contributors justify-content-center"
              >
                <div
                  v-for="contributor in contributors"
                  v-bind:key="contributor.id"
                  class="repository-content__contributors-item"
                >
                  <b-badge variant="light" class="badge">
                    <router-link
                      v-bind:to="'/user/' + contributor.login"
                      class="badge__link"
                    >
                      <img
                        :src="contributor.avatar_url"
                        alt="avatar"
                        class="badge__img"
                      />
                      <div
                        class="badge__info d-flex align-items-center justify-content-center flex-column"
                      >
                        <p class="name">{{ contributor.login }}</p>
                        <p class="contributions text-muted">
                          Contributions: {{ contributor.contributions }}
                        </p>
                      </div>
                    </router-link>
                  </b-badge>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Repository",
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
            // console.log(data);
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
          // console.log(data);
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

.repository-content
  &__contributors
    display: flex
    flex-wrap: wrap
    &-item
      width: auto
      margin: 1rem
      .badge
        border: 1px solid #ddd
        padding: 1rem
        &__link
          display: flex
        &__img
          width: 60px
          height: 60px
          border-radius: 50%
          margin-right: 10px
        &__info
          .name
            font-size: 1.4rem

.repository-content__commits
  &-list
    .repo-list__item
      &-info
        img
          width: 40px
          height: 40px
          border-radius: 50%
</style>
