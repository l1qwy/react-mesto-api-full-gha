export default function Footer({ name }) {
  return (
    <footer className="footer">
      {name === "singIn" || name === "signUp" ? '' : <p className="footer__copyring">© 2023 Коровин Иван</p>}
    </footer>
  );
}
