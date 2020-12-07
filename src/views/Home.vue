<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-input-group class="">
            <b-form-input
              v-model="query"
              placeholder="Search for users and repositories"
              v-on:keyup.enter="fetchData"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="info" v-on:click="fetchData">Search</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-5">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Users" active>
                <div class="overflow-auto">
                  <div class="d-flex justify-content-between">
                    <div class="list-total-results ml-4">
                      {{ totalUsers }} users
                    </div>
                    <div class="list-total-filters">
                      <b-dropdown
                        id="dropdown-right"
                        right
                        v-bind:text="'Sort: ' + sort.user.sortBy"
                        variant="light"
                        class="m-2"
                      >
                        <b-dropdown-item
                          v-on:click="sortUsers('Best match', 'desc', '')"
                          >Best match</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortUsers(
                              'Most repositories',
                              'desc',
                              'repositories'
                            )
                          "
                          >Most repositories</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortUsers(
                              'Fewest repositories',
                              'asc',
                              'repositories'
                            )
                          "
                          >Fewest repositories</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortUsers('Most followers', 'desc', 'followers')
                          "
                          >Most followers</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortUsers('Fewest followers', 'asc', 'followers')
                          "
                          >Fewest followers</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortUsers('Most recently joined', 'desc', 'joined')
                          "
                          >Most recently joined</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortUsers('Least recently joined', 'asc', 'joined')
                          "
                          >Least recently joined</b-dropdown-item
                        >
                      </b-dropdown>
                    </div>
                  </div>

                  <ul class="results-list px-2 mb-5">
                    <li
                      v-for="user in users"
                      v-bind:key="user.id"
                      class="results-list__item px-3 py-4 d-flex align-items-center"
                    >
                      <router-link v-bind:to="'/user/' + user.login">
                        <img
                          :src="user.avatar_url"
                          alt="avatar"
                          class="results-list__user-img mr-3"
                        />
                      </router-link>
                      <router-link v-bind:to="'/user/' + user.login">
                        <div class="results-list__user-login">
                          {{ user.login }}
                        </div>
                      </router-link>
                    </li>
                  </ul>
                  <b-pagination
                    v-model="currentPage.user"
                    :total-rows="userRows"
                    :per-page="perPage.user"
                    v-on:page-click="userPageChange"
                    align="center"
                  ></b-pagination>
                </div>
              </b-tab>
              <b-tab title="Repositories">
                <div class="overflow-auto">
                  <div class="list-total-results ml-4">
                    {{ totalRepos }} repository results
                  </div>
                  <ul class="results-list px-2 mb-5">
                    <li
                      v-for="repo in repos"
                      v-bind:key="repo.id"
                      class="results-list__item px-3 py-4"
                    >
                      <p class="results-list__repo-name mb-0">
                        &#x1F4D6; {{ repo.full_name }}
                      </p>
                      <p
                        class="results-list__repo-desc mb-0"
                        v-if="repo.description"
                      >
                        {{ repo.description }}
                      </p>
                      <p
                        class="results-list__repo-lng text-muted mt-1 d-inline"
                      >
                        <b-badge pill variant="success">{{
                          repo.language
                        }}</b-badge>
                      </p>
                      <p
                        class="results-list__repo-update text-muted mt-1 d-inline"
                      >
                        updated on {{ repo.updated_at | formatDate }}
                      </p>
                      <router-link
                        v-bind:to="
                          '/repository/' + repo.owner.login + '/' + repo.name
                        "
                        >Go to repo</router-link
                      >
                    </li>
                  </ul>
                  <b-pagination
                    v-model="currentPage.repo"
                    :total-rows="repoRows"
                    :per-page="perPage.repo"
                    v-on:page-click="repoPageChange"
                    align="center"
                  ></b-pagination>
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
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: "Home",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      query: "" as string,
      users: [],
      totalUsers: 0 as number,
      repos: [],
      totalRepos: 0 as number,
      perPage: {
        user: 10 as number,
        repo: 10 as number,
      },
      currentPage: {
        user: 1 as number,
        repo: 1 as number,
      },
      page: {
        user: 1 as number,
        repo: 1 as number,
      },
      sort: {
        user: {
          sortBy: "Best match" as string,
          order: "desc" as string,
          sort: "" as string,
        },
        repo: {
          sortBy: "Best match" as string,
          order: "desc" as string,
          sort: "" as string,
        },
      },
    };
  },
  computed: {
    userRows: function(): unknown {
      return this.totalUsers;
    },
    repoRows: function(): unknown {
      return this.totalRepos;
    },
  },
  methods: {
    sortUsers: function(name: string, order: string, sort: string) {
      // console.log(name, order, sort);
      this.sort.user.sortBy = name;
      this.sort.user.order = order;
      this.sort.user.sort = sort;
      this.users = [];
      this.fetchUsers();
    },
    userPageChange: function(
      bvEvt: EventListenerOrEventListenerObject,
      page: number
    ) {
      this.page.user = page;
      this.users = [];
      this.fetchUsers();
    },
    repoPageChange: function(
      bvEvt: EventListenerOrEventListenerObject,
      page: number
    ) {
      this.page.repo = page;
      this.repos = [];
      this.fetchRepos();
    },
    fetchData: function(): void {
      this.fetchUsers();
      this.fetchRepos();
    },
    fetchUsers() {
      this.$http
        .get(
          `https://api.github.com/search/users?q=${this.query}&page=${this.page.user}&per_page=${this.perPage.user}&order=${this.sort.user.order}&sort=${this.sort.user.sort}`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.users = data.items;
            this.totalUsers = data.total_count;
            // console.log(data);
          },
          (error) => console.log(error)
        );
    },
    fetchRepos() {
      this.$http
        .get(
          `https://api.github.com/search/repositories?q=${this.query}&page=${this.page.repo}&per_page=${this.perPage.repo}`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.repos = data.items;
            this.totalRepos = data.total_count;
            // console.log(data.items);
          },
          (error) => console.log(error)
        );
    },
  },
});
</script>

<style lang="sass">
.results-list
  list-style: none
  &__item
    border-bottom: 1px solid #ddd
  &__user
    &-img
      border-radius: 6px
      width: 50px
      height: 50px
    &-login
      font-size: 1.6rem
  &__repo
    &-name
      font-size: 1.4rem
    &-desc
      font-size: 1.1rem
    &-update, &-lng
      font-size: 0.8rem

.list-total-results
  font-size: 2rem
</style>
