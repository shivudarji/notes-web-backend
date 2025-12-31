import t from '../lang/language';

const response = (
  status = true,
  message = 'Success',
  data?: object,
  additionalData?: object
) => {
  let res: any = {
    status: status,
    message: message,
  };

  if (data) {
    res.data = data;
  }

  if (additionalData) {
    res = { ...res, ...additionalData };
  }

  return res;
};

const throwError = (message = 'unknown', name = t('custom_error')) => {
  return {
    name: name,
    message: message,
  };
};

const pagination = (
  page: number,
  limit: number,
  total: number,
  data: Array<object>
) => {
  return {
    current_page: page,
    total_records: total,
    per_page: limit,
    last_page: Math.ceil(total / limit),
    data: data,
  };
};

export { response, pagination, throwError };
