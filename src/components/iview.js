import {
  Col,
  Row,
  Input,
  // Message,
  Notice,
  LoadingBar,
  Button,
  Tabs
} from 'iview'

const components = {
  Col,
  Row,
  Input,
  // Message,
  Notice,
  Button,
  LoadingBar,
  Tabs
}

const iview = {
  ...components,
  iButton: Button,
  // iCircle: Circle,
  iCol: Col,
  iRow: Row,
  iInput: Input,
  iTabs: Tabs,
  iTabPane: Tabs.Pane
  // iContent: Content,
  // iForm: Form,
  // iFooter: Footer,
  // iHeader: Header,
  // iMenu: Menu,
  // iOption: Option,
  // iProgress: Progress,
  // iSelect: Select,
  // iSwitch: Switch,
  // iTable: Table,
  // iTime: Time
}

const install = function (Vue, opts = {}) {
  if (install.installed) return

  Object.keys(iview).forEach(key => {
    Vue.component(key, iview[key])
  })
  Vue.prototype.$loading = LoadingBar
  // Vue.prototype.$message = Message
  // Vue.prototype.$modal = Modal
  Vue.prototype.$notice = Notice
  // Vue.prototype.$dpin = Spin
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install, ...components }
