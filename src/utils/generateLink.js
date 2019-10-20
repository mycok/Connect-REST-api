const generateLink = (protocol, hostname, port, token) => `${protocol}://${hostname}:${port}/connect/v1/activation/${token}`;

export default generateLink;
