<template>
  <SubNav :selector="selector" class="therapist-main"  :links="links" :title="title" sub-class="reduced">
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
        { to: 'pediatrics', title: 'Pédiatrie' },
        { to: 'mental', title: 'Santé mentale' },
        { to: 'physical', title: 'Médecine physique' }
      ],
      sharedStore: this.$store.state,
      updated: false
    }
  },
  asyncComputed: {
    selector () {
      if (this.updated && this.sharedStore.selector.routeName === 'therapist') {
        if (this.sharedStore.selector.hash !== null) {
          this.$vuetify.goTo(this.sharedStore.selector.hash, this.sharedStore.selector.options(this.sharedStore.windowSize.x)).then(() => {
            this.$store.setHashSelector(null)
          })
        }
      }
    }
  },
  updated () {
    this.updated = true
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
