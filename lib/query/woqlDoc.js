// eslint-disable-next-line consistent-return
function convert(obj) {
  if (obj == null) {
    return null;
  } if (typeof (obj) === 'number') {
    return {
      '@type': 'Value',
      data: {
        '@type': 'xsd:decimal',
        '@value': obj,
      },
    };
  } if (typeof (obj) === 'boolean') {
    return {
      '@type': 'Value',
      data: {
        '@type': 'xsd:boolean',
        '@value': obj,
      },
    };
  } if (typeof (obj) === 'string') {
    if (obj.indexOf('v:') === -1) {
      return {
        '@type': 'Value',
        data: {
          '@type': 'xsd:string',
          '@value': obj,
        },
      };
    }

    return {
      '@type': 'Value',
      variable: obj.split(':')[1],
    };

  // eslint-disable-next-line no-use-before-define
  } if (obj instanceof Var) {
    return {
      '@type': 'Value',
      variable: obj.name,
    };
  } if (typeof (obj) === 'object' && !Array.isArray(obj)) {
    const pairs = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(obj)) {
      pairs.push({
        '@type': 'FieldValuePair',
        field: key,
        value: convert(value),
      });
    }
    return {
      '@type': 'Value',
      dictionary: {
        '@type': 'DictionaryTemplate',
        data: pairs,
      },
    };
  } if (typeof (obj) === 'object' && Array.isArray(obj)) {
    const list = obj.map(convert);
    return {
      '@type': 'Value',
      list,
    };
  }
}

/**
 * @param {string} name
 * @returns
 */
function Var(name) {
  this.name = name;
}

/**
 * @param {object} name
 * @returns {object}
 */
function Doc(obj) {
  this.doc = obj;
  this.encoded = convert(obj);
  return this.encoded;
}

/**
* @param  {...string} varNames
* @returns {object<Var>}
*/
function Vars(...args) {
  const varObj = {};
  for (let i = 0, j = arguments.length; i < j; i += 1) {
    const argumentName = args[i];

    // this[argumentName] = new Var(argumentName);
    varObj[argumentName] = new Var(argumentName);
  }
  return varObj;
}

module.exports = { Vars, Var, Doc };
