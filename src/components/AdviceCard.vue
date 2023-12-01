<template>
  <div class="card_wrapper">
    <span class="advice_num">advice #1</span>
    <p class="advice_copy">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum sed aut quia at, dolor quo commodi,
    </p>
    <v-btn>
      <IconDice />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import IconDice from '@/components/icons/IconDice.vue';
</script>

<style lang="scss" scoped>
.card_wrapper {
  @include flexCenterAlignment;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  background-color: var(--card-bg);
  border-radius: 1rem;

  @include media(sm) {
    padding-inline: 1rem
  }

  .advice_num {
    @include font(600, .825rem, var(--cyan-clr));
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    margin-bottom: 1rem;

    @include media(sm) {
      font-size: .75rem
    }
  }

  .advice_copy {
    @include font(800, 1.25rem, var(--text-clr));
    text-align: center;
    line-height: 1.6;

    @include media(sm) {
      font-size: 1rem
    }
  }

  .v-btn {
    background-color: var(--cyan-clr);
    border-radius: 50%;
    @include size(4rem, 4rem);
    transform: translateY(100%);
    transition: all .6s ease-in-out;

    &:hover {
      box-shadow: 0 0 26px 10px rgb(82 255 168 / 50%);
    }
  }
}
</style>
