<template>
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
            v-if="commit.author"
          />
          <span class="mr-4" v-if="commit.author">{{
            commit.author.login
          }}</span>
          <span class="text-muted"
            >comitted:
            {{ commit.commit.author.date | formatDateHour }}
            {{ commit.commit.author.date | formatDate }}</span
          >
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-tab>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Commits",
  props: {
    commits: {},
  },
});
</script>

<style lang="sass" scoped>
.repository-content__commits-list
	.repo-list__item
		&-info
			img
				width: 40px
				height: 40px
				border-radius: 50%
</style>
