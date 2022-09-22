import { IMaterialsTypeRow } from '@core/service-api';

const getIdToMaterial = (
  arr: IMaterialsTypeRow[] = [],

  name: string,
) => {
  return arr.map((a) => {
    return {
      ...a,
      isIncluded: a.name.includes(name),
    };
  });
};
// const arrToTree = (
//   f: IMaterialsTypeRow[] = [],
//   idToMaterial: Record<string, IMaterialsTypeRow>,
// ) => {
//   const noLowerF = f.map((fi) => ({ ...fi, lower: [] }));
//   noLowerF.forEach((fi) => {
//     const parentId = fi.parentId;
//     const p = noLowerF.find((nf) => nf.id === parentId);
//     if (p) {
//       fi.isLeaf = true;
//       p.lower.push({ ...fi });
//     }
//   });
//   return noLowerF.filter((fi) => !fi.isLeaf);
// };

export function materialsFilterByName(arr: IMaterialsTypeRow[] = [], name: string) {
  return getIdToMaterial(arr, name);
}
const idMap: Record<string, IMaterialsTypeRow & { hasPush: boolean }> = {};
export function findExpandedKeys(arr: IMaterialsTypeRow[], value) {
  const result = ['-1'];

  if (!value) {
    return result;
  }
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    idMap[item.id] = {
      ...item,
      hasPush: false,
    };
    console.log(idMap, 'idMap');
    if (item.name.includes(value)) {
      // result.push(item.id);
      result.push(item.parentId);
      const parent = idMap[item.parentId];
      console.log(parent, 'parent');
      if (parent && !parent.hasPush) {
        result.push(parent.parentId);
        parent.hasPush = true;
      }
    }
    if (item.lower) {
      result.push(...findExpandedKeys(item.lower, value));
    }
  }
  return result;
}
