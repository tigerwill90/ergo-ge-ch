<template>
  <FlexContainer
    align-items="stretch"
    background-color="#202124"
    class="council-main"
    padding-top="150px"
    padding-bottom="150px"
    padding-left="50px"
    padding-right="50px"
  >
    <div class="council-desc">
      <div class="app-section-title title-1 cWhite">
        Les membres du comité
      </div>
      <p class="subheading cWhite">
        Le comité de la section est élu par l’Assemblée Générale. Tous les membres de la section peuvent se présenter à
        cette élection. Idéalement, le comité de la section est composé d’au
        <strong>moins 5 membres</strong>, qui se répartissent les secteurs de l’ergothérapie et le suivi des dossiers
        selon leurs propres domaines de pratique. Le comité de la section s’occupe des affaires courantes de la vie de
        la section et assure, quand c’est nécessaire,
        <strong>le lien entre le comité central de l’ASE et les membres genevois</strong>. Le comité de la section est
        également l’interlocuteur des instances cantonales pour les questions qui concernent l’ergothérapie.
      </p>
      <div class="council-desc-img">
        <v-img :src="img" aspect-ratio="3" content> </v-img>
      </div>
    </div>
    <div class="council-card">
      <v-card v-for="(council, i) in councils" :key="i" class="card" :class="{ 'no-margin': i < councils.length - 1 }">
        <div class="council-card-title">
          <div class="subheading">{{ council.name }}</div>
        </div>
        <div class="council-card-icon">
          <v-avatar :tile="false" size="70px" color="grey lighten-4" style="margin-right: 5px">
            <img :src="council.imageUrl" alt="avatar" />
          </v-avatar>
        </div>
      </v-card>
    </div>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Council',
  data() {
    return {
      councils: [
        { name: 'Alison Borda', imageUrl: `${process.env.VUE_APP_API_URL}/images/ironman` },
        { name: 'Myriam Fonjallaz', imageUrl: `${process.env.VUE_APP_API_URL}/images/hulk` },
        { name: 'Séverine Fries', imageUrl: `${process.env.VUE_APP_API_URL}/images/thor` },
        { name: 'Sandra Pereira', imageUrl: `${process.env.VUE_APP_API_URL}/images/blackwidow` }
      ],
      img: `${process.env.VUE_APP_API_URL}/images/avengers`
    }
  }
}
</script>

<style scoped>
.council-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 50px 30px 50px 30px;
  flex: 1;
  width: 100%;
  border-radius: 25px;
}

.council-desc {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px 0 0;
  flex: 1;
}

.council-desc-img {
  width: 100%;
}

.card {
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 100px;
  background-color: #4db6ac;
  color: white;
}

.card.no-margin {
  margin-bottom: 15px;
}

.council-card-title {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 20px;
  flex: 3;
}

.council-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.cWhite {
  color: white;
}

@media screen and (max-width: 1000px) {
  .council-main {
    align-items: center;
    flex-direction: column;
  }

  .council-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    border-radius: 25px;
  }

  .council-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0 30px 0;
    flex: 1;
  }
}

@media screen and (max-width: 500px) {
  .council-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    padding: 0;
    background: none;
  }

  .council-desc-img {
    display: none;
  }
}
</style>
