export const mockConfigService = {
  get: jest.fn((key: string) => {
    switch (key) {
      case 'STRIPE_API_KEY':
        return 'sk_test_cnkdjsmckd';
      case 'MINIO_ENDPOINT':
        return 'minio-endpoint';
      case 'MINIO_PORT':
        return 'minio-port';
      case 'MINIO_USE_SSL':
        return 'true';
      default:
        return undefined;
    }
  }),
};
