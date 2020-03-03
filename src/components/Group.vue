<template>
  <FlexContainer
    column
    align-items="center"
    :background-color="background"
    :class="{'text-white': $store.getters.invertBrightness}"
  >
    <div
      class="app-section-title center"
      :class="{cDark: !$store.getters.invertBrightness}"
      :style="{'font-size': (1.9 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
    >
      Où travaillent les ergothérapeutes ?
    </div>
    <p
      class="group-desc text-center"
      :style="{'font-size': (1.4 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
    >
      Les ergothérapeutes travaillent dans des institutions
      <strong :class="{'text-teal': !$store.getters.invertBrightness}">du secteur public, dans le secteur subventionné, mais également dans le privé</strong>. Selon l'organisation des services auxquels ils sont rattachés, les ergothérapeutes ont donc à faire à des
      populations très diversifiées.
    </p>
    <div class="group-list">
      <div class="group-public">
        <h1
          class="app-section-title text-center"
          :style="{'font-size': (1.5 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
        >
          Secteur public et semi-public (subventionné)
        </h1>
        <ul
          class="group-ul"
          :class="{'ul-teal': !$store.getters.invertBrightness}"
          :style="{'font-size': (0.8 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
        >
          <li>Hôpitaux Universitaires de Genève</li>
          <li>Institutions spécialisées</li>
          <li>Institution genevoise de maintien à domicile (IMAD)</li>
          <li>Etablissements médico-sociaux (EMS)</li>
          <li>Certains services spécialisés</li>
        </ul>
      </div>
      <div class="group-private">
        <h1
          class="app-section-title text-center"
          :style="{'font-size': (1.5 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
        >
          Secteur privé
        </h1>
        <p
          class="paragraph"
          :style="{'font-size': (0.8 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
        >
          Les ergothérapeutes qui s'installent à leur compte développent en principe une pratique indépendante dans l'un
          des domaines de l'ergothérapie en particulier (par exemple : la pédiatrie, la psychiatrie, la gériatrie ou
          encore la médecine physique...).
        </p>
      </div>
    </div>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Group',
  computed: {
    background() {
      if (this.$store.getters.invertBrightness) {
        return '#424242'
      }
      return 'transparent'
    }
  }
}
</script>

<style scoped>
.group-desc {
  margin-bottom: 100px;
  max-width: 70%;
}

.group-list {
  display: flex;
}

.group-public {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.group-private {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}

.paragraph {
  max-width: 80%;
}

.text-white {
  color: white;
}

.text-teal {
  color: teal;
}

.ul-teal {
  border-color: teal;
}

@media screen and (max-width: 1025px) {
  .group-list {
    flex-direction: column;
    align-items: center;
  }

  .group-public {
    margin-bottom: 50px;
  }

  .group-private {
    text-align: center;
  }

  .group-ul {
    margin-bottom: 40px;
  }
}
</style>
