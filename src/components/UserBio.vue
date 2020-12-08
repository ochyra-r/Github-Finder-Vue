<template>
  <b-row class="mb-4 user-info__main p-3">
    <b-col cols="2">
      <img :src="user.avatar_url" alt="avatar" class="img-fluid" />
    </b-col>
    <b-col>
      <h3>
        {{ user.name }} <span v-if="user.name">/ </span>
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
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserBio",
  props: {
    user: {},
  },
});
</script>

<style lang="sass" scoped>
.user-info__main
	border: 1px solid #ddd
	border-radius: 10px
</style>
