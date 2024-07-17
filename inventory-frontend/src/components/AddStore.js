import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import UploadImage from "./UploadImage";
import AuthContext from "../AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function AddStore({fetchData}) {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    userId: authContext.user,
    name: "",
    category: "",
    address: "",
    city: "",
    image: "https://res.cloudinary.com/dhm9hywhz/image/upload/v1720782293/shop_image_eewf3f.avif",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const addProduct = async() => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/store/add`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data) {
        toast.success("STORE ADDED");
        setOpen(false); // Close the modal or form
        await fetchData()
      } else {
        toast.error("Failed to add store");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while adding the store");
    }
  };



  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity text-black backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                                               <div className="flex items-center gap-2">
                          {" "}
                          <Plus className=" text-blue-500" aria-hidden="true" />
                          Add Store
                        </div>
                      </Dialog.Title>
                      <form action="#"className="mt-4 space-y-5 w-full">
                        
                          <div>
                            <label
                              htmlFor="name"
                              className="block  text-sm font-medium"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={form.name}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Enter Store Name"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="city"
                              className="block  text-sm font-medium"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              value={form.city}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Enter City Name"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="category"
                              className="block  text-sm font-medium"
                            >
                              Category
                            </label>
                            <select
                              id="category"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  category: e.target.value,
                                })
                              }
                            >
                              <option selected="" value="Electronics">
                                Electronics
                              </option>
                              <option value="Groceries">Groceries</option>
                              <option value="Wholesale">WholeSale</option>
                              <option value="SuperMart">SuperMart</option>
                              <option value="Phones">Phones</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="address"
                              className="block  text-sm font-medium"
                            >
                              Address
                            </label>
                            <textarea
                              id="address"
                              rows="5"
                              name="address"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Write a address..."
                              value={form.address}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>

                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={addProduct}
                  >
                    Add Store
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
