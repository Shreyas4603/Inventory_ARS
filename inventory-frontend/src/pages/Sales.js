import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from 'sonner';

import AddSale from "../components/AddSale";
import AuthContext from "../AuthContext";
import { IndianRupee } from "lucide-react";

function Sales() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [sales, setAllSalesData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSalesData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetching Data of All Sales
  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/sales/get/${authContext.user}`);
      if (response.data) {
        setAllSalesData(response.data);
        // toast.success('Sales data fetched successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error fetching sales data');
    }
  };

  // Fetching Data of All Products
  const fetchProductsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/get/${authContext.user}`);
      if (response.data) {
        setAllProducts(response.data);
        // toast.success('Products data fetched successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error fetching products data');
    }
  };

  // Fetching Data of All Stores
  const fetchStoresData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/store/get/${authContext.user}`);
      if (response.data) {
        setAllStores(response.data);
        // toast.success('Stores data fetched successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error fetching stores data');
    }
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setShowSaleModal(!showSaleModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <section className="py-10 w-full">

    <div className="container mx-auto px-4">
      <div className="flex justify-between mb-8">
        <h1 className="p-5 text-3xl font-bold">Sales Details</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-max h-min"
          onClick={addSaleModalSetting}
        >
          Add Sale
        </button>
      </div>
      {showSaleModal && (
        <AddSale
          addSaleModalSetting={addSaleModalSetting}
          products={products}
          stores={stores}
          handlePageUpdate={handlePageUpdate}
          authContext={authContext}
        />
      )}

      <div className="overflow-x-auto rounded-lg border bg-white ">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Store Name</th>
              <th className="px-4 py-2">Stock Sold</th>
              <th className="px-4 py-2">Sales Date</th>
              <th className="px-4 py-2">Total Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((element, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{element.ProductID?.name}</td>
                <td className="border px-4 py-2">{element.StoreID?.name}</td>
                <td className="border px-4 py-2">{element.StockSold}</td>
                <td className="border px-4 py-2">
                  {new Date(element.SaleDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 flex items-center" ><IndianRupee size={13}/>{element.TotalSaleAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
  );
}

export default Sales;
