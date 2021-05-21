import CommonDialog from '@/components/CommonGlobal/CommonDialog'
import CommonSelect from '@/components/CommonGlobal/CommonSelect'

const globalComponents = [
  CommonDialog,
  CommonSelect
]
const plugin = {
  install(Vue){
    globalComponents.forEach((comp) => {
      Vue.component(comp.name, comp)
    })
  }
}
export default plugin
export const install = plugin.install