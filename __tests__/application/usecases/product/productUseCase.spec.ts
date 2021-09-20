import {
  FindOptions,
  IProductApiClient
} from '@/application/protocols/product/productApiClient';
import { ProductUseCase } from '@/application/usecases/product/productUseCase';
import { Product } from '@/domain/models/product';

type SutTypes = {
  sut: ProductUseCase;
  productApiClientStub: IProductApiClient;
};

const makeProductApiClient = (): IProductApiClient => {
  class ProductApiClientStub implements IProductApiClient {
    findById(id: number): Promise<Product | null> {
      throw new Error('Method not implemented.');
    }

    findBySlug(slug: string): Promise<Product | null> {
      throw new Error('Method not implemented.');
    }

    async findSimilar(id: number, category: string): Promise<Product[]> {
      return [
        {
          id: 2,
          title: 'valid title',
          slug: 'valid slug',
          price: 5,
          description: 'valid description',
          category: 'valid category',
          image: 'valid image url',
          otherImages: [],
          rating: {
            count: 1,
            rate: 3
          }
        }
      ];
    }

    find(options?: FindOptions): Promise<[Product[], number]> {
      throw new Error('Method not implemented.');
    }
  }

  return new ProductApiClientStub();
};

const makeSut = (): SutTypes => {
  const productApiClientStub = makeProductApiClient();
  const sut = new ProductUseCase(productApiClientStub);

  return {
    sut,
    productApiClientStub
  };
};

describe('Product UseCase', () => {
  describe('findSimilar', () => {
    it('should call findSimilar with correct values', async () => {
      const { sut, productApiClientStub } = makeSut();

      const findSimilarSpy = jest.spyOn(productApiClientStub, 'findSimilar');

      await sut.findSimilar({
        id: 1,
        title: 'valid title',
        slug: 'valid slug',
        price: 5,
        description: 'valid description',
        category: 'valid category',
        image: 'valid image url',
        otherImages: [],
        rating: {
          count: 1,
          rate: 3
        }
      });

      expect(findSimilarSpy).toBeCalledWith(1, 'valid category');
    });

    it('should throw if findByEmailAndPassword throws', async () => {
      const { sut, productApiClientStub } = makeSut();

      jest
        .spyOn(productApiClientStub, 'findSimilar')
        .mockImplementationOnce(() => {
          throw new Error('test throw');
        });

      const findSimilarPromise = sut.findSimilar({
        id: 1,
        title: 'valid title',
        slug: 'valid slug',
        price: 5,
        description: 'valid description',
        category: 'valid category',
        image: 'valid image url',
        otherImages: [],
        rating: {
          count: 1,
          rate: 3
        }
      });

      await expect(findSimilarPromise).rejects.toThrow(new Error('test throw'));
    });

    it('should return an list of similar products', async () => {
      const { sut } = makeSut();

      const result = await sut.findSimilar({
        id: 1,
        title: 'valid title',
        slug: 'valid slug',
        price: 5,
        description: 'valid description',
        category: 'valid category',
        image: 'valid image url',
        otherImages: [],
        rating: {
          count: 1,
          rate: 3
        }
      });

      expect(result).toEqual([
        {
          id: 2,
          title: 'valid title',
          slug: 'valid slug',
          price: 5,
          description: 'valid description',
          category: 'valid category',
          image: 'valid image url',
          otherImages: [],
          rating: {
            count: 1,
            rate: 3
          }
        }
      ]);
    });
  });
});
