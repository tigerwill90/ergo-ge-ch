/*
 * File: TherapistsTab.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 27th February 2019
 * Last Modified: 2nd May 2019
 */
<template>
  <article class="therapists-box">
    <span class="title therapists-title">
      <span v-if="therapists.length > 1">Membres du cabinet</span>
      <span v-else>Membre du cabinet</span>
    </span>
    <v-tabs
      show-arrows
      :color="tabHeaderColor"
      :style="{
        margin: margin
      }"
    >
      <v-tabs-slider color="teal" />
      <v-tab
        v-for="(therapist, i) in therapists"
        :key="i"
        class="text-none"
      >
        {{ therapist.title }} {{ therapist.lastname }}
      </v-tab>
      <v-tabs-items>
        <v-tab-item
          v-for="(therapist, i) in therapists"
          :key="i"
        >
          <div class="therapist-content">
            <div class="therapist-title">
              <div class="therapist-title-name">
                <v-icon class="icon">
                  person
                </v-icon>
                <span class="app-section-subtitle title-1 font-600 no-margin">{{ therapist.title }} {{ therapist.firstname }} {{ therapist.lastname }}</span>
              </div>
              <div class="therapist-title-home">
                <template v-if="therapist.home">
                  <v-icon
                    class="icon"
                    color="green"
                  >
                    check_box
                  </v-icon>
                  <span>Consultation à domicile</span>
                </template>
                <template v-else>
                  <v-icon
                    class="icon"
                    color="red"
                  >
                    indeterminate_check_box
                  </v-icon>
                  <span>Pas de consultation à domicile</span>
                </template>
              </div>
            </div>
            <div class="mid-section">
              <div
                v-if="therapist.phones.length > 0 || therapist.emails.length > 0"
                class="contact-section"
              >
                <span class="app-section-subtitle title-1 font-600 cBlack no-margin">Contactez moi</span>
                <div
                  v-if="therapist.emails.length > 0"
                  class="therapist-mail"
                >
                  <v-icon
                    class="icon size-45"
                    color="blue"
                  >
                    email
                  </v-icon>
                  <div class="list">
                    <span
                      v-for="(email, j) in therapist.emails"
                      :key="j"
                      class="subheading"
                      style="word-break: break-all;"
                    >{{ email }}</span>
                  </div>
                </div>
                <div
                  v-if="therapist.phones.length > 0"
                  class="therapist-phone"
                >
                  <v-icon
                    class="icon size-45"
                    color="orange"
                  >
                    contact_phone
                  </v-icon>
                  <div class="list">
                    <span
                      v-for="(phone, j) in therapist.phones"
                      :key="j"
                      class="subheading"
                    >{{ phone.type }} {{ phone.number }}</span>
                  </div>
                </div>
              </div>
              <div
                v-if="therapist.categories.length > 0"
                class="categories-section"
              >
                <div class="contact-title">
                  <v-icon class="icon">
                    category
                  </v-icon>
                  <span class="app-section-subtitle title-1 font-600 cBlack no-margin">Spécialisation</span>
                </div>
                <div class="therapist-categories">
                  <div class="category-list">
                    <ul
                      v-for="(category, j) in therapist.categories"
                      :key="j"
                      style="border-color: teal;"
                    >
                      <li>{{ category.name }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </article>
</template>
<script>
export default {
  name: 'TherapistsTab',
  props: {
    id: {
      type: Number,
      required: true
    },
    tabHeaderColor: {
      type: String,
      default: 'none'
    },
    margin: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      therapists: []
    }
  },
  mounted() {
    this.$http
      .get(`${process.env.VUE_APP_API_URL}/offices/${this.id}/therapists`)
      .then(response => {
        this.therapists = response.data.data
      })
      .catch(error => {
        throw new Error(error.message)
      })
  }
}
</script>
<style scoped>

.therapists-box {
  display: flex;
  flex-direction: column;
}

.therapists-title {
  margin: 20px 10px 10px 24px;
}

.therapist-content {
  margin: 20px 15px 15px 15px;
  display: flex;
  flex-direction: column;
}

.therapist-title {
  display: flex;
  flex-direction: column;
}

.therapist-title-name {
  display: flex;
  align-items: center;
}

.therapist-title-home {
  display: flex;
  margin: 5px 0 5px 0;
  align-items: center;
}

.mid-section {
  margin-top: 10px;
  display: flex;
}

.contact-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 15px;
}

.categories-section {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.therapist-categories {
  display: flex;
  flex: 1;
}

.contact-title {
  display: flex;
  margin-bottom: 1em;
}

.therapist-phone {
  display: flex;
  margin-top: 10px;
  flex: 1;
}

.therapist-mail {
  display: flex;
  flex: 1;
}

.icon {
  margin-right: 10px;
}

.icon.size-45 {
  font-size: 45px;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media screen and (max-width: 515px) {
  .mid-section {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }
  .categories-section {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 10px;
  }
}
</style>
