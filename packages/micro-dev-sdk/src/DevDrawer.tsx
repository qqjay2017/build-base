import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { ResourceList, uimsGetMenuApi } from "@core/service-api";
import React, { useEffect, useMemo, useState } from "react";
import Menu from "antd/es/menu";
import "antd/es/menu/style/index.css";

export interface DevDrawerProps {
  systemId: string;
  prefixPath?: string;
}

export default function DevDrawer({ systemId, prefixPath }: DevDrawerProps) {
  const [open, setOpen] = useState(false);
  const [menus, setMenus] = useState<ResourceList[]>([]);
  const toggle = () => {
    setOpen((flag) => !flag);
  };

  useEffect(() => {
    if (systemId) {
      uimsGetMenuApi(systemId).then((res) => {
        setMenus(res.resourceList || []);
      });
    }
  }, [systemId]);

  function onTitleClick({ key }: { key: string }) {
    if (!key.startsWith("/")) {
      key = "/" + key;
    }
    window.location.href = prefixPath + key;
  }

  const menuToItem = (list: Partial<ResourceList>[], pKey = ""): any => {
    return list.map((l) => {
      const curKey = pKey + l.id + (l.code || "");
      if (l.children && l.children.length) {
        l.children = menuToItem(l.children, pKey + curKey);
      }
      const m: Record<string, any> = {
        children: l.children || [],
        key: l.key ? l.key : pKey + curKey,
        label: l?.meta?.title || "无名",
        type: l.children && l.children.length ? "group" : undefined,
      };

      if (!l.children || !l.children.length) {
        m.onTitleClick = onTitleClick;
      }
      return m;
    });
  };

  const items = useMemo(() => {
    return menuToItem(menus);
  }, [menus]);

  return (
    <Drawer
      width={200}
      open={open}
      level={null}
      onHandleClick={() => toggle()}
      onClose={() => setOpen(false)}
    >
      <div>
        <div style={{ height: "50px" }}>11</div>
        <Menu style={{ width: 200 }} mode="inline" items={items} />
      </div>
    </Drawer>
  );
}
