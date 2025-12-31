import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { response } from '../common/response';
import { RequestLimitExceeded } from '../common/status';
import t from '../lang/language';

// Define the rate limiter
const requestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5000,
  handler: (req: Request, res: Response) => {
    const retryAfter = res.getHeader('Retry-After') as string | undefined;
    const retryAfterSeconds = retryAfter ? parseInt(retryAfter, 10) : 0;
    const remainingTime = retryAfterSeconds
      ? `${retryAfterSeconds} seconds`
      : '1 minute';
    res
      .status(RequestLimitExceeded)
      .json(
        response(
          false,
          t('too_many_requests_from_this_ip', { remainingTime: remainingTime })
        )
      );
  },
});

export default requestLimiter;
