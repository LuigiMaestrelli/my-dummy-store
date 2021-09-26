import { IApiClient } from '@/application/protocols/apiClient';
import { ProductApiClient } from '@/infrastructure/adapter/product/productApiClient';
import { makeApiClientStub } from '@test/utils/stubs/infrastructure/apiClient';

type SutTypes = {
  sut: ProductApiClient;
  apiClientSub: IApiClient;
};

const makeSut = (): SutTypes => {
  const apiClientSub = makeApiClientStub();
  const sut = new ProductApiClient(apiClientSub);

  return { sut, apiClientSub };
};

describe('Product API Client', () => {
  describe('findById', () => {
    it('should call apiClient.get with correct values', async () => {
      const { sut, apiClientSub } = makeSut();

      const getSpy = jest.spyOn(apiClientSub, 'get');
      await sut.findById(99);

      expect(getSpy).toHaveBeenCalledWith('products/99');
    });

    it('should throw if apiClient throws', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockImplementationOnce(() => {
        throw new Error('test throw');
      });

      const findByIdPromise = sut.findById(99);

      await expect(findByIdPromise).rejects.toThrow(new Error('test throw'));
    });

    it('should return the data object from apiClient', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: {
              testData: 1
            },
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const result = await sut.findById(9);
      expect(result).toEqual({ testData: 1 });
    });
  });

  describe('findBySlug', () => {
    it('should call apiClient.get with correct values', async () => {
      const { sut, apiClientSub } = makeSut();

      const getSpy = jest.spyOn(apiClientSub, 'get');
      await sut.findBySlug('valid slug');

      expect(getSpy).toHaveBeenCalledWith('products?slug=valid slug');
    });

    it('should throw if apiClient throws', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockImplementationOnce(() => {
        throw new Error('test throw');
      });

      const findBySlugPromise = sut.findBySlug('slug');

      await expect(findBySlugPromise).rejects.toThrow(new Error('test throw'));
    });

    it('should return a product that matches the slug', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: [
              {
                slug: 'the slug'
              }
            ],
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const result = await sut.findBySlug('the slug');
      expect(result?.slug).toBe('the slug');
    });

    it('should return null if no products was found with the slug', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: [],
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const result = await sut.findBySlug('the slug');
      expect(result).toBe(null);
    });
  });

  describe('findSimilar', () => {
    it('should call apiClient.get with correct values', async () => {
      const { sut, apiClientSub } = makeSut();

      const getSpy = jest.spyOn(apiClientSub, 'get');
      await sut.findSimilar(10, 'valid category');

      expect(getSpy).toHaveBeenCalledWith('products', {
        params: {
          category: 'valid category',
          id_ne: 10,
          _limit: 10
        }
      });
    });

    it('should throw if apiClient throws', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockImplementationOnce(() => {
        throw new Error('test throw');
      });

      const findSimilarPromise = sut.findSimilar(10, 'valid category');

      await expect(findSimilarPromise).rejects.toThrow(new Error('test throw'));
    });

    it('should return an array of similar products', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: [
              {
                category: 'valid category'
              }
            ],
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const result = await sut.findSimilar(1, 'valid category');
      expect(result.length).toBe(1);
    });
  });

  describe('find', () => {
    it('should call apiClient.get with correct values', async () => {
      const { sut, apiClientSub } = makeSut();

      const getSpy = jest.spyOn(apiClientSub, 'get');
      await sut.find({
        limit: 25,
        page: 2,
        query: 'some value'
      });

      expect(getSpy).toHaveBeenCalledWith('products', {
        params: {
          q: 'some value',
          _page: 2,
          _limit: 25
        }
      });
    });

    it('should throw if apiClient throws', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockImplementationOnce(() => {
        throw new Error('test throw');
      });

      const findPromise = sut.find({
        limit: 25,
        page: 2,
        query: 'some value'
      });

      await expect(findPromise).rejects.toThrow(new Error('test throw'));
    });

    it('should return an array of products', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: [
              {
                category: 'valid category'
              }
            ],
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const [products] = await sut.find({
        limit: 25,
        page: 2,
        query: 'some value'
      });
      expect(products.length).toBe(1);
    });

    it('should return the total of products found', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: [
              {
                category: 'valid category'
              }
            ],
            status: 200,
            statusText: 'Ok',
            total: 5,
            headers: {}
          })
        )
      );

      const [, total] = await sut.find({
        limit: 25,
        page: 2,
        query: 'some value'
      });
      expect(total).toBe(5);
    });
  });
});
