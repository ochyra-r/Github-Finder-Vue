<template>
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
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Users",
  props: {
    users: {},
  },
});
</script>

<style lang="sass" scoped>
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
</style>
