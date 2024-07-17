import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";
import axios from "axios";
import { IndianRupee } from "lucide-react";

function PurchaseDetails() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  const fetchPurchaseData = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/purchase/get/${authContext.user}`
      )
      .then((response) => {
        setAllPurchaseData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchProductsData = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/product/get/${authContext.user}`
      )
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const addSaleModalSetting = () => {
    setShowPurchaseModal(!showPurchaseModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <section className="py-10 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-8">
          <h1 className="p-5 text-3xl font-bold">Purchase Details</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-max h-min"
            onClick={addSaleModalSetting}
          >
            Add Purchase
          </button>
        </div>
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}

        <div className="overflow-x-auto rounded-lg border bg-white ">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity Purchased</th>
                <th className="px-4 py-2">Purchase Date</th>
                <th className="px-4 py-2">Total Purchase Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchase.map((element, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {element.ProductID?.name}
                  </td>
                  <td className="border px-4 py-2">
                    {element.QuantityPurchased}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(element.PurchaseDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <p className="flex items-center ">
                      <IndianRupee size={13} />
                      {element.TotalPurchaseAmount}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PurchaseDetails;
