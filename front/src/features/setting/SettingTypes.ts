export type MenuAndItemsT = {
  id: number;
  title: string;
  items: {
    id: number;
    label: string;
    action: () => void;
    defaultValue: string;
  }[];
};
