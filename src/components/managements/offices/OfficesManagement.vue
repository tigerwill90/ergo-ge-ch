<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
    padding-bottom="50px"
  >
    <article
      class="article-content"
    >
      <span class="app-section-title title-1">Gestion des cabinets</span>
      <div class="offices-panel">
        <OfficeForm
          :office="office"
          :update-mode="updateMode"
          @create-office="create"
          @update-office="update"
          @reset="reset"
        />
        <OfficesList
          :offices="offices"
          @prepare-update="prepareUpdate"
          @remove-office="remove"
        />
      </div>
    </article>
  </FlexContainer>
</template>
<script>
import FlexContainer from '../../FlexContainer'
import OfficeForm from './OfficeForm'
import OfficesList from './OfficesList'
import admin from '../../../mixins/admin'
export default {
  name: 'OfficesManagement',
  components: {
    FlexContainer,
    OfficeForm,
    OfficesList
  },
  mixins: [admin()],
  props: {
    offices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      office: {
        name: '',
        email: '',
        contacts: [
          {
            city: '',
            cp: '',
            fax: '',
            npa: '',
            phone: '',
            street: ''
          }
        ]
      },
      updateMode: !this.isAdmin()
    }
  },
  methods: {
    prepareUpdate(office) {
      this.office = JSON.parse(JSON.stringify(office))
      this.updateMode = true
      this.goTo('officeForm')
    },
    create(office) {
      this.$emit('create-office', office)
    },
    update(office) {
      this.$emit('update-office', office)
    },
    remove(id) {
      this.$emit('remove-office', id)
    },
    reset(mode) {
      this.updateMode = mode
      this.goTo('offices')
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

  .offices-panel {
    display: flex;
    flex: 1;
  }

  @media screen and (max-width: 1280px) {
    .offices-panel {
      display: flex;
      flex-direction: column-reverse;
      flex: 1;
    }
  }

</style>
