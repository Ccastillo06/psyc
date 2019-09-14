export const NO_CLASS_KEY_ERROR = 'A class and key name are needed';

function checkPrivProp(prop) {
  if (typeof prop !== 'symbol') {
    throw new Error(`The private property ${prop} doesn't exist`);
  }

  return true;
}

function getPrivProp(argClass) {
  return _privKey => {
    if (checkPrivProp(_privKey)) {
      return argClass[_privKey];
    }
  };
}

function setPrivProp(argClass) {
  return (_privKey, value) => {
    if (checkPrivProp(_privKey)) {
      argClass[_privKey] = value;
    }
  };
}

export function addPrivateProp(argClass, keyName, initialValue) {
  if (!argClass || !keyName) {
    throw new Error(NO_CLASS_KEY_ERROR);
  }
  const _key = Symbol(keyName);

  argClass[_key] = initialValue;

  if (typeof argClass.getPrivate !== 'function') {
    argClass.getPrivate = getPrivProp(argClass);
  }

  if (typeof argClass.setPrivate !== 'function') {
    argClass.setPrivate = setPrivProp(argClass);
  }

  return _key;
}
