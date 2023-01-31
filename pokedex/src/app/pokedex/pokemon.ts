export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: {
    name: string;
    url: string;
  }[];
}
