import path from 'path';
import {
  getFullImagePath,
  getThumbImagePath,
  fileExists,
  ImageProperties
} from '../routes/api/images';

const THUMB_PATH = path.resolve(__dirname, '../../assets/thumb');
const FULL_PATH = path.resolve(__dirname, '../../assets/full');

describe('get Full image path', (): void => {
  const imageProperties: ImageProperties = {
    filename: 'test',
    width: null,
    height: null
  };

  it('should return the correct Full image path', (): void => {
    const filename = 'test';

    const expectedPath = path.join(FULL_PATH, `${filename}.jpg`);
    const result = getFullImagePath(imageProperties);

    expect(result).toBe(expectedPath);
  });

  it('should return an incorrect Full image path', (): void => {
    const imageProperties: ImageProperties = {
      filename: 'error',
      width: null,
      height: null
    };

    const incorrectPath = path.join(
      THUMB_PATH,
      `${imageProperties.filename}.jpg`
    );
    const result = getFullImagePath(imageProperties);

    expect(result).not.toBe(incorrectPath);
  });
});

describe('get Thumb image path', (): void => {
  const imageProperties: ImageProperties = {
    filename: 'test',
    width: '400',
    height: '400'
  };

  it('should not return the correct Thumb image path', (): void => {
    const expectedPath = path.join(
      THUMB_PATH,
      `${imageProperties.filename}_${imageProperties.width}x${imageProperties.height}_thumb.jpg`
    );
    const result = getThumbImagePath(imageProperties);

    expect(result).toBe(expectedPath);
  });

  it('should not return an incorrect Thumb image path', (): void => {
    const incorrectPath = path.join(
      FULL_PATH,
      `${imageProperties.filename}.jpg`
    );
    const result = getThumbImagePath(imageProperties);

    expect(result).not.toBe(incorrectPath);
  });
});

describe('check if Full image exists', () => {
  it('send valid image name', async () => {
    const imageProperties: ImageProperties = {
      filename: 'test',
      width: '400',
      height: '400'
    };

    const imagePath = getFullImagePath(imageProperties);
    const result = await fileExists(imagePath);

    expect(result).toBeTrue();
  });

  it('send invalid image name', async () => {
    const imageProperties: ImageProperties = {
      filename: 'error',
      width: '400',
      height: '400'
    };

    const imagePath = getFullImagePath(imageProperties);
    const result = await fileExists(imagePath);

    expect(result).toBeFalse();
  });
});

describe('check if Thumb image exists', () => {
  it('send valid image name', async () => {
    const imageProperties: ImageProperties = {
      filename: 'test',
      width: '400',
      height: '400'
    };

    const imagePath = getThumbImagePath(imageProperties);
    const result = await fileExists(imagePath);

    expect(result).toBeTrue();
  });

  it('send invalid image name', async () => {
    const imageProperties: ImageProperties = {
      filename: 'error',
      width: '400',
      height: '400'
    };

    const imagePath = getThumbImagePath(imageProperties);
    const result = await fileExists(imagePath);

    expect(result).toBeFalse();
  });
});
