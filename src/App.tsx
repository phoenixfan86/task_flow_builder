import './App.css';
import FlowCanvas from './components/FlowCanvas/FlowCanvas';
import AddNodeBtn from './components/AddNodeBtn/AddNodeBtn';
import SideBar from './components/Sidebar/Sidebar';

function App() {

  return (
    <>
      <section>
        <SideBar />
        <AddNodeBtn />
        <FlowCanvas />
      </section>

    </>
  )
}

export default App
