const isObjectEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

function cleanObject(
  obj: any,
  hasCreatedAt = true,
  hasPermission = false,
  hasRolePermission = false,
  hasTwoFactorSecret = false,
  hasExchangeRate = false
): any {
  if (obj == null) {
    return obj;
  }

  if (obj._id) {
    obj.id = obj._id;
    delete obj._id;
  }

  if (!hasTwoFactorSecret) {
    delete obj.two_factor_secret;
  }

  if (!hasPermission) {
    delete obj.permissions;
  }

  if (!hasRolePermission) {
    delete obj.role_permissions;
  }

  if (!hasExchangeRate) {
    delete obj.exchange_rates;
  }

  delete obj.__v;
  delete obj.updated_at;
  delete obj.password;
  if (!hasCreatedAt) {
    delete obj.created_at;
  }
  return obj;
}

export { isObjectEmpty, cleanObject };
