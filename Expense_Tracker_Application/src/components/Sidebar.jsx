import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <nav className="sidebar">
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/incomes">Income</NavLink>
          </li>
          <li>
            <NavLink to="/expenses">Expanse</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add Expenses / Incomes</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search Expenses / Incomes</NavLink>
          </li>
        </ul>
      </nav>

      <style>
        {`
          .sidebar {
            width: 200px;
            background-color: #f3f3f3;
            height: calc(100vh - 120px);
            padding-top: 1rem;
          }

          .sidebar ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .sidebar li {
            margin: 1rem 0;
          }

          .sidebar a {
            text-decoration: none;
            color: #333;
            padding: 0.5rem 1.5rem;
            display: block;
          }

          .sidebar a.active {
            background-color: #0078d7;
            color: white;
            border-radius: 4px;
          }

          .sidebar a:hover {
            background-color: #ddd;
          }
        `}
      </style>
    </>
  );
}

export default Sidebar;
