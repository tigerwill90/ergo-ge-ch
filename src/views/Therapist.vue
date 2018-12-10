<template>
  <SubNav class="therapist-main"  :links="links" :title="title" sub-class="content" @go-to="(target, options) => $vuetify.goTo(target, options)">
    <div class="therapist-content">
      <h1 :id="links[0].to" class="headline">{{links[0].title}}</h1>
      <TherapistCard domain="Pédiatrie" office="A 2 mains"/>
      <h1 :id="links[1].to" class="headline">{{links[1].title}}</h1>
      <TherapistCard domain="Santé mentale" office="Arcade84"/>
      <h1 :id="links[2].to" class="headline">{{links[2].title}}</h1>
      <TherapistCard domain="Médecine physique" office="Ergohelp"/>
    </div>
  </SubNav>
</template>

<script>
import SubNav from '../components/SubNav'
import TherapistCard from '../components/TherapistCard'
export default {
  name: 'Therapist',
  components: {
    SubNav,
    TherapistCard
  },
  data () {
    return {
      title: 'Les indépendants',
      links: [
        { id: 0, to: 'pediatrics', title: 'Pédiatrie' },
        { id: 1, to: 'mental', title: 'Santé mentale' },
        { id: 2, to: 'physical', title: 'Médecine physique' }
      ]
    }
  }
}
</script>

<style scoped>
  .therapist-main {
    background-color: #F5F5F5;
  }

  .therapist-content {
    padding: 24px;
  }
</style>
