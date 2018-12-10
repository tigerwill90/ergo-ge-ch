<template>
  <div class="conseil-main">
    <div class="conseil-desc">
      <p style="margin: 0">
        Le comité de la section est élu par l’Assemblée Générale. Tous les membres de la section peuvent se présenter à cette élection. Idéalement, le comité de la section est composé d’au moins 5 membres, qui se répartissent les secteurs de l’ergothérapie et le suivi des dossiers selon leurs propres domaines de pratique. Le comité de la section s’occupe des affaires courantes de la vie de la section et assure, quand c’est nécessaire, le lien entre le comité central de l’ASE et les membres genevois. Le comité de la section est également l’interlocuteur des instances cantonales pour les questions qui concernent l’ergothérapie.
      </p>
    </div>
    <div class="conseil-card">
      <v-card v-for="conseil in conseils" :key="conseil.id" class="card">
        <div class="conseil-card-title">
          <div class="subheading">{{conseil.name}}</div>
          <div class="body-2">{{conseil.title}}</div>
        </div>
        <div class="conseil-card-icon">
          <v-avatar
            :tile="false"
            size="56px"
            color="grey lighten-4"
          >
            <img src="https://picsum.photos/510/300?random" alt="avatar">
          </v-avatar>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Conseil',
  data () {
    return {
      conseils: [
        { id: 0, name: 'Stéphanie Muller', title: 'Présidente' },
        { id: 1, name: 'Myriam Fonjallaz', title: 'Trésorière' },
        { id: 2, name: 'Sandra Pereira', title: 'Secrétaire' },
        { id: 3, name: 'Alison Borda', title: 'Membre' }
      ]
    }
  }
}
</script>

<style scoped>
  .conseil-main {
    display: flex;
    background-color: #f0f8ff;
    padding: 50px 24px 50px 24px;
    height: auto;
  }

  .conseil-card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
  }

  .conseil-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20px;
    flex: 1;
  }

  .card {
    display: flex;
    justify-content: left;
    align-items: center;
    min-height: 100px;
    margin-bottom: 10px;
  }

  .conseil-card-title {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-left: 10px;
    flex: 3;
  }

  .conseil-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
</style>
