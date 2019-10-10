import handleErrorMessages from './dbErrorhandler';

const success = (res, code, data) => res.status(code).json(data);

const failure = (res, code, err) => res.status(code).json({ error: handleErrorMessages(err) });

const successWithMessage = (res, code, message) => res.status(code).json({ message: message });

const duplicate = (res, code, message) => res.status(code).json({ duplicate: message });

export {
  success,
  successWithMessage,
  failure,
  duplicate,
};
