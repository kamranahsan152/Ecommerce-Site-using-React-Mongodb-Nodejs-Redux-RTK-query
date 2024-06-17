import React, { useCallback, useState } from "react";
import ProductItem from "../sections/product-item";
import HeaderTop from "../sections/header-top";
import Header from "../sections/header";
import Footer from "../sections/footer";
import SectionTitle from "../sections/section-title";
import { paths } from "../../../../paths";

const ProductPage = () => {
  const [searchKey, setsearchKey] = useState("");
  const handleSearch = useCallback((value: any) => {
    setsearchKey(value);
  }, []);

  return (
    <div>
      <HeaderTop />
      <Header
        isSearch={paths.client.productpage}
        onSearchChange={handleSearch}
      />
      <SectionTitle title="All Products" path="Home | Products" />
      <ProductItem searchValue={searchKey} />
      <Footer />
    </div>
  );
};

export default ProductPage;
