<template>
  <h1>{{ url }}</h1>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://url-shortener-mevn.herokuapp.com";

export default {
  name: "Url",
  computed: {
    url() {
      return this.$route.params.slug;
    },
  },
  methods: {
    async getUrl() {
      const response = await axios.get(`/url/${this.url}`);

      console.log(response.data);
      if (response.data.status === "ok") {
        window.location.replace(response.data.url.url);
      }
    },
  },
  created() {
    this.getUrl();
  }
};
</script>

<style></style>
