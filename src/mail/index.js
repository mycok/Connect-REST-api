import sgMail from '@sendgrid/mail';

import config from '../config';
import logger from '../utils/logger';
import emailTemplate from './template';

const { sendgridApiKey } = config;
sgMail.setApiKey(sendgridApiKey);

const sendAccountActivationEmail = (email, name, link) => {
  const message = {
    to: email,
    from: 'no-reply@connect-app.com',
    subject: 'Activate your account',
    html: emailTemplate(name, link),
  };

  return sgMail.send(message, (err, result) => {
    if (err) { return logger.log({ level: 'error', message: err.message }); }
    return logger.log({ level: 'info', message: result && 'email sent successfully' });
  });
};

export default sendAccountActivationEmail;
