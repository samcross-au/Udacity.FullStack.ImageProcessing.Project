import path from 'path';
import express from 'express';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { validateImageQuery, type ImageDataValidation } from './utilities/validate';
import { errorMessage } from './utilities/error';

const images = express.Router();

const fullDirectoryPath = path.resolve(__dirname, '../../../assets/full');
const thumbDirectoryPath = path.resolve(__dirname, '../../../assets/thumb');

export type ImageProperties = {
  filename: string | null;
  width: string | null;
  height: string | null;
}

export const getFullImagePath = (imageProperties: ImageProperties) : string => {
  return path.join(fullDirectoryPath, `${imageProperties.filename}.jpg`);;
}

export const getThumbImagePath = (imageProperties: ImageProperties) : string => {
  return path.join(thumbDirectoryPath, `${imageProperties.filename}_${imageProperties.width}x${imageProperties.height}_thumb.jpg`);
}

export const fileExists = async (filePath: string) : Promise<boolean> => {
  return fsPromises.access(filePath)
    .then(() => true)
    .catch(() => false);
}

export const createImage = async (imageProperties: ImageProperties) : Promise<void> => {
  const fullPath = getFullImagePath(imageProperties);
  const thumbPath = getThumbImagePath(imageProperties);
  
  if (await fileExists(thumbPath)) {
    return;
  }

  await sharp(fullPath)
    .resize(Number(imageProperties.width), Number(imageProperties.height))
    .toFile(thumbPath)
    .catch((err) => {
      console.error(err);
      throw new Error('Error processing the image.');
    });
}

images.get('/', async (req, res) => {
  const imageProperties: ImageProperties = {
    filename: req.query.filename as string || null,
    width: req.query.width as string || null,
    height: req.query.height as string || null,
  };

  const queryValidation = await validateImageQuery(imageProperties);

  const fullImagePath  = getFullImagePath(imageProperties);
  const thumbImagePath = getThumbImagePath(imageProperties);

  if (
    !queryValidation.filenameExists||
    !queryValidation.widthExists ||
    !queryValidation.heightExists ||
    !queryValidation.validWidth ||
    !queryValidation.validHeight
  ) {
    const message = errorMessage(queryValidation);
    return res.status(400).send(`There were some issues building your thumbnail:${message}`);
  }

  if (!await fileExists(fullImagePath)) {
    return res.status(400).send('The specified image file does not exist in the full directory.');
  }

  try {
    await createImage(imageProperties);
  } catch (err) {
    console.error(err);
    return res.status(400).send('Error processing the image.');
  }
  
  res.sendFile(thumbImagePath);
});

export default images;