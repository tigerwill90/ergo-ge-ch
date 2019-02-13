<template>
  <FlexContainer background-color="#f0f8ff" min-height="650px" justify-content="center">
    <canvas id="life-game"></canvas>
  </FlexContainer>
</template>

<script>
import GameOfLife from '@tigerwill90/life-game'
export default {
  name: 'Actuality',
  mounted() {
    const g = new GameOfLife({
      canvas: 'life-game',
      size: 5,
      color: '#7f0000',
      background: '#ffebee',
      width: 1000,
      height: 600,
      customize: canvas => {
        canvas.style.top = `calc(50% - ${canvas.height / 2}px)`
        canvas.style.left = `calc(50% - ${canvas.width / 2}px)`
      }
    })

    g.play({ speed: 100, render: 1 }, (err, cpt) => {
      if (err !== null) {
        throw err
      }
    })
  }
}
</script>
