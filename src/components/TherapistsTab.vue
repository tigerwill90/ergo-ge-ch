<template>
  <v-tabs>
    <v-tabs-slider color="teal"></v-tabs-slider>
    <v-tab v-for="(therapist, i) in therapists" :key="i"> {{ therapist.title }} {{ therapist.lastname }} </v-tab>
    <v-tabs-items>
      <v-tab-item v-for="(therapist, i) in therapists" :key="i">
        <div class="therapist-content">
          <span class="subheading">{{ therapist.title }} {{ therapist.firstname }} {{ therapist.lastname }}</span>
          <div class="mid-section">
            <div class="contact-section">
              <span class="subheading">Contact</span>
              <div class="therapist-contact" v-if="therapist.emails.length > 0">
                <v-icon class="icon">email</v-icon>
                <div class="list">
                  <span v-for="(email, j) in therapist.emails" :key="j" class="subheading">{{ email }}</span>
                </div>
              </div>
              <div class="therapist-contact" v-if="therapist.phones.length > 0">
                <v-icon class="icon">contact_phone</v-icon>
                <div class="list">
                  <span v-for="(phone, j) in therapist.phones" :key="j" class="subheading"
                    >{{ phone.type }} {{ phone.number }}</span
                  >
                </div>
              </div>
            </div>
            <div class="categories-section" v-if="therapist.categories.length > 0">
              <v-icon class="icon">category</v-icon>
              <div class="list">
                <span v-for="(category, j) in therapist.categories" :key="j" class="subheading">{{
                  category.name
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>
<script>
export default {
  name: 'TherapistsTab',
  data() {
    return {
      therapists: []
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.$http
      .get(`${process.env.VUE_APP_API_URL}/offices/${this.id}/therapists`)
      .then(response => {
        this.therapists = response.data.data
        console.log(this.therapists)
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
          userMessage: 'Impossible de télécharger la liste des ergothérapeutes du cabinet'
        })
      })
  }
}
</script>

<style scoped>
.therapist-content {
  margin: 20px 15px 15px 15px;
  display: flex;
  flex-direction: column;
}

.mid-section {
  margin-top: 10px;
  display: flex;
}

.contact-section {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.categories-section {
  display: flex;
  flex: 1;
}

.therapist-contact {
  display: flex;
  flex: 1;
}

.icon {
  font-size: 45px;
  margin-right: 10px;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
