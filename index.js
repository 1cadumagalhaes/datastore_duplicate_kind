const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

async function listEntities(key) {
  const query = datastore.createQuery(key);
  const [entities] = await datastore.runQuery(query);
  return entities;
}

async function duplicateEntities(key, newKey) {
  try {
    const entityKey = datastore.key(newKey);
    const data = await listEntities(key);
    const entities = data.map(entity => {
      /*let objKeys = Object.keys(entity);
      let data = {};
      objKeys.forEach((k)=>data[k]=entities[k]);/**/
      let { dependsOn, configId, dest, triggersOn, legacySql, emitEvent, src, partitionField } = entity;
      return {
        key: entityKey,
        data: {
          configId,
          dependsOn,
          dest,
          emitEvent,
          legacySql,
          partitionField,
          src,
          triggersOn
        }
      }
    });
    //console.log(entities);
    await datastore.insert(entities);
  } catch (error) {
    console.error(error);
  }
}

function main() {
  const queryKind = "";
  const newKind = ""
  duplicateEntities(queryKind, newKind);
}

main();
