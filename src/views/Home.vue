<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-input-group class="">
            <b-form-input
              v-model="query"
              placeholder="Search for users and repositories"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                variant="info"
                v-on:click="fetchData"
                v-on:keypress="fetchData"
                >Button</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-5">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Users" active>
                <!-- <b-card-text>Tab contents 1</b-card-text> -->
                <div class="overflow-auto pt-3">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    v-on:page-click="handleClick"
                  ></b-pagination>

                  <p class="mt-3">Current Page: {{ currentPage }}</p>

                  <ul>
                    <li v-for="user in users" v-bind:key="user.id">
                      {{ user.login }}
                    </li>
                  </ul>

                  <!-- <b-table
                    id="my-table"
                    :items="users"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :fields="fields"
                    small
                  >
                    <template #cell(main)="data">
                      {{ data.item.login }}
                    </template>
                  </b-table> -->
                </div>
              </b-tab>
              <b-tab title="Repositories">
                <!-- <b-card-text>Tab contents 2</b-card-text> -->
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
      perPage: 10,
      currentPage: 1,
      page: 1,
      // fields: ["main"],
    };
  },
  computed: {
    rows: function(): unknown {
      return this.totalUsers;
    },
  },
  methods: {
    handleClick: function(
      bvEvt: EventListenerOrEventListenerObject,
      page: number
    ) {
      console.log(bvEvt, page);
      this.page = page;
      this.users = [];
      this.fetchUsers();
    },
    fetchData: function(): void {
      this.fetchUsers();
      this.fetchRepos();
    },
    fetchUsers() {
      this.$http
        .get(
          `https://api.github.com/search/users?q=${this.query}&page=${this.page}&per_page=${this.perPage}`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.users = data.items;
            this.totalUsers = data.total_count;
            console.log(data);
          },
          (error) => console.log(error)
        );
    },
    fetchRepos() {
      this.$http
        .get(
          `https://api.github.com/search/repositories?q=${this.query}&page=1&per_page=10`
        )
        .then((response) => response.json())
        .then(
          (data) => {
            this.repos = data.items;
            // console.log(data.items);
          },
          (error) => console.log(error)
        );
    },
  },
});
</script>
