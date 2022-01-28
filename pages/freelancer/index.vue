<template>
  <div class="container">
    <Head>
      <h1 slot="nameHead" class="ka-font">برترین فریلنسرها</h1>
    </Head>
    <FleelancerFilter @filter="filterFreelancers"/>
    <div class="mt-10 mb-5 flex items-center">
      <div>
        <img src="/images/art2.png"/>
      </div>
      <div class="mr-5 text-xl text-black ir-bold" >لیست فریلنسرها</div>
    </div>
    <ListFreelancer :has-paginate="true" :laravel-data="freelancers" @paginate="paginate"/>
  </div>
</template>

<script>
    import FleelancerFilter from "../../components/dashboard/freelancerList/FleelancerFilter";
    import Head from "../../components/client/home/Head";
    import ListFreelancer from "./ListFreelancer";
    import SelectInput from "../../components/dashboard/global/SelectInput";
    export default {
        name: "index",
        layout:'defaultDash',
        middleware:'auth',
      head(){
        return {
          title: 'لیست فریلنسرها'
        }
      },
        components: {SelectInput, ListFreelancer, FleelancerFilter,Head},
        async asyncData(context) {
            let skills = context.route.query.skills;
            let term = context.route.query.term;
            let page = context.route.query.page;
            let r = '/search/freelancer';
            let sl = skills ? skills.split(',') : [];
            let q = [];
            sl.forEach(s => q.push(`skills[]=${s}`));
            if(term) {
                q.push(`term=${term}`)
            }
            if(page) {
                q.push(`page=${page}`)
            }
            r += '?' + q.join('&');
            let freelancers = null;
            await context.store.dispatch('freelancer/searchFreelancer', r)
                .then(res=>{
                    freelancers = res;
                })
            return {
                freelancers
            }
        },
        methods: {
            filterFreelancers(skills, term) {
                let r = '/freelancer';
                let q = [];
                let page = this.$route.query.page;
                let sl = [];
                for (let i = 0; i < skills.length; i++) {
                    sl.push(skills[i])
                }
                if(page > 1) page = 1;
                if(sl) {
                    q.push(`skills=${sl}`)
                }
                if(term) {
                    q.push(`term=${term}`)
                }
                if(page) {
                    q.push(`page=${page}`)
                }
                r += '?' + q.join('&');
                this.$router.push({path: r})
            },
            paginate(page=1){
                let skills = this.$route.query.skills;
                let term = this.$route.query.term;
                let r = '/freelancer';
                let sl = skills ? skills.split(',') : [];
                let q = [];
                sl.forEach(s => q.push(`skills[]=${s}`));
                if(term) {
                    q.push(`term=${term}`)
                }
                if(page) {
                    q.push(`page=${page}`)
                }
                r += '?' + q.join('&');
                this.$router.push({path: r})
            }
        },
        mounted() {
            let skills = this.$route.query.skills;
            let term = this.$route.query.term;
            let page = this.$route.query.page;
            let r = '/search/freelancer';
            let sl = skills ? skills.split(',') : [];
            let q = [];
            sl.forEach(s => q.push(`skills[]=${s}`));
            if(term) {
                q.push(`term=${term}`)
            }
            if(page) {
                q.push(`page=${page}`)
            }
            r += '?' + q.join('&');
            this.$store.dispatch('freelancer/searchFreelancer', r)
        },
        watchQuery: true
    }
</script>
