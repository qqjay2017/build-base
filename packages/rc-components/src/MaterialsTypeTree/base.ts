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
