import ReactDOM from "react-dom/client";
import DevDrawer from "./DevDrawer";
export default class DevSdk {
  systemId = "";
  prefixPath = "";
  container = document.createElement("div");

  constructor({
    systemId,
    prefixPath = "",
  }: {
    systemId: string;
    prefixPath?: string;
  }) {
    this.systemId = systemId;
    this.prefixPath = prefixPath;
  }

  init() {
    const root = ReactDOM.createRoot(this.container as HTMLElement);
    root.render(
      <DevDrawer systemId={this.systemId} prefixPath={this.prefixPath} />
    );
  }
}
