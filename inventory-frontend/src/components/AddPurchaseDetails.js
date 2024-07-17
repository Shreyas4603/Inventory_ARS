import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Plus } from "lucide-react";

export default function AddPurchaseDetails({
  addSaleModalSetting,
  products,
  handlePageUpdate,
  authContext,
}) {
  const [purchase, setPurchase] = useState({
    userID: authContext.user,
    productID: "",
    quantityPurchased: "",
    purchaseDate: "",
    totalPurchaseAmount: "",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setPurchase({ ...purchase, [key]: value });
  };

  const addSale = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/purchase/add`,
        purchase
      );
      if (result.status === 200 && result.data) {
        toast.success("Purchase Added Successfully");
        handlePageUpdate();
        addSaleModalSetting();
      } else {
        toast.error("Failed to Add Purchase. Please check the data.");
      }
    } catch (error) {
      toast.error("Failed to Add Purchase due to an unexpected error.");
      console.error(error);
    }
  };

  return (
    <>  
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity text-black backdrop-blur-sm"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    {" "}
                    <Plus className=" text-blue-500" aria-hidden="true" />
                    Purchase Details
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Fill out the form below to add a new purchase.
                  </p>
                </div>
                <form className="mt-4 space-y-5">
                  <div>
                    <label
                      htmlFor="productID"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <select
                      id="productID"
                      name="productID"
                      value={purchase.productID}
                      onChange={(e) =>
                        handleInputChange("productID", e.target.value)
                      }
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>Select Products</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="quantityPurchased"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity Purchased
                    </label>
                    <input
                      type="number"
                      name="quantityPurchased"
                      id="quantityPurchased"
                      value={purchase.quantityPurchased}
                      onChange={(e) =>
                        handleInputChange("quantityPurchased", e.target.value)
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="0 - 999"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="totalPurchaseAmount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Total Purchase Amount
                    </label>
                    <input
                      type="number"
                      name="totalPurchaseAmount"
                      id="totalPurchaseAmount"
                      value={purchase.totalPurchaseAmount}
                      onChange={(e) =>
                        handleInputChange("totalPurchaseAmount", e.target.value)
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Rs 299"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="purchaseDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      name="purchaseDate"
                      id="purchaseDate"
                      value={purchase.purchaseDate}
                      onChange={(e) =>
                        handleInputChange("purchaseDate", e.target.value)
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </form>
                <div className="items-center px-4 py-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={addSale}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    onClick={() => addSaleModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
