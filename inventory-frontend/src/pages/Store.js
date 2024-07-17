import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";
import axios from "axios"; // Import axios
import { toast } from "sonner"; // Import toast from sonner

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/store/get/${authContext.user}`
      );
      if (response.data) {
        setAllStores(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch stores data");
    }
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <section className="py-10  w-full">
      <div className="container mx-auto px-4  ">
      <p className=" p-5 py-0 text-3xl font-bold">Stores</p>
        <div className="w-full     overflow-hidden">
          <div className="p-6 bg-white">
            <div className="flex justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                onClick={modalSetting}
              >
                Add Store
              </button>
            </div>
            {showModal && <AddStore fetchData={fetchData} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stores.map((store, index) => (
                <div
                  key={store._id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={store.image}
                    alt="Store"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{store.name}</h2>
                    <div className="mt-2">
                      <img
                        src={require("../assets/location-icon.png")}
                        alt="Location Icon"
                        className="inline-block mr-2 h-6 w-6"
                      />
                      <span>{`${store.address}, ${store.city}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Store;
