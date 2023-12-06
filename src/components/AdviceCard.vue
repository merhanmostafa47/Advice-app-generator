<template>
  <loader v-if="!responseData" />
  <template v-else>
    <div class="card_wrapper">
      <div>
        <span class="advice_num">advice #{{ responseData?.id }}</span>

        <p class="advice_copy">
          {{ responseData?.advice }}
        </p>
      </div>

      <div class="icons_wrapper">
        <i v-if="funControl === 'pause'">
          <IconPlay @click="funControl = 'play'" />
        </i>
        <i v-else>
          <IconPause @click="(funControl = 'pause'), stopGetAdviceFun()" />
        </i>
      </div>

      <v-btn @click="getAdvice">
        <IconDice />
      </v-btn>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { setupAxios } from "@/plugins/axios";
import IconDice from "@/components/icons/IconDice.vue";
import IconPlay from "@/components/icons/IconPlay.vue";
import IconPause from "@/components/icons/IconPause.vue";
import loader from "@/components/loader.vue";

// Destructure the returned object to get $axios
const { $axios } = setupAxios();

const funControl = ref<string>("play");

interface ResponseData {
  id: number;
  advice: string;
}

const responseData = ref<ResponseData>();
const error = ref(null);

const intervalTime = ref(5000);

const advicesArr = ref<ResponseData[]>([]);

// Get new advice every 5 seconds
const funInterval = setInterval(() => {
  getAdvice();
}, intervalTime.value);

function stopGetAdviceFun() {
  clearInterval(funInterval);
}

// Make a GET request using the globally available Axios instance
function getAdvice() {
  $axios
    .get("/advice")
    .then((response) => {
      responseData.value = response.data.slip;

      if (responseData.value) {
        // Check if the response already exists in advicesArr
        const exists = advicesArr.value.some(
          (adv) => adv.id === responseData.value?.id
        );

        // Add the response to advicesArr only if it doesn't exist
        if (!exists) {
          advicesArr.value.push(responseData.value);

          // Store advicesArr in local storage
          localStorage.setItem("Advices", JSON.stringify(advicesArr.value));
        }
      }
    })
    .catch((err) => {
      error.value = err.message;
    });
}
</script>

<style lang="scss" scoped>
.card_wrapper {
  @include flex(space-between, center, column);
  gap: 1rem;
  width: 25rem;
  min-block-size: 17rem;
  padding: 2rem 2rem 3.5rem;
  background-color: var(--card-bg);
  border-radius: 1rem;
  position: relative;

  @include media(sm) {
    padding-inline: 1.15rem;
  }

  .advice_num {
    @include font(600, 0.825rem, var(--cyan-clr));
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    margin-bottom: 1rem;
    text-align: center;
    display: block;

    @include media(sm) {
      font-size: 0.75rem;
    }
  }

  .advice_copy {
    @include font(800, 1.25rem, var(--text-clr));
    text-align: center;
    line-height: 1.6;

    @include media(sm) {
      font-size: 1rem;
    }
  }

  .icons_wrapper {
    cursor: pointer;
    position: relative;
    inline-size: 100%;
    @include flexCenterAlignment;

    &:after {
      position: absolute;
      content: "";
      @include size(100%, 0.3px);
      background-color: var(--text-clr);
      inset-inline: 0;
      top: 41%;
    }

    i {
      background-color: var(--card-bg);
      z-index: 1;
      padding-inline: 1rem;
    }
  }

  .v-btn {
    background-color: var(--cyan-clr);
    border-radius: 50%;
    @include size(4rem, 4rem);
    transition: all 0.6s ease-in-out;
    position: absolute;
    bottom: -2rem;

    &:hover {
      box-shadow: 0 0 26px 10px rgb(82 255 168 / 50%);
    }
  }
}
</style>
