<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="totalRows"
    :per-page="perPage.repo"
    v-on:page-click="changePage"
    align="center"
  ></b-pagination>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Pagination",
  props: {
    perPage: Number,
    total: Number,
    type: String,
  },
  data() {
    return {
      currentPage: 1 as number,
    };
  },
  computed: {
    totalRows: function(): number {
      return this.total;
    },
  },
  methods: {
    changePage: function(
      bvEvt: EventListenerOrEventListenerObject,
      page: number
    ): void {
      this.$emit("changePage", {
        page: page as number,
        type: this.type as string,
      });
    },
  },
});
</script>
