<template>
  <div>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
      color="red-lighten-2"
    ></v-progress-linear>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect ,onMounted,onBeforeUnmount} from "vue";

let value = ref(10);
let bufferValue = ref(20);
let interval= ref(0);

watchEffect(() => {
//   if (val < 100) return;

  value.value = 0;
  bufferValue.value = 10;
  startBuffer();
});


onMounted(()=>{
    startBuffer();
})

  onBeforeUnmount(()=>{
    clearInterval(interval.value);
  })


  function startBuffer() {
      clearInterval(interval.value);

      interval = setInterval(() => {
        value.value += Math.random() * (15 - 5) + 5;
        bufferValue.value += Math.random() * (15 - 5) + 6;
      }, 2000);
    }
// export default {
//   watch: {
//     value(val) {
//       if (val < 100) return;

//       this.value = 0;
//       this.bufferValue = 10;
//       this.startBuffer();
//     },
//   },

//   mounted() {
//     this.startBuffer();
//   },

//   beforeUnmount() {
//     clearInterval(this.interval);
//   },

//   methods: {
//     startBuffer() {
//       clearInterval(this.interval);

//       this.interval = setInterval(() => {
//         this.value += Math.random() * (15 - 5) + 5;
//         this.bufferValue += Math.random() * (15 - 5) + 6;
//       }, 2000);
//     },
//   },
// };
</script>
