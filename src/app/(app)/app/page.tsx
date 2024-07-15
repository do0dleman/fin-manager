import {
  ResizableHandle,
  ResizablePanelGroup,
} from "~/app/_components/ui/resizable";
import Toolbar from "../_modules/Toolbar";
import Board from "../_modules/Board";

function App() {
  return (
    <ResizablePanelGroup direction="horizontal" className="!h-[100dvh]">
      <Toolbar />
      <ResizableHandle className="bg-white" />
      <Board />
    </ResizablePanelGroup>
  );
}
export default App;
