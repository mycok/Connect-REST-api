import handleErrorMessages from './dbErrorhandler';

const onSuccess = (res, code, data, message = 'success') => res.status(code).json({ message, data });

const onFailure = (res, code, err) => res.status(code).json({ error: handleErrorMessages(err) });

const onDuplicates = (res, code, param) => res.status(code).json({ duplicate: `${param} already exists!` });

export { onSuccess, onFailure, onDuplicates };
