export interface IMenu {
  name: string;
  link: string;
  icon?: React.ReactNode;
  subMenus?: IMenu[];
}
