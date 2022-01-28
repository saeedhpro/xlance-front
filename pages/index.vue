<template>
  <div>
    <div class="hero">
      <TopHome/>
    </div>
    <Advantages/>
    <BestFreelancer :number="3"/>
    <NewProject :number="5"/>
    <div class="container">
      <CallForAdvice/>
    </div>
    <News/>
  </div>
</template>
<script>
import TopHome from "../components/client/home/TopHome";
import Advantages from "../components/client/home/Advantages";
import News from "../components/client/home/News";
import BestFreelancer from "../components/client/home/BestFreelancer";
import NewProject from "../components/client/home/NewProject";
import CallForAdvice from "../components/client/CallForAdvice";

export default {
  middleware: 'guest',
  head() {
    return {
      title: 'صفحه اصلی'
    }
  },
  components: {CallForAdvice, NewProject, BestFreelancer, News, Advantages, TopHome},
}
</script>
<style scoped>
.hero {
  position: relative;
  margin-bottom: 15%;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
}
</style>
