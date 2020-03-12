<template>
  <v-app>
    <topmenu />

    <v-content class="grey lighten-3">
      <v-container fluid>
        <!-- {{ mars }} -->
        <div v-html="marstext" />
        <vue-mathjax :formula="formula" />
        <v-divider class="mt-4 mb-4" />
        <div v-html="signaltext" />
        <!--
            <v-divider class="mt-4 mb-4"/>

          <div v-for="(item,index) in reaped" :key="index">
              <div v-if="item.type==='markdown'" v-html="item.text"></div>
              <div v-if="item.type==='formula'">
                <vue-mathjax :formula="item.text"></vue-mathjax>
              </div>
          </div>
          -->
      </v-container>
    </v-content>

    <footerbar />
  </v-app>
</template>

<script>
import topmenu from './components/App/TopMenu.vue'
import footerbar from './components/App/FooterBar.vue'

import kramed from 'kramed'
import {VueMathjax} from 'vue-mathjax'
kramed.setOptions({
  renderer: new kramed.Renderer(''),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})

export default {
  name: 'App',
  components: {
    topmenu,
    footerbar,
    'vue-mathjax': VueMathjax
  },
  data: () => ({
    formula: '$ $',
    mars: "##Mars data: spectrogram\n\nImplementing the filtering of the Z-component of the field signal from the man-made interference by subtraction part of the signal, which can be predicted based on X and Y components.\nLet Z is the Z component of the signal, which must be filtered,  $R$ is the matrix whose rows are X and Y components of the source signal and maybe X and Y components of the signals from the neighborhood of the source, which were grouped in the group signal submodule.\nThe prediction of the Z component of the signal can be done by solving the system of linear equations for minimizing expression:\n<p align='center'>\n$\\sum_{j} (Vec(L_j) \\cdot X - Z_j)^2 $\n</p>\nwhere  $\\cdot$  is the scalar dot, $Vec$ is the matrix vectorization operator. $L_j$ is the matrix whose columns are columns of $R$ with indexes from $j-r$ to $j+r$, where $r$ is the radius of correlation filter. After minimizing this expression we obtain $X$ and the filtered signal $F$ can be obtained as follows:\n<p align='center'>\n$F_j = Z_j - Vec(L_j) \\cdot X $\n</p>\n\n\n",
    signal: "#Mars data: signal\n\nFinding maximum likelihood estimation for the parameters $k$ and $\\theta$ of the gamma distributions which consist power spectral density of field signal.\n\nThe maximum likelihood estimation for parameters is determined by maximizing the marginal likelihood of the observed data:\n<p align='center'>\n$L(\\Theta; X) = p(X | \\Theta) = \\int p(X, Z | \\Theta)dZ $,\n</p>\nwhere $X$ is the power spectral of the field signal, $Z$ is the latent data, $\\Theta$ - parameters of the gamma distribution.\n"
  }),
  computed: {
    marstext () {
      return kramed(this.mars)
    },
    signaltext () {
      return kramed(this.signal)
    },
    reaped () {
      // сразу в маркдаун, пока без формул
      let res = kramed(this.mars)
      // const reaper = /(.*?\$.*?\$)/gim
      const regex = /\$.*?\$/gim
      let formulas = []
      let loremipsum = []

      // выдернем формулы и поставим метки в маркдаун
      let marktext = res.replace(regex, function (item) {
        formulas.push(item)
        return '-+-'
      })

      // Превратим текст в массив побив по меткам
      loremipsum = marktext.split('-+-')

      console.warn(loremipsum, formulas)

      // Массив объектов
      let supertext = []
      for (let i in loremipsum) {
        supertext.push({type: 'markdown', text: loremipsum[i]})
        if (formulas[i] && formulas[i] !== 'undefined') supertext.push({type: 'formula', text: formulas[i]})
      }
      console.log(supertext)
      return supertext
    }
  }
}
</script>
