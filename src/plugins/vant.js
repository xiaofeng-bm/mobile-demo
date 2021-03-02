import {
  Button,
  Col,
  Row,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CollapseItem,
  NavBar,
  Toast,
  Sticky,
  Cell,
  CellGroup,
  Tag,
  ActionSheet,
  Uploader,
  RadioGroup,
  Radio,
  Field,
  Image,
  NoticeBar,
  Popup,
  Dialog,
  Empty 
} from "vant";

const install = (Vue) => {
  Vue.use(Button);
  Vue.use(Col);
  Vue.use(Row);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(NavBar);
  Vue.use(Toast);
  Vue.use(Sticky);
  Vue.use(Cell);
  Vue.use(CellGroup);
  Vue.use(Tag);
  Vue.use(ActionSheet);
  Vue.use(Uploader);
  Vue.use(RadioGroup);
  Vue.use(Radio);
  Vue.use(Field);
  Vue.use(Image);
  Vue.use(NoticeBar);
  Vue.use(Popup);
  Vue.use(Dialog);
  Vue.use(Empty);
};

export default install;
