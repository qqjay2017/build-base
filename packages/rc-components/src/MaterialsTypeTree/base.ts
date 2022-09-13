import { IMaterialsTypeRow } from '@core/service-api';

const getIdToMaterial = (
  arr: IMaterialsTypeRow[] = [],
  idToMaterial: Record<string, IMaterialsTypeRow>,
  expandArr: IMaterialsTypeRow[] = [],
) => {
  arr.forEach((a) => {
    if (a.lower && a.lower.length) {
      getIdToMaterial(a.lower, idToMaterial, expandArr);
    }
    idToMaterial[a.id] = {
      ...a,
    };
    expandArr.push({
      ...a,
    });
  });
};
const arrToTree = (
  f: IMaterialsTypeRow[] = [],
  idToMaterial: Record<string, IMaterialsTypeRow>,
) => {
  const noLowerF = f.map((fi) => ({ ...fi, lower: [] }));
  noLowerF.forEach((fi) => {
    const parentId = fi.parentId;
    const p = noLowerF.find((nf) => nf.id === parentId);
    if (p) {
      fi.isLeaf = true;
      p.lower.push({ ...fi });
    }
  });
  return noLowerF.filter((fi) => !fi.isLeaf);
};

export function materialsFilterByName(arr: IMaterialsTypeRow[] = [], name: string) {
  const idToMaterial: Record<string, IMaterialsTypeRow> = {};
  const expandArr: IMaterialsTypeRow[] = [];
  getIdToMaterial(arr, idToMaterial, expandArr);

  const f = expandArr.filter((a) => a.name.indexOf(name) > -1);

  const treeF = arrToTree(f, idToMaterial);

  return treeF;
}
