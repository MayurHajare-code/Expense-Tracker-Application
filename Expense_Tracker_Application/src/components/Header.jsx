function Header() {
  return (
    <>
      <header className="header">
        <h1>Expense Tracker Application</h1>
      </header>

      <style>
        {`
          .header {
            background-color: #0078d7;
            color: white;
            padding: 1rem 1.5rem;
          }
        `}
      </style>
    </>
  );
}

export default Header;
