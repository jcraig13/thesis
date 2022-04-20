<template>
  <HelloWorld/>
  <CountriesStep :data="data" :height="400" :width="width" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CountriesStep from "./components/CountriesStep.vue";
const COUNTRIES_CSV = "./productioncountries.csv";
const MAX_SVG_WIDTH = 600;
export default {
  name: 'App',
  components: {
    HelloWorld,
    CountriesStep,
  },
  data() {
    return {
      countries: null,
      width: MAX_SVG_WIDTH,
    };
  },
  // computed: {
  

  // },
  methods: {
    onResize() {
      this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    },
  },
  mounted() {
    fetch(COUNTRIES_CSV)
      .then((data) => {
        this.countries = data;
        console.log("country data", data);
      });

    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: #FFF6E9;
}
</style>
