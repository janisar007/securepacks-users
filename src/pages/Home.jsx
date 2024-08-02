import React, { useEffect, useState } from "react";
// import ListingItem from "../components/ListingItem";
import axios from "axios"


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
    // const [page, setPage] = useState(0);
    // const pageSize = 3;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/api/users/users-data', {
    //                 params: { start: page * pageSize, limit: pageSize }
    //             });
    //             setData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [page]);

    // const handleNext = () => {
    //     setPage(prevPage => prevPage + 1);
    // };


    const fetchData = async () => {
      try {
          const response = await axios.get('https://securepacks-users-api.onrender.com/api/users/users-data');
          const dataArray = Object.values(response.data);
          console.log(dataArray)
          console.log(typeof dataArray)
          setData(dataArray);
          setLoading(true)
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

    return (
        <div className="flex w-full items-center justify-center flex-col">
            <ul className="flex flex-col w-[90%] bg-white gap-3 m-5">
            {loading &&  <div className="flex w-full bg-[#64748B] border-black border-[1px] p-3 shadow-md text-white">
                <div className="flex w-[33%] items-center justify-center bg-[#64748B] ">Name</div>
                <div className="flex w-[33%] items-center justify-center bg-[#64748B] ">Email</div>
                <div className="flex w-[33%] items-center justify-center bg-[#64748B] ">Source</div>
              </div>}
                {data.map((item, index) => (
                    <div className="flex w-full  border-black border-[1px] p-3 shadow-md">
                      <div className="flex w-[33%] items-center justify-center bg-white ">{item.name}</div>
                      <div className="flex w-[33%] items-center justify-center bg-white ">{item.email}</div>
                      <div className="flex w-[33%] items-center justify-center bg-white ">{item.source}</div>
                    </div>
                ))}
            </ul>
            <button className="bg-blue-600 text-white p-2 rounded-md" onClick={fetchData}>Get Users</button>
        </div>
    );
};

export default Home;
