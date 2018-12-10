<template>
    <div class="group-main">
      <div class="group-desc">
        Les ergothérapeutes travaillent dans des institutions du secteur public, dans le secteur subventionné, mais également dans le privé.
        Selon l'organisation des services auxquels ils sont rattachés, les ergothérapeutes ont donc à faire à des populations très diversifiées.
      </div>
      <div class="group-list">
        <div class="group-public">
          <h1 class="headline group-h1">Secteur public et semi-public (subventionné)</h1>
          <ul>
            <li>Hôpitaux Universitaires de Genève</li>
            <li>Institutions spécialisées</li>
            <li>Fondation des Services d'Aides et de Soins à Domicile (FSASD)</li>
            <li>Etablissements médico-sociaux (EMS)</li>
            <li>Certains services spécialisés</li>
          </ul>
        </div>
        <div class="group-private">
          <h1 class="headline group-h1">Secteur privé</h1>
          Les ergothérapeutes qui s'installent à leur compte développent en principe une pratique indépendante dans l'un des domaines de l'ergothérapie en particulier (par exemple : la pédiatrie, la psychiatrie, la gériatrie ou encore la médecine physique...).
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Group'
}
</script>

<style scoped>
  .group-main {
    display: flex;
    text-align: center;
    padding: 50px 24px 50px 24px;
    flex-direction: column;
  }

  .group-desc {
    margin-bottom: 20px;
  }

  .group-list {
    display: flex;
  }

  .group-public {
    flex: 2;
    text-align: left;
  }

  .group-private {
    flex: 1;
    text-align: left;
  }

  .group-h1 {
    margin-bottom: 10px;
  }

</style>
