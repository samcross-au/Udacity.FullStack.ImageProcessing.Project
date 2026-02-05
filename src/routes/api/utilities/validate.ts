import { type ImageProperties } from '../images';

export type ImageDataValidation = {
  filenameExists: boolean;
  widthExists: boolean;
  heightExists: boolean;
  validWidth: boolean;
  validHeight: boolean;
}

const checkFilename = async (filename: string | null) : Promise<boolean> => {
  return filename !== null && filename.length > 0;
}

const checkDimension = async (dimension: string | null) : Promise<boolean> => {
  return dimension !== null && dimension.length > 0;
}

const validateDimension = async (dimension: string | null) : Promise<boolean> => {
  return !isNaN(Number(dimension)) && Number(dimension) > 0;
}

export const validateImageQuery = async (properties: ImageProperties) : Promise<ImageDataValidation> => {
  const [filenameExists, widthExists, heightExists, validWidth, validHeight] = await Promise.all([
    checkFilename(properties.filename),
    checkDimension(properties.width),
    checkDimension(properties.height),
    validateDimension(properties.width),
    validateDimension(properties.height),
  ]);
  
  return {
    filenameExists,
    widthExists,
    heightExists,
    validWidth,
    validHeight,
  };
}