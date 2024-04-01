import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <br />
      <br />
      <main >
        

        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Turiyam Lifestyles",
  description: "An online growth opportunity for those who are willing to earn by work from home",
  keywords: "Work from Home, Online business, Network Marketing, Digital Business, Direct Selling",
  author: "Adnan",
};

export default Layout;