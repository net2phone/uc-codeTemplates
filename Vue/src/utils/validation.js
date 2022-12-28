import { isEmpty } from "@/utils";

export const required = (value) =>
  value && String(value) && String(value).length ? true : "Required field";

export const requiredSelect = (value) => !!value || "Required field";

export const emailValidator = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  const re =
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (Array.isArray(value)) {
    return value.every((val) => re.test(String(val)));
  }

  return re.test(String(value)) || "Enter a valid email";
};

export const passwordValidator = (password) => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password);

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
    "Field must contain at least one uppercase, lowercase, special character and digit with min 8 chars"
  );
};

export const confirmedValidator = (value, target) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  value === target || "Passwords don't match";

export const between = (value, min, max) => () => {
  const valueAsNumber = Number(value);

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  );
};

export const integerValidator = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every((val) => /^-?[0-9]+$/.test(String(val)));
  }

  return (
    /^-?[0-9]+$/.test(String(value)) || "Este campo debe ser un número entero"
  );
};

export const percentage = (value) => {
  if (String(value) && /^[0-9]*$/.test(String(value))) {
    if (value >= 0 && value <= 100) return true;
  }

  return "You must enter a number between 0 and 100";
};

export const integerValidatorThanZero = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every((val) => /^[1-9][0-9]*$/.test(String(val)));
  }

  return (
    /^[1-9][0-9]*$/.test(String(value)) ||
    "Este campo debe ser un número mayor a 0"
  );
};

export const regexValidator = (value, regex) => {
  if (isEmpty(value)) {
    return true;
  }

  let regeX = regex;
  if (typeof regeX === "string") {
    regeX = new RegExp(regeX);
  }

  if (Array.isArray(value)) {
    return value.every((val) => regexValidator(val, { regeX }));
  }

  return regeX.test(String(value)) || "The Regex field format is invalid";
};

export const alphaValidator = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  // const valueAsString = String(value)

  return (
    /^[A-Z]*$/i.test(String(value)) ||
    "The Alpha field may only contain alphabetic characters"
  );
};

export const urlValidator = (value) => {
  if (value === undefined || value === null || value.length === 0) {
    return true;
  }
  /* eslint-disable no-useless-escape */
  const re =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  return re.test(value) || "URL is invalid";
};

export const lengthValidator = (value, length) => {
  if (isEmpty(value)) {
    return true;
  }

  return (
    value.length === length ||
    `The Min Character field must be at least ${length} characters`
  );
};

export const alphaDashValidator = (value) => {
  if (isEmpty(value)) {
    return true;
  }

  const valueAsString = String(value);

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || "All Character is not valid";
};

export const filesValidator = (files, type) => {
  let filesTypes = {
    docs: [
      "application/pdf",
      "application/msword",
      "text/csv",
      "application/vnd.ms-powerpoint",
      "application/vnd.ms-excel",
    ],
    imgs: ["image/jpeg", "image/png"],
    compresseds: ["application/x-rar-compressed", "application/zip"],
  };
  let result;

  if (files.length == 0) {
    result = true;
  }

  if (type == "all") {
    result =
      files.every(
        (file) =>
          (filesTypes.docs.includes(file.type) ||
            filesTypes.imgs.includes(file.type) ||
            filesTypes.compresseds.includes(file.type)) &&
          file.size <= 52428800
      ) ||
      "Los archivo deben ser un documento o imagen y no deben pesar más de 50mb";
  }

  if (type == "image") {
    result =
      files.every(
        (file) => filesTypes.imgs.includes(file.type) && file.size <= 52428800
      ) || "Los archivos deben ser una imagen y no deben pesar más de 50mb";
  }

  return result;
};

export const getFailedTabs = (fields, values) => {
  let tabs = [];
  fields.forEach((field) => {
    if (field.rules) {
      field.rules().forEach((rule) => {
        if (rule(values[field.value]) !== true) tabs.push(field.tab);
      });
    }
  });

  return tabs;
};
