import { BrowserRouter as Router, NavLink} from 'react-router-dom'
import './css/index.css'

function App() {
  return (
    <div className="App">
      <Router>
        <NavLink to='/vue'>vue</NavLink>
        <NavLink to='/react'>React</NavLink>
      </Router>
    	{/* 微前端子应用渲染出口 */}
      <div id='container'></div>
    </div>
  );
}

export default App;