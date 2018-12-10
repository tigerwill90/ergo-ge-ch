<template>
    <div class="card-main-content">
      <v-card>
        <div class="card-main">
          <div class="card-container-img">
            <img src="../assets/img/geneva.svg.png" class="card-img" alt="geneva">
          </div>
          <div class="card-desc">
            La section genevoise de l’ASE est composée de tous les ergothérapeutes membres de l’ASE qui sont domiciliés à Genève ou qui en font la demande par écrit au secrétariat central de l’Association
          </div>
        </div>
      </v-card>
    </div>
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
    justify-content: center;
    height: auto;
  }

  .card-container-img {
    display: block;
    flex: 1;
  }

  .card-img {
    display: inline-block;
    vertical-align: middle;
    width: 40%;
  }

  .card-desc {
    flex: 2;
  }

  .card-main-content {
    padding: 50px 24px 50px 24px;
  }
</style>
