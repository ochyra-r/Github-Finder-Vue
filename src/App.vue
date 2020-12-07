<template>
  <div id="app">
    <b-container class="nav-container mb-5" fluid>
      <b-container>
        <b-row>
          <b-col>
            <div id="nav">
              <router-link to="/">GitHub Finder</router-link>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
    <b-container class="router-view">
      <b-row>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="sass">
.nav-container
  background-color: #333
  #nav
    a
      display: inline-block
      padding: 1rem 0
      text-transform: uppercase
      font-size: 1.4rem
</style>
