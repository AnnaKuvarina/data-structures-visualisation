<template>
  <div class="home">
    <h1 class="home-title">Data structure visualizations</h1>
    <p class="home-content">
      A data structure is a particular way of organizing data in a computer so that it can be used effectively.
    </p>

    <div class="home-cards">
      <md-card v-for="card in cards" :key="card.link">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ card.title }}</div>
            <div class="md-subhead">{{ card.description }}</div>
          </md-card-header-text>

          <md-card-media md-big>
            <img :src="card.img" alt="data structure">
          </md-card-media>
        </md-card-header>

        <md-card-actions>
          <md-button @click="navigateByPath(card.path)">Try it</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { homeCardsConfig } from '@/configs/homeCards.config';

@Component
export default class Home extends Vue {
  cards = homeCardsConfig;

  navigateByPath(path: string) {
    this.$router.push(path);
  }
}
</script>

<style scoped lang="scss">
  .home {
    margin: 0 auto;
    padding: 120px 20px 0;
    max-width: 1024px;

    &-title {
      margin-bottom: 30px;
      font-weight: 400;
      color: #2c3e50;
      text-align: center;
    }

    &-content {
      margin: 0 auto 10px;
      text-align: center;
      max-width: 400px;
      font-size: 16px;
      color: #8897aa;
    }

    &-cards {
      padding-top: 50px;
      display: flex;

      .md-card {
        margin: 10px 5px;
        width: 50%;
      }
    }
  }
</style>
