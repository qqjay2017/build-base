import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import { uimsGetMenuApi, uimsGetUserCompanyApi, uimsPutDefaultCompanyApi } from '@core/service-api';
import type { IResourceList, UimsGetUserCompanyApiData } from '@core/service-api';
import React, { useEffect, useMemo, useState } from 'react';
import { Menu, Dropdown } from 'antd';

import { SmileOutlined } from '@ant-design/icons';
import { onError } from '../utils/onError';
export interface DevDrawerProps {
  systemId: string;
  onTitleClick?: (l: Partial<IResourceList>) => void;
}

export default function DevDrawer({ systemId, onTitleClick }: DevDrawerProps) {
  const [open, setOpen] = useState(false);
  const [menus, setMenus] = useState<IResourceList[]>([]);
  const [company, setCompany] = useState<UimsGetUserCompanyApiData[]>([]);
  const curCompanyName = useMemo(() => {
    const userInfoStr = sessionStorage.getItem('USER_INFO');
    if (!userInfoStr) {
      return '';
    }
    const userInfo = JSON.parse(userInfoStr);
    if (!userInfo) {
      return '';
    }
    return userInfo.companyName;
  }, []);
  const toggle = () => {
    setOpen((flag) => !flag);
  };

  useEffect(() => {
    if (systemId) {
      uimsGetMenuApi(systemId,{
        onError:onError
      }).then((res) => {
        setMenus(res.resourceList || []);
      });
    }
    uimsGetUserCompanyApi().then((res) => {
      setCompany(res);
    });
  }, [systemId]);

  const menuToItem = (list: Partial<IResourceList>[], pKey = ''): any => {
    return list.map((l) => {
      const curKey = pKey + l.id + (l.code || '');
      if (l.children && l.children.length) {
        l.children = menuToItem(l.children, pKey + curKey);
      }
      const m: Record<string, any> = {
        children: l.children && l.children.length ? l.children : undefined,
        key: l.key ? l.key : pKey + curKey,
        label: l?.meta?.title || '无名',
        type: l.children && l.children.length ? 'group' : undefined,
      };

      if (!l.children || !l.children.length) {
        m.onClick = () => {
          onTitleClick && onTitleClick(l);
          setOpen(false);
        };
      }
      return m;
    });
  };

  const items = useMemo(() => {
    return menuToItem(menus);
  }, [menus]);

  const menu = useMemo(() => {
    return (
      <Menu
        items={(company || []).map((c) => {
          return {
            key: c.companyId,
            label: c.companyName,
            disabled: c.companyName === curCompanyName,
            onClick: () => {
              uimsPutDefaultCompanyApi({
                companyId: c.companyId,
                companyName: c.companyName,
              }).then((res) => {
                window.location.reload();
              });
            },
          };
        })}
      ></Menu>
    );
  }, [company, curCompanyName]);

  return (
    <Drawer
      width={200}
      open={open}
      level={null}
      onHandleClick={() => toggle()}
      onClose={() => setOpen(false)}
    >
      <div style={{}} id="DrawerDrawerDrawer">
        <div
          style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            getPopupContainer={() => document.getElementById('DrawerDrawerDrawer')}
          >
            <a style={{ fontSize: '20px', color: '#1890ff' }}>
              切换公司 <SmileOutlined />
            </a>
          </Dropdown>
        </div>
        <Menu style={{ width: 200 }} mode="inline" items={items} />
      </div>
    </Drawer>
  );
}
