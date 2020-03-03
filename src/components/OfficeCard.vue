<template>
  <v-card
    v-if="showCardForCategories || showCardForOffices || showCardForTherapists"
    id="office-card"
    class="office-card"
    elevation="5"
    @click.native="openDialog"
  >
    <div
      v-if="$store.getters.windowSize.x > 775 && office.categories"
      class="office-card-title"
    >
      <span
        class="subtitle-1"
      >{{ office.categories.map(cat => cat.name).join(', ') }}</span>
    </div>
    <div
      v-if="$store.getters.windowSize.x <= 775 && office.categories"
      class="office-small-categories"
    >
      <span
        class="subtitle-1"
      >{{ office.categories.map(cat => cat.name).join(', ') }}</span>
    </div>
    <div class="office-content">
      <div
        class="office-title"
      >
        <span
          class="title"
          style="word-break: break-word;"
        >
          {{ office.name }}
        </span>
        <span
          v-if="office.email"
          class="subtitle-1"
          style="word-break: break-all;"
        >
          <a :href="'mailto:' + office.email">{{ office.email }}</a>
        </span>
        <span
          v-if="office.web"
          class="subtitle-1"
          style="word-break: break-all;"
        >
          <a :href="webUrl()">{{ office.web }}</a>
        </span>
      </div>
      <div
        v-if="$vuetify.breakpoint.mdAndUp"
        class="office-bloc"
      >
        <v-icon class="icon">
          location_city
        </v-icon>
        <div class="list subtitle-1">
          <span
            v-for="(contact, i) in office.contacts"
            :key="i"
          >{{ contact.street }}, {{ contact.npa }} {{ contact.city }}</span>
        </div>
      </div>
    </div>
    <v-expansion-panels
      v-if="$vuetify.breakpoint.mdAndUp"
      flat
    >
      <v-expansion-panel>
        <v-expansion-panel-header class="expansion-panel-title">
          Plus de détails
        </v-expansion-panel-header>
        <v-expansion-panel-content class="panel-box">
          <OfficeContact :contacts="office.contacts" />
          <TherapistTab :id="office.id" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog
      v-else
      v-model="dialog"
      fullscreen
      hide-overlay
      class="dialog"
    >
      <article class="dialog-content">
        <div class="teal lighten-2 toolbar">
          <div class="title toolbar-title">
            {{ office.name }}
          </div>
          <v-btn
            text
            color="white"
            icon
            @click="openDialog"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <OfficeContact
          :contacts="office.contacts"
          margin="15px 24px 15px 24px"
        />
        <TherapistTab
          :id="office.id"
          tab-header-color="black"
          margin="0 15px 10px 15px"
        />
      </article>
    </v-dialog>
  </v-card>
</template>

<script>
import TherapistTab from './TherapistsTab'
import OfficeContact from './OfficeContact'
export default {
  name: 'OfficeCard',
  components: {
    TherapistTab,
    OfficeContact
  },
  props: {
    office: {
      type: Object,
      required: true
    },
    selectedCategories: {
      type: Array,
      required: true
    },
    searchedOfficesId: {
      type: Array,
      required: true
    },
    searchedTherapistsOfficeId: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      flatCategories: '',
      dialog: false
    }
  },
  computed: {
    /**
     * Foreach categories, return directly true if match with one of the selected categories
     */
    showCardForCategories() {
      if ((this.selectedCategories.length <= 0 && this.searchedOfficesId.length <= 0 && this.searchedTherapistsOfficeId <= 0) || this.office.categories === undefined) return true
      return this.office.categories.some(cat => this.selectedCategories.find(el => cat.name === el))
    },
    showCardForOffices() {
      if ((this.searchedOfficesId.length <= 0 && this.selectedCategories.length <= 0 && this.searchedTherapistsOfficeId <= 0) || this.office.categories === undefined) return true
      return this.searchedOfficesId.some(id => this.office.id === id)
    },
    showCardForTherapists() {
      if ((this.searchedOfficesId.length <= 0 && this.selectedCategories.length <= 0 && this.searchedTherapistsOfficeId <= 0) || this.office.categories === undefined) return true
      return this.searchedTherapistsOfficeId.some(id => this.office.id === id)
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'windowSize' && state.windowSize.x >= 960) {
        this.dialog = false
      }
    })
  },
  methods: {
    openDialog() {
      if (this.$store.getters.windowSize.x < 960) {
        this.dialog = !this.dialog
      }
    },
    webUrl() {
      if (!/^(http|https):\/\//.test(this.office.web)) {
        return 'http://' + this.office.web
      }
      return this.office.web
    }
  }
}
</script>

<style scoped>
.office-card {
  width: 100%;
  margin-top: 30px;
  position: relative;
}

.office-card-title {
  display: flex;
  align-items: center;
  background-color: #424242;
  position: absolute;
  min-width: 200px;
  max-width: 90%;
  padding: 3px 20px 3px 20px;
  color: white;
  top: -15px;
  left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.office-content {
  display: flex;
  padding: 35px 10px 20px 15px;
  width: 100%;
  height: 100%;
  flex: 2;
}

.office-small-categories {
  display: flex;
  background-color: #424242;
  padding: 3px 20px 3px 20px;
  color: white;
}

.office-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.office-bloc {
  display: flex;
  flex: 1;
}

.icon {
  margin-right: 10px;
  font-size: 60px;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.expansion-panel-title {
  font-weight: 600;
  font-size: 1.2em;
  color: #424242;
}

.panel-box {
  display: flex;
  flex-direction: column;
}

.dialog {
  position: absolute;
  z-index: 3000;
}

.dialog-content {
  background-color: #fafafa;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 65px;
}

.toolbar {
  height: 64px;
  background-color: teal;
  display: flex;
  align-items: center;
  padding: 0 5px 0 10px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 0 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
}

.toolbar-title {
  color: white;
  flex: 1;
}
@media screen and (max-width: 960px) {
  .office-card {
    width: 100%;
    margin-top: 30px;
    position: relative;
    cursor: pointer;
  }
}

@media screen and (max-width: 775px) {
  .office-content {
    display: flex;
    padding: 25px 10px 25px 15px;
    width: 100%;
    height: 100%;
  }
}
</style>
