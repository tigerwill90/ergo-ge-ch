<template>
  <div class="filter-container">
    <div class="categories-selector">
      <v-select @change="selected"
              :items="categories"
              label="Spécialités"
              item-text="name"
              item-value="name"
              flat
              chips
              multiple
              deletable-chips
              single-line
              attach
              small-chips
      ></v-select>
    </div>
    <v-menu bottom origin="center center" transition="scale-transition" offset-y>
      <v-btn flat icon color="blue" slot="activator">
        <v-icon>sort_by_alpha</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="({ name, key }, i) in sortables" :key="i" @click="sort(key)">
          <v-list-tile-title>{{name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'OfficesFilter',
  data() {
    return {
      sortables: [
        { name: 'Nom', key: 'name' },
        { name: 'Ville', key: 'city' },
        { name: 'Quartier', key: 'district' },
        { name: 'Code postal', key: 'npa' }
      ],
      categories: []
    }
  },
  methods: {
    sort(officeKey) {
      this.$emit('sort-office', officeKey)
    },
    selected(categories) {
      this.$emit('filter-categories', categories)
    }
  },
  mounted() {
    this.$http.get(`${process.env.VUE_APP_API_URL}/categories`)
      .then(response => {
        this.categories = response.data.data
      })
      .catch(error => {
        let data = null
        if (error.response !== undefined) {
          data = error.response.data
        }
        this.$store.commit('addNotification', {
          active: true,
          type: 'error',
          logs: data,
          userMessage: 'Impossible de télécharger la liste des spécialités'
        })
      })
  }
}
</script>

<style scoped>
.filter-container {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px 0 10px;
}

.categories-selector {
  min-width: 300px;
  max-width: 700px;
  display: flex;
  align-items: center;
}

.selector {
  margin: 0;
}
</style>
