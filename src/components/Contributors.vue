<template>
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
          <img :src="contributor.avatar_url" alt="avatar" class="badge__img" />
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
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Contributors",
  props: {
    contributors: {},
  },
});
</script>

<style lang="sass" scoped>

.repository-content__contributors
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
</style>
