
export const getSQLValue = (value: string | number | boolean | null) => {

  if (typeof value === "string") {
    value = `'${value}'`
  }
  if (typeof value === "boolean") {
    value = value ? 1 : 0
  }
  if (value === null) {
    value = JSON.stringify(value)
  }

  return value;
}

// Creamos una cadena con las claves del objeto vehicule, rodeadas de corchetes
/**
 * 
 * @param {object} object Esto es un objeto cualquiera (No incluye Arrays)
 * @returns Devuelve un string con los KEYS o FIELDS del objeto para usarlos en una consulta SQL de tipo INSERT
 */
export const getInsertKeys = (object: object) =>{
  return `(${Object.keys(object).map(key => `[${key}]`).join(", ")})`
}

// Creamos una cadena con los valores del objeto vehicule, convirtiéndolos a formato SQL
/**
 * 
 * @param {object} object Esto es un objeto cualquiera (No incluye Arrays)
 * @returns Devuelve un string con los VALUES del objeto para usarlos en una consulta SQL de tipo INSERT
 */
export const getInsertValues = (object: object) =>{
  return `(${Object.values(object).map(value => getSQLValue(value)).join(", ")})`
}

/**
 * Función que devuelve los atributos necesarios para construir una consulta SQL de inserción.
 * 
 * @param {object} object El objeto que contiene los datos a insertar.
 * @returns {Array<string, string[]>} Un arreglo que contiene los nombres de las columnas y los valores a insertar.
 */
export const getInsertAttributes = (object: object) => {
  // Obtiene los nombres de las columnas a insertar.
  const keys = getInsertKeys(object)
  // Obtiene los valores a insertar.
  const values = getInsertValues(object)
  //Devuelve un arreglo que contiene los nombres de las columnas y los valores a insertar.
  return [keys, values]
}