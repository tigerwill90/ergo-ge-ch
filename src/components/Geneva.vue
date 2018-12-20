<template>
  <FlexContainer>
    <v-card v-if="!$vuetify.breakpoint.xs" class="card-main">
      <div class="card-container-img">
        <img src="../assets/img/geneva.svg" class="card-img" alt="geneva" />
      </div>
      <div class="card-desc">
        <strong style="color: teal">La section genevoise de l’ASE</strong> est composée de tous les ergothérapeutes membres de l’ASE qui sont domiciliés à Genève ou qui en font la demande par écrit au secrétariat central de l’Association
      </div>
    </v-card>
    <div v-else class="section">
      <p>
        La section genevoise de l’ASE est composée de tous les ergothérapeutes membres de l’ASE qui sont domiciliés à Genève ou qui en font la demande par écrit au secrétariat central de l’Association
      </p>
      <div class="card-container-img">
        <img src="../assets/img/geneva.svg" class="card-img" alt="geneva">
      </div>
    </div>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Geneva'
}
</script>

<style scoped>
  .card-main {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
  }

  .card-container-img {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .card-img {
    height: 200px;
    min-height: 200px;
    width: auto;
  }

  .card-desc {
    padding: 0 10px 0 30px;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
