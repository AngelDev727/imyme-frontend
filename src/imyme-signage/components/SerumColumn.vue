<template>
    <div class="flex-row">
        <SerumColumnTemplateLeft v-if="!isLoading" :columnClass="`home-cell-column`" :products="products.slice(0, 30)" :existsNewProduct="existsNewProduct"/>
        <HeroSection/>
        <SerumColumnTemplateRight v-if="!isLoading" :columnClass="`home-cell-column2`" :products="products.slice(30, 60)" :existsNewProduct="existsNewProduct"/>
        <Splash v-if="isLoading"/>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HeroSection from "@signage/components/HeroSection.vue";
  import SerumColumnTemplateRight from "@signage/components/SerumColumnTemplateRight.vue";
  import SerumColumnTemplateLeft from "@signage/components/SerumColumnTemplateLeft.vue";
  import Splash from "@signage/components/Splash.vue";
  import firebase from 'firebase';
  import QuerySnapshot = firebase.firestore.QuerySnapshot;

  const firebaseAPIKey: string | undefined = process.env.VUE_APP_FIREBASE_API_KEY;
  const storeKey: string = process.env.VUE_APP_STORE_KEY || 'signage-tokyu-shibuya-scramble';

  firebase.initializeApp({
    apiKey: firebaseAPIKey,
    projectId: 'imyme-production'
  });

  const db = firebase.firestore();

  @Component({
    components: {
      HeroSection,
      SerumColumnTemplateRight,
      SerumColumnTemplateLeft,
      Splash,
    },
    data() {
      return {
        products: [],
        intervalId: undefined,
        isLoading: false,
        existsNewProduct: false,
      }
    },
  })

  export default class SerumColumn extends Vue {
    public beforeMounted() {
        clearInterval(this.$store.state.products.productTimer)
    }

    public mounted() {
        this.getProducts().then(qs => {
            this.$data.products = qs.docs.map(doc => doc.data());
            this.$store.state.products.productTimer = setInterval(() => this.changeProducts(), 2500)
        })
    }

    public getProducts(): Promise<QuerySnapshot> {
        return db.collection(storeKey).orderBy("createdAt", "desc").limit(60).get()
    }

    public changeProducts() {
        this.getProducts().then(qs => {
            const beforeProducts = JSON.parse(JSON.stringify(this.$data.products));
            const afterProducts = qs.docs.map(doc => doc.data());
            this.$data.isLoading = false;
            if(JSON.stringify(beforeProducts) !== JSON.stringify(afterProducts)) {
                this.$data.isLoading = true;
                this.$data.existsNewProduct = true;
                this.$data.products = afterProducts;
            }
        })
    }
  }
</script>
