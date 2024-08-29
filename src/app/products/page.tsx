// /* eslint-disable @next/next/no-img-element */
// "use client";
// import { Table, Button, Pagination } from "antd";
// import React, { useState, useEffect } from "react";
// import PageTitle from "@/components/PageTitle";
// import { useRouter } from "next/navigation";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   brand: string;
//   category: string;
//   images: string[];
//   thumbnail: string;
// }

// const ProductsPage: React.FC = () => {
//   const [data, setData] = useState<Product[]>([]);
//   const [total, setTotal] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const pageSize = 10;
//   const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage]);

//   const fetchProducts = async () => {
//     const response = await fetch(
//       `https://dummyjson.com/products?limit=${pageSize}&skip=${
//         (currentPage - 1) * pageSize
//       }`
//     );
//     const result = await response.json();
//     setData(result.products);
//     setTotal(result.total);
//   };

//   const handleCompare = (product: Product) => {
//     router.push(`/CompareProduct?productId=${product.id}`);
//   };

//   const columns = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       sorter: (a: Product, b: Product) => a.price - b.price,
//     },
//     {
//       title: "Discount Percentage",
//       dataIndex: "discountPercentage",
//       key: "discountPercentage",
//     },
//     {
//       title: "Brand",
//       dataIndex: "brand",
//       key: "brand",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Image",
//       dataIndex: "thumbnail",
//       key: "thumbnail",
//       render: (text: string) => (
//         <img
//           src={text}
//           alt="product thumbnail"
//           style={{ width: 50, height: 50 }}
//         />
//       ),
//     },
//     {
//       title: "Compare",
//       key: "compare",
//       render: (text: any, record: Product) => (
//         <Button onClick={() => handleCompare(record)} type="primary">
//           Compare
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="flex flex-col gap-5 w-full">
//       <PageTitle title="Product Details" />
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={false}
//         rowKey="id"
//       />
//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={total}
//         onChange={(page) => setCurrentPage(page)}
//         showSizeChanger={false}
//       />
//     </div>
//   );
// };

// export default ProductsPage;

/* eslint-disable @next/next/no-img-element */
"use client";
import { Table, Button, Pagination } from "antd";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: string;
  images: string[];
  thumbnail: string;
}

const ProductsPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${pageSize}&skip=${
        (currentPage - 1) * pageSize
      }`
    );
    const result = await response.json();
    setData(result.products);
    setTotal(result.total);
  };

  const handleCompare = (product: Product) => {
    router.push(`/CompareProduct?productId=${product.id}`);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text: string) => (
        <img
          src={text}
          alt="product thumbnail"
          style={{ width: 50, height: 50, borderRadius: "4px" }}
        />
      ),
    },
    {
      title: "Compare",
      key: "compare",
      render: (text: any, record: Product) => (
        <Button onClick={() => handleCompare(record)} type="primary">
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <PageTitle title="Product Details" />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ProductsPage;
