import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Apple", "Knorr", "Shoop", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 1, 5, 8, 9, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  // Update Chart Data
  const updateChartData = (salesData) => {
    setChart({
      ...chart,
      series: [
        {
          name: "Monthly Sales Amount",
          data: [...salesData],
        },
      ],
    });
  };

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
  }, []);

  // Fetching total sales amount
  const fetchTotalSaleAmount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/sales/get/${authContext.user}/totalsaleamount`
      );
      setSaleAmount(response.data.totalSaleAmount);
    } catch (error) {
      console.error("Error fetching total sales amount:", error);
    }
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/purchase/get/${authContext.user}/totalpurchaseamount`
      );
      setPurchaseAmount(response.data.totalPurchaseAmount);
    } catch (error) {
      console.error("Error fetching total purchase amount:", error);
    }
  };

  // Fetching all stores data
  const fetchStoresData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/store/get/${authContext.user}`
      );
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    }
  };

  // Fetching Data of All Products
  const fetchProductsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/product/get/${authContext.user}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  // Fetching Monthly Sales
  const fetchMonthlySalesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/sales/getmonthly`
      );
      updateChartData(response.data.salesAmount);
    } catch (error) {
      console.error("Error fetching monthly sales data:", error);
    }
  };

  return (
    <div className=" w-full p-5 text-black"> 
    <p className="p-5 text-3xl font-bold">Dashboard</p>
      <section className="h-[90vh]   mx-auto    grid-rows-2 text-black gap-5">

        <div className="h-full w-full grid grid-cols-3 grid-rows-2 gap-5">
        <div className="w-full p-5 col-span-2">
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            width="400"
          />
        </div>
          <article className="flex flex-col gap-4 rounded-lg border  border-gray-500     p-6  ">
            <div>
              <strong className="block text-sm font-medium ">Sales</strong>

              <p>
                <span className="text-2xl font-medium ">
                  Rs {" " + saleAmount}
                </span>


              </p>
            </div>
          </article>

          <article className="flex flex-col  gap-4 rounded-lg border border-gray-500     p-6 ">
            <div>
              <strong className="block text-sm font-medium ">Purchase</strong>

              <p>
                <span className="text-2xl font-medium ">
                  {" "}
                  Rs {purchaseAmount}{" "}
                </span>


              </p>
            </div>
          </article>
          <article className="flex flex-col   gap-4 rounded-lg border border-gray-500      p-6 ">
            <div>
              <strong className="block text-sm font-medium ">
                Total Products
              </strong>

              <p>
                <span className="text-2xl font-medium ">
                  {" "}
                  {products.length}{" "}
                </span>

                {/* <span className="text-xs "> from $404.32 </span> */}
              </p>
            </div>
          </article>
          <article className="flex flex-col   gap-4 rounded-lg border border-gray-500      p-6 ">
            <div>
              <strong className="block text-sm font-medium ">
                Total Stores
              </strong>

              <p>
                <span className="text-2xl font-medium "> {stores.length} </span>

                {/* <span className="text-xs "> from 0 </span> */}
              </p>
            </div>
          </article>
        </div>

      </section>
    </div>
  );
}

export default Dashboard;
