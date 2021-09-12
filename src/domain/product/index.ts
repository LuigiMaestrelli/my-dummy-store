export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  image: string;
  otherImages: string[];
  rating: Rating;
};
