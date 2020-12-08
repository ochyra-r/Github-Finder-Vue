<template>
  <div class="home">
    <b-container class="bv-example-row px-0">
      <b-row>
        <b-col>
          <b-input-group class="">
            <b-form-input
              v-model="query"
              placeholder="Search for users and repositories"
              v-on:keyup.enter="fetchData"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" v-on:click="fetchData"
                >Search</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-5 mb-5">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Users" active>
                <div v-if="isLoading.users" class="text-center">
                  <b-spinner
                    style="width: 3rem; height: 3rem;"
                    label="Large Spinner"
                    type="grow"
                  ></b-spinner>
                </div>
                <div v-if="isFetched" class="overflow-auto">
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
                  <Users v-bind:users="users" />
                  <div v-if="userError.isError" class="error-msg">
                    <b-alert show variant="danger">{{ userError.msg }}</b-alert>
                  </div>
                  <Pagination
                    v-bind:perPage="perPage.user"
                    v-bind:total="totalUsers"
                    v-bind:type="paginationType.user"
                    v-on:changePage="pageChange($event)"
                  />
                </div>
              </b-tab>
              <b-tab title="Repositories">
                <div v-if="isLoading.repos" class="text-center">
                  <b-spinner
                    style="width: 3rem; height: 3rem;"
                    label="Large Spinner"
                    type="grow"
                  ></b-spinner>
                </div>
                <div v-if="isFetched" class="overflow-auto">
                  <div class="d-flex justify-content-between">
                    <div class="list-total-results ml-4">
                      {{ totalRepos }} repository results
                    </div>
                    <div class="list-total-filters">
                      <b-dropdown
                        id="dropdown-right"
                        right
                        v-bind:text="'Sort: ' + sort.repo.sortBy"
                        variant="light"
                        class="m-2"
                      >
                        <b-dropdown-item
                          v-on:click="sortRepos('Best match', 'desc', '')"
                          >Best match</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="sortRepos('Most stars', 'desc', 'stars')"
                          >Most stars</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="sortRepos('Fewest stars', 'asc', 'stars')"
                          >Fewest stars</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="sortRepos('Most forks', 'desc', 'forks')"
                          >Most forks</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="sortRepos('Fewest forks', 'asc', 'forks')"
                          >Fewest forks</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortRepos('Recently updated', 'desc', 'updated')
                          "
                          >Recently updated</b-dropdown-item
                        >
                        <b-dropdown-item
                          v-on:click="
                            sortRepos(
                              'Least recently updated',
                              'asc',
                              'updated'
                            )
                          "
                          >Least recently updated</b-dropdown-item
                        >
                      </b-dropdown>
                    </div>
                  </div>
                  <Repositories v-bind:repos="repos" />
                  <div v-if="repoError.isError" class="error-msg">
                    <b-alert show variant="danger">{{ repoError.msg }}</b-alert>
                  </div>
                  <Pagination
                    v-bind:perPage="perPage.repo"
                    v-bind:total="totalRepos"
                    v-bind:type="paginationType.repo"
                    v-on:changePage="pageChange($event)"
                  />
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
import Repositories from "../components/Repositories.vue";
import Users from "../components/Users.vue";
import Pagination from "../components/Pagination.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Repositories,
    Users,
    Pagination,
  },
  data() {
    return {
      query: "" as string,
      users: [] as Array<object>,
      totalUsers: 0 as number,
      repos: [] as Array<object>,
      totalRepos: 0 as number,
      perPage: {
        user: 10 as number,
        repo: 10 as number,
      },
      page: {
        user: 1 as number,
        repo: 1 as number,
      },
      paginationType: {
        user: "user" as string,
        repo: "repo" as string,
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
      isFetched: false as boolean,
      isLoading: {
        users: false as boolean,
        repos: false as boolean,
      },
      userError: {
        isError: false as boolean,
        msg: "" as string,
      },
      repoError: {
        isError: false as boolean,
        msg: "" as string,
      },
    };
  },
  methods: {
    sortUsers: function(name: string, order: string, sort: string): void {
      this.sort.user.sortBy = name;
      this.sort.user.order = order;
      this.sort.user.sort = sort;
      this.users = [];
      this.fetchUsers();
    },
    sortRepos: function(name: string, order: string, sort: string): void {
      this.sort.repo.sortBy = name;
      this.sort.repo.order = order;
      this.sort.repo.sort = sort;
      this.repos = [];
      this.fetchRepos();
    },
    pageChange: function(events: { page: number; type: string }): void {
      if (events.type === "repo") {
        this.page.repo = events.page;
        this.repos = [];
        this.fetchRepos();
      } else {
        this.page.user = events.page;
        this.users = [];
        this.fetchUsers();
      }
    },
    fetchData: function(): void {
      if (this.query) {
        this.fetchUsers();
        this.fetchRepos();
      }
    },
    fetchUsers(): void {
      this.isLoading.users = true;
      this.$http
        .get(
          `https://api.github.com/search/users?q=${this.query}&page=${this.page.user}&per_page=${this.perPage.user}&order=${this.sort.user.order}&sort=${this.sort.user.sort}`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.isLoading.users = false;
            this.isFetched = true;
            this.userError.isError = false;
            this.users = data.items;
            this.totalUsers = data.total_count;
          },
          (error) => {
            this.isLoading.users = false;
            this.isFetched = true;
            this.userError.isError = true;
            this.userError.msg = error.body.message;
          }
        );
    },
    fetchRepos(): void {
      this.isLoading.repos = true;
      this.$http
        .get(
          `https://api.github.com/search/repositories?q=${this.query}&page=${this.page.repo}&per_page=${this.perPage.repo}&order=${this.sort.repo.order}&sort=${this.sort.repo.sort}`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.isLoading.repos = false;
            this.isFetched = true;
            this.repoError.isError = false;
            this.repos = data.items;
            this.totalRepos = data.total_count;
          },
          (error) => {
            this.isLoading.repos = false;
            this.isFetched = true;
            this.repoError.isError = true;
            this.repoError.msg = error.body.message;
          }
        );
    },
  },
});
</script>

<style lang="sass">
.list-total-results
  font-size: 2rem

.error-msg
  text-align: center
  margin-bottom: 2rem
</style>
