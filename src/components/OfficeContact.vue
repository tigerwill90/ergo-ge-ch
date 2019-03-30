/*
 * File: OfficeContact.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 29th March 2019
 * Last Modified: 30th March 2019
 */
<template>
  <div class="contacts-box">
    <div
      v-for="(contact, i) in contacts"
      :key="i"
      class="contact"
    >
      <v-icon
        class="icon"
        large
      >
        location_city
      </v-icon>
      <div class="address">
        <span class="subheading"><strong>Rue :</strong> {{ contact.street }}</span>
        <span class="subheading"><strong>Ville :</strong> {{ contact.npa }} {{ contact.city }}</span>
        <span class="subheading"><strong>C.p. :</strong> {{ contact.cp }} </span>
      </div>
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
        ><strong>Tél :</strong> {{ contact.phone }} </span>
        <span
          v-if="contact.fax"
          class="subheading"
        ><strong>Fax :</strong> {{ contact.fax }}</span>
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
    }
  }
}
</script>
<style scoped>
  .contacts-box {
    display: flex;
    flex-direction: column;
    margin: 15px 24px 15px 24px;
  }

  .contact {
    display: flex;
    margin: 5px 0 5px 0;
    align-items: center;
  }

  .address {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .phone {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .icon {
    margin-right: 10px;
  }
</style>
