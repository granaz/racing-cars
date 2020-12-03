import { RcErrors, ResponseError } from "../responseBuilder/ResponseError.service";

/**
 * Check if given string is a UUID
 * @param uuid 
 */
export const checkUuid = (uuid: string): boolean => {
  console.log(uuid);

  const result = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);  

  if (!result) {
    throw new RcErrors(ResponseError.INVALID_UUID);
  }

  return result;  
};
