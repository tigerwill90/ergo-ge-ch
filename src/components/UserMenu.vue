<template>
  <v-menu
    v-if="$store.getters.authorization"
    v-model="menu"
    bottom
    left
    offset-y
    :close-on-content-click="false"
    attach="#toolbar"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-avatar
          :tile="false"
          size="35px"
          color="grey lighten-4"
        >
          <img
            :src="tempImgUrl"
            alt="avatar"
          >
        </v-avatar>
      </v-btn>
    </template>
    <v-card class="user-menu">
      <div class="user-box">
        <v-avatar
          :tile="false"
          size="70px"
          color="grey lighten-4"
          style="margin-right: 15px"
        >
          <img
            :src="tempImgUrl"
            alt="avatar"
          >
        </v-avatar>
        <div class="user-information">
          <span><strong>{{ $store.getters.user.first_name }} {{ $store.getters.user.last_name }}</strong></span>
          <span style="font-size: 1em">{{ $store.getters.user.email }}</span>
          <v-btn
            small
            class="text-none ma-1"
            color="primary"
            @click="goToManagement"
          >
            Gestion des données
          </v-btn>
        </div>
      </div>
      <v-divider />
      <div class="connect-box">
        <v-btn
          small
          class="text-none ma-1"
          @click="disconnect"
        >
          Déconnexion
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: 'UserMenu',
  data() {
    return {
      menu: false,
      tempImgUrl: `${process.env.VUE_APP_API_URL}/images/unknown`
    }
  },
  methods: {
    disconnect() {
      this.$http({
        method: 'PATCH',
        url: `${process.env.VUE_APP_API_URL}/users/${this.$store.getters.user.id}/disconnect`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(response => {
          this.$store.commit('notification', { status: response.status, message: `Au revoir ${this.$store.getters.user.first_name} ${this.$store.getters.user.last_name}` })
          this.$store.commit('user', null)
          this.$store.commit('authorization', null)
          this.menu = false
        })
        .catch(err => {
          this.$store.commit('notification', { status: err.response.status, message: 'Impossible de se déconnecter' })
        })
    },
    goToManagement() {
      this.$router.push({ name: 'management' }).catch(() => {})
      this.menu = false
    }
  }
}
</script>
<style scoped>
  .user-menu {
    display: flex;
    min-height: 150px;
    min-width: 250px;
    flex-direction: column;
  }
  .user-box {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 10px;
  }

  .user-information {
    display: flex;
    flex-direction: column;
  }

  .connect-box {
    min-height: 40px;
    display: flex;
    padding: 5px 10px 5px 10px;
    background-color: #f5f5f5;
    align-items: center;
    justify-content: flex-end;
  }
</style>
