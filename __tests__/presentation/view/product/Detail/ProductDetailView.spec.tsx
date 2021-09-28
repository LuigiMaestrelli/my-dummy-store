import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductDetailView from '@/presentation/view/product/Detail';
import { Product } from '@/domain/models/product';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const makeFakeProduct = (): Product => {
  return {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4.7,
      count: 500
    },
    otherImages: [],
    slug: 'mens_cotton_jacket_-_KCOYJL2SWN'
  };
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  }
}));

const mockShowAlertDialog = jest.fn();
jest.mock('@/main/contexts/alertContext', () => ({
  useAlertContext: jest.fn(() => ({
    showAlertDialog: mockShowAlertDialog
  }))
}));

const mockFindSimilar = jest.fn(() => {
  return new Promise(resolve => {
    resolve([]);
  });
});

jest.mock('@/main/factories/usecases/product/productUseCase', () => ({
  useProductUseCase: jest.fn(() => ({
    findSimilar: mockFindSimilar
  }))
}));

describe('ProductDetailView', () => {
  it('should render the component', async () => {
    const product = makeFakeProduct();
    const { baseElement, findByText } = render(
      <ProductDetailView product={product} />
    );

    const title = await findByText(product.title);
    expect(baseElement).toBeVisible();
    expect(title).toBeVisible();
  });

  it('should call the buy now function', async () => {
    render(<ProductDetailView product={makeFakeProduct()} />);

    const btn = await screen.findByText('Buy now');
    userEvent.click(btn);

    expect(mockShowAlertDialog).toBeCalled();
  });

  it('should render the similar products', async () => {
    mockFindSimilar.mockReturnValueOnce(
      new Promise(resolve => {
        resolve([
          {
            id: 1,
            title: 'similar product',
            price: 55.99,
            description: 'description ',
            category: "men's clothing",
            image: 'image url',
            rating: {
              rate: 4.7,
              count: 500
            },
            otherImages: [],
            slug: 'similar_product'
          }
        ]);
      })
    );

    render(<ProductDetailView product={makeFakeProduct()} />);

    const btn = await screen.findByText('similar product');
    userEvent.click(btn);

    expect(mockShowAlertDialog).toBeCalled();
  });
});
