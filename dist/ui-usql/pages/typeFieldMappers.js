export const typeFieldMappers = {
    'bigint': bigInt,
    'int': int,
    'char': char,
    'dec': dec,
    'text': text,
};
function bigInt(schemaField) {
    let { name, tuid } = schemaField;
    let face, field;
    if (tuid !== undefined) {
        field = { name: name, type: 'id' };
        face = { type: 'pick-tuid', tuid: tuid };
    }
    else {
        field = { name: name, type: 'int' };
        face = { type: 'number' };
    }
    return { label: name, field: field, face: face };
}
function char(schemaField) {
    let { name } = schemaField;
    return {
        label: name,
        field: { name: name, type: 'string', maxLength: schemaField.size },
        face: { type: 'string' }
    };
}
function int(schemaField) {
    let { name } = schemaField;
    return {
        label: name,
        field: { name: name, type: 'int', step: 1 },
        face: { type: 'number' }
    };
}
function dec(schemaField) {
    let { name } = schemaField;
    return {
        label: name,
        field: { name: name, type: 'dec', step: 0.01 },
        face: { type: 'number' }
    };
}
function text(schemaField) {
    let { name } = schemaField;
    return {
        label: name,
        field: { name: name, type: 'string', maxLength: 1000 },
        face: { type: 'textarea' }
    };
}
//# sourceMappingURL=typeFieldMappers.js.map