import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function UpdateProduct({
  updateProductData,
  updateModalSetting,
  handlePageUpdate
}) {
  const { _id, name, manufacturer, description, stock } = updateProductData;
  const [product, setProduct] = useState({
    productID: _id,
    name: name,
    manufacturer: manufacturer,
    description: description,
    stock: stock,
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    console.log(key);
    setProduct({ ...product, [key]: value });
  };

  const updateProduct = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/product/update`,
        product
      );
      if (result.data) {
        toast.success("Product Updated Successfully");
        setOpen(false);
        handlePageUpdate();
        // addProductModalSetting();
      } else {
        toast.error("Failed to Update Product");
      }
    } catch (error) {
      toast.error("Failed to Update Product");
      console.error(error);
    }
  };

  return (
    // Modal
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
              <Plus className="text-blue-500" aria-hidden="true" />
              Add Product
            </div>
          </Dialog.Title>
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex. Apple iMac 27&ldquo;"
                />
              </div>
              <div>
                <label
                  htmlFor="manufacturer"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Manufacturer
                </label>
                <input
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  value={product.manufacturer}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex. Apple"
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block  text-sm font-medium "
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={product.stock}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter stock quantity eg:500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="5"
                  name="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write a description..."
                  value={product.description}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  Standard glass, 3.8GHz 8-core 10th-generation
                  Intel Core i7 processor, Turbo Boost up to 5.0GHz,
                  16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with
                  8GB of GDDR6 memory, 256GB SSD storage, Gigabit
                  Ethernet, Magic Mouse 2, Magic Keyboard - US
                </textarea>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update product
              </button> */}
              {/* <button
                type="button"
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Delete
              </button> */}
            </div>
          </form>
        </Dialog.Panel>
      </Transition.Child>
    </div>
  </Dialog>
</Transition.Root>
  );
}
