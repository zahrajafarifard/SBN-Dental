"use client";

import React, { useState, useEffect } from "react";
import FirstComponent from "@/components/products/product/first-component";
import SecondComponent from "@/components/products/product/second-component";

import Header from "@/components/shared/header/header";
import RelatedProducts from "@/components/products/related-products/page";
import ContactUs from "@/components/shared/contact-us/contact-us";
import Titles from "@/components/shared/title/titles";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

interface ProductImage {
  mainImage: string;
  image1: string;
  image2: string;
  image3: string;
}

interface CategoryDetails {
  name: string;
}
interface Composition {
  id: number;
  title: string;
  description: string;
}
interface Detail {
  id: number;
  title: string;
  description: string;
}
interface Usage {
  id: number;
  title: string;
  description: string;
}

interface Product {
  CategoryId: number;

  productTitle: string;
  price: string;
  ProductImages: ProductImage[];
  keyWord1: string;
  keyWord2: string;
  keyWord3: string;
  bgColor: string;
  Category: CategoryDetails;
  mainDescriptionSectionOne: string;
  mainDescriptionItems: string;
  Compositions: Composition[];
  Details: Detail[];
  Usages: Usage[];
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { productId } = params;

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const _product = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const _data = await _response.json();

      setProduct(_data);
    };
    _product();
  }, [setProduct, productId]);

  return (
    <div className="">
      <Header header="محصولات" />

      <Titles />
      <FirstComponent product={product} />
      <SecondComponent
        compositions={product?.Compositions}
        details={product?.Details}
        usages={product?.Usages}
      />

      {product?.CategoryId && (
        <RelatedProducts category={product.CategoryId} productId={productId} />
      )}

      <ContactUs />
    </div>
  );
};

export default ProductPage;
