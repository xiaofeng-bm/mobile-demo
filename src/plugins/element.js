import { Input, Table, TableColumn, Button } from "element-ui";

const install = (Vue) => {
  Vue.use(Input);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Button);
};

export default install;
