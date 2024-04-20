export const mockConfigService = {
  get: jest.fn((key: string) => {
    switch (key) {
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
