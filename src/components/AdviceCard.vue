<template>
  <loader v-if="!responseData" />
  <template v-else>
    <div
      class="arrow arrow__left"
      @click="getPreviousAdvice()"
      :class="{ disable: disableLeftBtn }"
    >
      <IconArrowLeft />
    </div>
    <div class="card_wrapper">
      <div>
        <span class="advice_num">advice #{{ responseData?.id }}</span>

        <p class="advice_copy">
          {{ responseData?.advice }}
        </p>
      </div>

      <div class="icons_wrapper">
        <i v-if="funControl === 'pause'">
          <IconPlay @click="(funControl = 'play'), startInterval()" />
        </i>
        <i v-else>
          <IconPause @click="(funControl = 'pause'), stopInterval()" />
        </i>
      </div>

      <v-btn @click="getAdvice">
        <IconDice />
      </v-btn>
    </div>

    <div
      class="arrow arrow__right"
      @click="getNextAdvice()"
      :class="{ disable: disableRightBtn }"
    >
      <IconArrowRight />
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { setupAxios } from "@/plugins/axios";
import IconDice from "@/components/icons/IconDice.vue";
import IconPlay from "@/components/icons/IconPlay.vue";
import IconPause from "@/components/icons/IconPause.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
import loader from "@/components/loader.vue";

interface ResponseData {
  id: number;
  advice: string;
}
// Destructure the returned object to get $axios
const { $axios } = setupAxios();

const responseData = ref<ResponseData>();
const error = ref(null);

const funControl = ref("play");

const disableLeftBtn = ref(false);

const disableRightBtn = ref(false);

const intervalTime = ref(5000);
let funInterval: any;

const advicesArr = ref<ResponseData[]>([]);

const currentIndex = ref(0);

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

          // Store advicesArr in local storage to get the previous and next advice
          localStorage.setItem("Advices", JSON.stringify(advicesArr.value));
        }

        currentIndex.value = advicesArr.value.length - 1;
      }
    })
    .catch((err) => {
      error.value = err.message;
    });
}

// Start the interval initially
startInterval();

// Function to start the interval
function startInterval() {
  funInterval = setInterval(() => {
    getAdvice();
  }, intervalTime.value);
}

// Function to stop the interval
function stopInterval() {
  clearInterval(funInterval);
}

// Function to get the previous advice
function getPreviousAdvice() {
  funControl.value = "pause";
  stopInterval();
  if (currentIndex.value > 0) {
    currentIndex.value--;
    responseData.value = advicesArr.value[currentIndex.value];
    disableRightBtn.value = false;
  } else {
    disableLeftBtn.value = true;
  }
}

// Function to get the next advice
function getNextAdvice() {
  if (currentIndex.value < advicesArr.value.length - 1) {
    currentIndex.value++;
    responseData.value = advicesArr.value[currentIndex.value];
    disableLeftBtn.value = false;
  } else {
    disableRightBtn.value = true;
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  background-color: var(--card-bg);
  @include size(2rem, 2rem);
  border-radius: 50%;
  @include flexCenterAlignment;
  position: relative;
  z-index: 5;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.disable {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__left {
    margin-inline-end: -1.5rem;
  }

  &__right {
    margin-inline-start: -1.5rem;
  }
}

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
