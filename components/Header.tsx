function Header() {
  return (
    <div className="container">
      <h1 className="logo2">Oblivious</h1>
      <p className="tagLine2">
        Follow a few cool people without actually being on Twitter.
      </p>
      <br />

      <style jsx global>{`
        .logo2 {
          font-size: 80px;
          margin-bottom: 5px;
        }

        .tagLine2 {
          margin-top: 0;
          color: #656464;
        }

        @media only screen and (max-width: 768px) {
          .logo2 {
            font-size: 50px;
            margin-bottom: 5px;
          }
        }
      `}</style>
    </div>
  );
}

export default Header;
