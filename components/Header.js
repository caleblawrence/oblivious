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
          font-size: 80px;
          margin-bottom: 0;
          margin-top: 5px;
        }

        .tagLine {
          margin-top: 0;
          color: #656464;
          margin-bottom: 0;
        }

        @media only screen and (max-width: 768px) {
          .logo {
            font-size: 50px;
            margin-bottom: 5px;
          }
        }
      `}</style>
    </div>
  );
}

export default Header;
