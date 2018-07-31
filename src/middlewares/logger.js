const log4js = require('log4js');

const logger = log4js.getLogger('app');

module.exports = async (ctx, next) => {
  const { method, originalUrl } = ctx;
  logger.info(`<-- ${method} ${originalUrl}`);
  try {
    await next();
  } catch (error) {
    logger.error(error);
    throw error;
  }
  const { res } = ctx;
  const onfinish = done.bind(null, 'finish'); // eslint-disable-line
  const onclose = done.bind(null, 'close'); // eslint-disable-line

  function done(event) {
    res.removeListener('finish', onfinish);
    res.removeListener('close', onclose);
    logger.info(`${event === 'close' ? '-x-' : '-->'} ${method} ${originalUrl} statusCode: ${ctx.status}`);
  }

  res.once('finish', onfinish);
  res.once('close', onclose);
};
