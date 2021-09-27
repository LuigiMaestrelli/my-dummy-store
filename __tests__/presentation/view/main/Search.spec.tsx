import { render, screen, fireEvent, act } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import SearchView from '@/presentation/view/main/Search';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SearchView', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  describe('general', () => {
    it('should render the component', () => {
      const result = render(
        <SearchView products={[]} page={1} totalPages={1} search="search" />
      );
      expect(result.baseElement).toBeVisible();
    });
  });

  describe('pagination', () => {
    it('should render the pagination component', () => {
      render(
        <SearchView products={[]} page={1} totalPages={1} search="search" />
      );

      const pagination = screen.getByTestId('search-pagination');
      expect(pagination).toBeVisible();
    });

    it('should change route when pressing the pagination', () => {
      render(
        <SearchView
          products={[]}
          page={1}
          totalPages={5}
          search="valid search"
        />
      );

      const btnPagination5 = screen.getByText('5');
      expect(btnPagination5).toBeVisible();

      act(() => {
        fireEvent.click(btnPagination5);
      });

      expect(mockRouter.asPath).toBe(
        `/search/${encodeURI('valid search')}?page=5`
      );
    });
  });

  describe('not found', () => {
    it('should render a not found text when no products was passed through the props', () => {
      render(
        <SearchView
          products={[]}
          page={1}
          totalPages={5}
          search="valid search"
        />
      );

      const notFoundText = screen.getByText(
        'No products was found with your search.'
      );
      expect(notFoundText).toBeVisible();
    });

    it('should render an image for not found', () => {
      render(
        <SearchView
          products={[]}
          page={1}
          totalPages={5}
          search="valid search"
        />
      );

      const notFoundText = screen.getByAltText('no product found image');
      expect(notFoundText).toBeVisible();
    });

    it('should not render the image with a product was passed through the props', () => {
      render(
        <SearchView
          products={[
            {
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
            }
          ]}
          page={1}
          totalPages={5}
          search="valid search"
        />
      );

      const notFoundText = screen.queryByAltText('no product found image');
      expect(notFoundText).not.toBeInTheDocument();
    });
  });

  describe('render product', () => {
    it('should render the grid with the product', () => {
      render(
        <SearchView
          products={[
            {
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
            }
          ]}
          page={1}
          totalPages={5}
          search="valid search"
        />
      );

      const gridItems = screen.queryAllByTestId('product-grid-item');
      expect(gridItems.length).toBe(1);
    });
  });
});
