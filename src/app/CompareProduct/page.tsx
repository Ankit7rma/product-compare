"use client";
import { Modal, Table, Button, Row, Col, Typography, message } from "antd";
import React, { useState, useEffect } from "react";
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

const CompareProductsPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products`);
    const result = await response.json();
    setData(result.products);
  };

  const handleAddMore = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelectProduct = (product: Product) => {
    if (selectedProducts.length < 4) {
      if (!selectedProducts.find((p) => p.id === product.id)) {
        setSelectedProducts([...selectedProducts, product]);
      } else {
        message.error("Product already added");
      }
    } else {
      message.error("Cannot add more than four products");
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const comparisonColumns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
    },
    ...selectedProducts.map((product) => ({
      title: product.title,
      dataIndex: product.id,
      key: product.id,
      render: (text: any) => (
        <div>
          <p>Price: ${product.price}</p>
          <p>Discount: {product.discountPercentage}%</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
        </div>
      ),
    })),
  ];

  const comparisonData = [
    {
      attribute: "Price",
      ...Object.fromEntries(selectedProducts.map((p) => [p.id, `$${p.price}`])),
    },
    {
      attribute: "Discount",
      ...Object.fromEntries(
        selectedProducts.map((p) => [p.id, `${p.discountPercentage}%`])
      ),
    },
    {
      attribute: "Brand",
      ...Object.fromEntries(selectedProducts.map((p) => [p.id, p.brand])),
    },
    {
      attribute: "Category",
      ...Object.fromEntries(selectedProducts.map((p) => [p.id, p.category])),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <Button onClick={() => router.push("/products")} type="primary">
        Back to Products
      </Button>
      <Button onClick={handleAddMore} type="primary">
        Add More
      </Button>

      <Row gutter={16} justify="start">
        {selectedProducts.map((product) => (
          <Col span={6} key={product.id}>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
            >
              <Typography.Title level={4} style={{ fontSize: "16px" }}>
                {product.title}
              </Typography.Title>
              <img
                src={product.thumbnail}
                alt="product thumbnail"
                style={{ width: "100%", borderRadius: "4px" }}
              />
              <p>Price: ${product.price}</p>
              <p>Discount: {product.discountPercentage}%</p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <Button
                onClick={() => handleRemoveProduct(product.id)}
                // type="danger"
                style={{ marginTop: "8px" }}
              >
                Remove
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      <Table
        dataSource={comparisonData}
        columns={comparisonColumns}
        pagination={false}
        rowKey="attribute"
        title={() => <Typography.Title level={3}>Comparison</Typography.Title>}
        style={{ marginTop: "20px" }}
      />

      <Modal
        title="Add More Products"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <Table
          dataSource={data}
          pagination={false}
          rowKey="id"
          columns={[
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "Action",
              key: "action",
              render: (text: any, record: Product) => (
                <Button
                  onClick={() => handleSelectProduct(record)}
                  type="primary"
                >
                  Add to Compare
                </Button>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default CompareProductsPage;
