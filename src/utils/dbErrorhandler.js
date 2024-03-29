const getUniqueErrorMessage = (err) => {
  let output;
  try {
    const fieldName = err.message.substring(err.message.lastIndexOf('.$') + 61, err.message.lastIndexOf('_1'));
    output = `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} already exists`;
  } catch (exept) {
    output = 'Unique field already exists';
  }
  return output;
};

const handleErrorMessages = (err) => {
  let errorMessage = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        errorMessage = getUniqueErrorMessage(err);
        break;

      default:
        errorMessage = 'Something went wrong';
        break;
    }
  } else {
    const { errors } = err;
    const errorKeys = Object.keys(errors);

    errorKeys.forEach((key) => {
      if (errors[key].message) {
        const { message } = errors[key];
        errorMessage = message;
      }
    });
  }
  return errorMessage;
};

export default handleErrorMessages;
