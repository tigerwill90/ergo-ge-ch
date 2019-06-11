<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
    padding-bottom="50px"
  >
    <article class="article-content">
      <span class="app-section-title title-1">Gestion des ergothérapeutes</span>
      <div class="therapist-panel">
        <TherapistForm
          :categories="categories"
          :therapist="therapist"
          :update-mode="updateMode"
          :offices="offices"
          @reset="reset"
          @add-email="addEmail"
          @add-phone="addPhone"
          @remove-email="removeEmail"
          @remove-phone="removePhone"
          @selected-categories="selectedCategories"
          @selected-office="selectedOffice"
          @create-therapist="createTherapist"
          @update-therapist="updateTherapist"
        />
        <TherapistsList
          :offices="offices"
          :therapists="therapists"
          @selected-therapists="selected"
          @remove-therapist="removeTherapist"
          @prepare-update="prepareUpdate"
          @current-office-list-selected="currentOfficeListSelected"
        />
      </div>
    </article>
  </FlexContainer>
</template>
<script>
import admin from '../../../mixins/admin'
import FlexContainer from '../../FlexContainer'
import TherapistForm from './TherapistForm'
import TherapistsList from './TherapistsList'
export default {
  name: 'TherapistsManagement',
  components: {
    FlexContainer,
    TherapistForm,
    TherapistsList
  },
  mixins: [admin()],
  props: {
    offices: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    therapists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      therapist: {
        first_name: '',
        last_name: '',
        title: '',
        home: false,
        phones: [
          {
            number: '',
            type: ''
          }
        ],
        emails: [''],
        categories: []
      },
      updateMode: false,
      currentOfficeSelected: null
    }
  },
  methods: {
    removeTherapist(id) {
      if (this.therapist.id === this.therapists[id].id) {
        this.reset(false)
      }
      this.$emit('remove-therapist', id)
    },
    selected(therapists) {
      this.$emit('selected-therapists', therapists)
    },
    reset(mode) {
      this.therapist.id = -1
      this.therapist.office_id = -1
      this.therapist.title = ''
      this.therapist.first_name = ''
      this.therapist.last_name = ''
      this.therapist.home = false
      this.therapist.emails = ['']
      this.therapist.categories = []
      this.therapist.phones = [{ type: '', number: '' }]
      this.updateMode = mode
      this.goTo('therapists')
    },
    addEmail() {
      this.therapist.emails.push('')
    },
    addPhone() {
      this.therapist.phones.push({ type: '', number: '' })
    },
    removeEmail(id) {
      this.therapist.emails.splice(id, 1)
    },
    removePhone(id) {
      this.therapist.phones.splice(id, 1)
    },
    selectedCategories(categories) {
      this.therapist.categories = categories
    },
    selectedOffice(office) {
      this.therapist.office_id = office.id
    },
    currentOfficeListSelected(office) {
      this.currentOfficeSelected = office
    },
    prepareUpdate(therapist) {
      this.therapist = JSON.parse(JSON.stringify(therapist))
      this.updateMode = true
      this.goTo('therapistForm')
    },
    createTherapist(therapist) {
      if (!this.currentOfficeSelected) {
        this.currentOfficeSelected = this.offices[0]
      }
      if (this.currentOfficeSelected.id === therapist.office_id) {
        this.$emit('create-therapist', therapist)
      }
    },
    updateTherapist(therapist) {
      if (!this.currentOfficeSelected) {
        this.currentOfficeSelected = this.offices[0]
      }

      if (this.currentOfficeSelected.id === therapist.office_id) {
        this.$emit('update-therapist', therapist)
      } else {
        const pos = this.therapists.map(therapist => therapist.id).indexOf(therapist.id)
        this.removeTherapist(pos)
      }
    },
    goTo(to) {
      this.$store.commit('selector', {
        hash: '#' + to,
        routeName: this.$router.currentRoute.name
      })
    }
  }
}
</script>
<style scoped>
  .article-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .therapist-panel {
    display: flex;
  }

  @media screen and (max-width: 1280px) {
    .therapist-panel {
      flex-direction: column-reverse;
      align-items: center;
    }
  }
</style>
