<template>
  <div class="filter-container">
    <div class="categories-selector">
      <v-select
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
        @change="selected"
      />
    </div>
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
      offset-y
    >
      <v-btn
        slot="activator"
        flat
        icon
        color="blue"
      >
        <v-icon>sort_by_alpha</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="({ name, key }, i) in sortables"
          :key="i"
          @click="sort(key)"
        >
          <v-list-tile-title>{{ name }}</v-list-tile-title>
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
        { name: 'Code postal', key: 'npa' },
        { name: 'Case postal', key: 'cp' }
      ],
      categories: []
    }
  },
  mounted() {
    this.$http.get(`${process.env.VUE_APP_API_URL}/categories`)
      .then(response => {
        this.categories = response.data.data
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
      })
  },
  methods: {
    sort(officeKey) {
      this.$emit('sort-office', officeKey)
    },
    selected(selectedCategories) {
      this.$emit('filter-categories', selectedCategories)
    }
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

@media screen and (max-width: 450px){
  .categories-selector {
    min-width: 200px;
    max-width: 700px;
    display: flex;
    align-items: center;
  }
}
</style>
