import React from "react";

const Footer = () => {
  return (
    <footer
      class="text-center text-white"
      style={{ backgroundColor: "#f1f1f1" }}
    >
      <div class="container pt-4">
        <section class="mb-4">
          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-facebook-f"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-twitter"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-google"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-instagram"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-linkedin"></i>
          </a>

          <a
            class="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i class="fab fa-github"></i>
          </a>
        </section>
      </div>

      <div
        class="text-center text-dark p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Summer Project:
        <a class="text-dark" href="https://mdbootstrap.com/">
          BCH
        </a>
      </div>
    </footer>
  );
};

export default Footer;
