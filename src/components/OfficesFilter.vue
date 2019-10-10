<template>
  <div class="filter-container">
    <div
      v-show="therapistsCount > 0 || officesCount > 0"
      class="search-match-counter caption font-weight-medium"
    >
      <span>Ergothérapeutes : {{ therapistsCount }}</span>
      <span>Cabinets : {{ officesCount }}</span>
    </div>
    <span
      v-show="(therapistsCount <= 0 && officesCount <= 0) && searchBar && select"
      class="caption font-weight-medium no-match"
    >
      Aucun résultat
    </span>
    <v-spacer />
    <div
      v-show="!searchBar"
      class="categories-selector"
    >
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
      v-show="!searchBar"
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
    <v-text-field
      v-show="searchBar"
      v-model="select"
      clearable
      autofocus
      flat
      :loading="loading"
      placeholder="Trouver un ergothérapeute"
      @input="search"
    />
    <v-btn
      icon
      flat
      class="search-btn"
      @click="showSearchBar"
    >
      <v-icon color="blue">
        search
      </v-icon>
    </v-btn>
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
      select: null,
      categories: [],
      loading: false,
      searchBar: false,
      therapistsCount: 0,
      officesCount: 0
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
    },
    showSearchBar() {
      this.searchBar = !this.searchBar
    },
    search(item) {
      if (item && item.length >= 3) {
        this.loading = true
        Promise.allSettled([this.searchOffices(item), this.searchTherapist(item)])
          .then(([resolvedOffices, resolvedTherapists]) => {
            this.loading = false
            const offices = resolvedOffices.value ? resolvedOffices.value.data.data : []
            const therapists = resolvedTherapists.value ? resolvedTherapists.value.data.data : []
            this.officesCount = offices.length
            this.therapistsCount = therapists.length
            this.$emit('search', offices.map(office => office.id), therapists.map(therapist => therapist.office_id))
          })
      } else {
        this.officesCount = 0
        this.therapistsCount = 0
        this.$emit('search', [], [])
      }
    },
    searchOffices(item) {
      return this.$http.get(`${process.env.VUE_APP_API_URL}/offices?search=${item}`)
    },
    searchTherapist(item) {
      return this.$http.get(`${process.env.VUE_APP_API_URL}/therapists?search=${item}`)
    },
    arrayUnique(array) {
      const a = array.concat()
      for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) { a.splice(j--, 1) }
        }
      }

      return a
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

.search-btn {
  margin: 0;
  padding: 0;
}

.search-match-counter {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  justify-content: center;
  color: #424242;
}

.no-match {
  color: red;
  margin-right: 15px;
}

@media screen and (max-width: 500px){
  .search-match-counter {
    display: none;
  }
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
