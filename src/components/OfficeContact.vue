/*
 * File: OfficeContact.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 29th March 2019
 * Last Modified: 2nd May 2019
 */
<template>
  <div
    class="contacts-box"
    :style="{
      margin: margin
    }"
  >
    <span class="title contacts-title">
      <span v-if="contacts.length > 1">Adresses et contacts</span>
      <span v-else>Adresse et contact</span>
    </span>
    <div
      v-for="(contact, i) in contacts"
      :key="i"
      class="contact"
      :class="{divider: i < contacts.length - 1}"
    >
      <div
        class="address-wrapper"
        :class="{column: smallSize}"
      >
        <v-icon
          class="icon"
          large
        >
          location_city
        </v-icon>
        <div
          class="address"
        >
          <span class="subheading"><strong>Rue :</strong> {{ contact.street }}</span>
          <span class="subheading"><strong>Ville :</strong> {{ contact.npa }} {{ contact.city }}</span>
          <span class="subheading"><strong>C.p. :</strong> {{ contact.cp }} </span>
        </div>
      </div>
      <div class="phone-wrapper">
        <v-icon
          v-if="contact.phone || contact.fax"
          class="icon"
          large
        >
          contact_phone
        </v-icon>
        <div class="phone">
          <span
            v-if="contact.phone"
            class="subheading"
          ><strong>Tél :</strong>
            <a :href="'tel:'+ contact.phone"> {{ contact.phone }}</a>
          </span>
          <span
            v-if="contact.fax"
            class="subheading"
          ><strong>Fax :</strong>
            <a :href="'tel:'+ contact.fax"> {{ contact.fax }}</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OfficeContact',
  props: {
    contacts: {
      type: Array,
      required: true
    },
    margin: {
      type: String,
      default: '0 24px 15px 24px'
    }
  },
  data() {
    return {
      smallSize: false
    }
  },
  mounted() {
    if (this.$store.getters.windowSize.x < 650) {
      this.smallSize = true
    } else {
      this.smallSize = false
    }
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'windowSize') {
        if (state.windowSize.x < 650) {
          this.smallSize = true
        } else {
          this.smallSize = false
        }
      }
    })
  }
}
</script>
<style scoped>

  .contacts-title {
    margin: 20px 10px 10px 0;
  }

  .contacts-box {
    display: flex;
    flex-direction: column;
  }

  .contact {
    display: flex;
    padding: 10px 0 10px 0;
    align-items: center;
  }

  .contact.divider {
    border-bottom: 1px solid rgba(0,0,0,.12);
  }

  .address-wrapper {
    display: flex;
    flex: 1.5;
  }

  .phone-wrapper {
    display: flex;
    flex: 1;
  }

  .address {
    display: flex;
    flex-direction: column;
  }

  .address-wrapper.column {
    margin-bottom: 15px;
  }

  .phone {
    display: flex;
    flex-direction: column;
  }

  .icon {
    margin-right: 10px;
  }

  @media screen and (max-width: 650px) {
    .contact {
      display: flex;
      padding: 10px 0 10px 0;
      align-items: stretch;
      flex-direction: column;
    }
  }
</style>
