import createEmotionCache from '@/presentation/theme/createEmotionCache';

describe('createEmotionCache', () => {
  it('should create the cache object', () => {
    const cache = createEmotionCache();
    expect(cache).toBeTruthy();
  });
});
