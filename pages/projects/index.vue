<template>
<div class="container">
  <Head>
    <h1 slot="nameHead" class="ka-font ">پروژه ها</h1>
  </Head>
  <Filters @filter="filterProjects"/>
  <div class="mt-10 mb-5 flex items-center">
    <div>
      <img src="/images/art2.png"/>
    </div>
    <div class="mr-5 text-xl text-black ir-bold">لیست پروژه ها</div>
  </div>
  <ProjectsDescriptions  :laravel-data="projects" @paginate="paginate"/>
</div>
</template>
<script>
    import Filters from "../../components/client/Filters";
    import ProjectsDescriptions from "../../components/client/projects/ProjectsDescriptions";
    import Head from "../../components/client/home/Head";
    export default {
        name: "index",
        layout:'defaultDash',
      head(){
        return {
          title: 'لیست پروژه ها'
        }
      },
        middleware:'auth',
        components: {Head, ProjectsDescriptions, Filters},
        async asyncData(context) {
            let skills = context.route.query.skills;
            let term = context.route.query.term;
            let min = context.route.query.min;
            let max = context.route.query.max;
            let page = context.route.query.page;
            let r = '/search/project';
            let sl = skills || [];
            if(typeof sl == 'string') {
              sl = [sl]
            }
            let q = [];
            sl.forEach(s => q.push(`skills[]=${s}`));
            if(term) {
                q.push(`term=${term}`)
            }
            if(min) {
                q.push(`min=${min}`)
            }
            if(max) {
                q.push(`max=${max}`)
            }
            if(page) {
                q.push(`page=${page}`)
            }
            r += '?' + q.join('&');
            await context.store.dispatch('project/searchProjects', r)
        },
        methods: {
            filterProjects(skills, term, min, max) {
                let r = '/projects';
                let q = [];
                let sl = skills;
                let page = this.$route.query.page;
                if(page > 1) page = 1;
                if(sl) {
                    q.push(`skills=${sl}`)
                }
                if(term) {
                    q.push(`term=${term}`)
                }
                if(min) {
                    q.push(`min=${min}`)
                }
                if(max) {
                    q.push(`max=${max}`)
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
                let min = this.$route.query.min;
                let max = this.$route.query.max;
                let r = '/projects';
                let sl = skills || [];
                if(typeof sl == 'string') {
                  sl = [sl]
                }
                let q = [];
                sl.forEach(s => q.push(`skills[]=${s}`));
                if(term) {
                    q.push(`term=${term}`)
                }
                if(min) {
                    q.push(`min=${min}`)
                }
                if(max) {
                    q.push(`max=${max}`)
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
            let min = this.$route.query.min;
            let max = this.$route.query.max;
            let page = this.$route.query.page;
            let r = '/search/project';
            let sl = skills || [];
            if(typeof sl == 'string') {
              sl = [sl]
            }
            let q = [];
            sl.forEach(s => q.push(`skills[]=${s}`));
            if(term) {
                q.push(`term=${term}`)
            }
            if(min) {
                q.push(`min=${min}`)
            }
            if(max) {
                q.push(`max=${max}`)
            }
            if(page) {
                q.push(`page=${page}`)
            }
            r += '?' + q.join('&');
            this.$store.dispatch('project/searchProjects', r)
        },
        computed:{
            projects(){
                return this.$store.getters['project/getSearchProjectList']
            },
            getOwnProject(){
                return this.$store.getters['project/getOwnProject']
            }
        },
        watchQuery: true,
    }
</script>
