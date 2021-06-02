// import CommonDialog from '@/components/CommonGlobal/CommonDialog'
// import CommonSelect from '@/components/CommonGlobal/CommonSelect'


// const globalComponents = [
//   CommonDialog,
//   CommonSelect
// ]

const compData = require.context('./CommonGlobal', false, /\.vue$/)

const plugin = {
  install(Vue){
    // globalComponents.forEach((comp) => {
    //   Vue.component(comp.name, comp)
    // })
    compData.keys().forEach(key => {
      let comp = compData(key).default
      Vue.component(comp.name, comp)
    })
  }
}
export default plugin
export const install = plugin.install