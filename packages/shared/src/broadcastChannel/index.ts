import { BroadcastChannel } from "broadcast-channel";

export const closeBc = new BroadcastChannel<Record<string, any>>("close");
export const reloadBc = new BroadcastChannel<Record<string, any>>("reload");
export const tabBc = new BroadcastChannel<{ systemId?: string; title?: string }>(
  "tabs"
);

export const closeBcListener = ({
  before,
  after,
}: {
  before?: Function;
  after?: Function;
}={}) => {
  closeBc.onmessage = function () {
    if(document.visibilityState!=='visible'){
        before && before();
        window.close();
        after && after();
    }

  };
};

export const reloadBcListener = ({
    before,
    after,
  }: {
    before?: Function;
    after?: Function;
  }={}) => {
    closeBc.onmessage = function () {
        if(document.visibilityState!=='visible'){
            before && before();
            window.location.reload()
            after && after();
        }
      
    };
  };

export const tabBcPostMessage = (data?:{
    systemId?:string;
    title?:string;
})=>{
    if(data && data.systemId && data.title){
        tabBc.postMessage(data)
    }

}
