import { ImageDataValidation } from "./validate";

export const errorMessage = (validationResults: ImageDataValidation) : string => {
  let message = '<p><ul>';
  
  if (!validationResults.filenameExists) {
    message += '<li>An image file is required. Please provide the image\'s filename in the form of a query parameter (e.g. filename=sample).</li>';
  }
  
  if (!validationResults.widthExists) {
    message += '<li>Width parameter is required. Please provide the width in the form of a query parameter (e.g. width=200).</li>';
  } else if (!validationResults.validWidth) {
    message += '<li>Width must be a positive number (non-numbers, negative numbers and 0 are not allowed).</li>';
  }
  
  if (!validationResults.heightExists) {
    message += '<li>Please provide the height in the form of a query parameter (e.g. height=200).</li>';
  } else if (!validationResults.validHeight) {
    message += '<li>Height must be a positive number (non-numbers, negative numbers and 0 are not allowed).</li>';
  }
  
  message += '\n</ul></p>';
  
  return message;
}