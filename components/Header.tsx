function Header() {
  return (
    <div className="container">
      <h1 className="logo">Oblivious</h1>
      <p className="tagLine">
        Follow a few cool people without actually being on Twitter.
      </p>
      <br />

      <style jsx>{`
        .logo {
          font-size: 50px;
          margin-bottom: 5px;
        }

        .tagLine {
          margin-top: 0;
          color: #656464;
        }
      `}</style>
    </div>
  );
}

export default Header;
