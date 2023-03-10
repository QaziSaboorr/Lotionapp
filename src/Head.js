function Header({ toggleSidebar }) {
  return (
    <div>
      <button className="close" onClick={toggleSidebar}>
        Change View
      </button>
      <h1 className="head">Potion </h1>
      <p id="text">Like notion but worse</p>
    </div>
  );
}
export default Header;
