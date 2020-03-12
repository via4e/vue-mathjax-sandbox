<template>
  <v-footer
    absolute
    color="blue lighten-4"
  >
    <v-col
      class="text-center"
      cols="12"
      dense
    >
      Версия от:{{ " " + ver }}
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterBar',
  computed: {
    ver () {
      return this.$store.state.config.version
    }
  }
}
</script>
