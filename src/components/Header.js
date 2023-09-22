import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className="header mt-2">
        <h2>Simple Todo App</h2>
        <Link to="/new">
          <span className="add-new">Add Task</span>
        </Link>
      </div>
    </>
  );
}

export default Header;
