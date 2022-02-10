<template>
  <div class="home flex justify-center items-center flex-col px-10">
    <h1 class="home-t text-3xl font-bold text-gray-700 mt-7">URL Shortener</h1>
    <p class="mb-7 text-gray-400 text-sm">by aminovdev</p>
    <form
      @submit.prevent="createUrl"
      class="flex flex-col justify-center w-full"
    >
      <div class="flex flex-col my-2">
        <input
          v-model="url"
          name="url"
          type="text"
          class="border outline-none p-2 px-3 rounded focus-within:bg-blue-100"
          placeholder="Enter URL: https://example.com"
        />
      </div>
      <div class="flex flex-col my-2">
        <input
          v-model="slug"
          name="slug"
          type="text"
          class="border outline-none p-2 px-3 rounded focus-within:bg-blue-100"
          placeholder="Enter slug: ex-com"
        />
      </div>
      <div class="flex flex-col my-2">
        <button
          type="submit"
          class="bg-blue-600 border border-blue-600 rounded text-white p-3 hover:bg-transparent hover:text-blue-600"
        >
          Create a url
        </button>
      </div>
    </form>
    <div class="responses text-center">
      <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
      <p v-else-if="warnMsg" v-html="warnMsg" class="text-yellow-600"></p>
      <p v-else-if="successMsg" v-html="successMsg" class="text-green-600"></p>
      <p class="">
        {{ shortUrl.msg }}
        <b
          ><a :href="shortUrl.url">{{ shortUrl.url }}</a></b
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://url-shortener-mevn.herokuapp.com";
export default {
  name: "Home",
  data() {
    return {
      errorMsg: ``,
      warnMsg: ``,
      successMsg: ``,
      url: "",
      slug: "",
      shortUrl: {
        url: "",
        msg: "",
      },
    };
  },
  methods: {
    async createUrl() {
      const response = await axios.post(`/url`, {
        url: this.url,
        slug: this.slug,
        shortUrl: window.location.href + this.slug,
      });
      if (response.data.status === "warn") {
        this.warnMsg = response.data.message;
      } else if (response.data.status === "ok") {
        this.warnMsg = "";
        this.successMsg = response.data.message;
        this.shortUrl.msg = "Your url is: ";
        this.shortUrl.url = response.data.savedUrl.shortUrl;
      }
      console.log(response.data);
      this.url = "";
      this.slug = "";
    },
  },
};
</script>
