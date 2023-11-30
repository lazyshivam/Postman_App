import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../services/helper";

const Home = ({loggedInUser}) => {
  const [apiLinks, setApiLinks] = useState([]);
  const [newLink, setNewLink] = useState({title:"", url: "", method: "" });

  // Fetch saved API links from the server
  useEffect(() => {
     axios.get(`${BASE_URL}/api/data/apiLinks`,{withCredentials:true}).then((response) => {
      if(response.status===200){
        return response.data;
      }
      else {
        throw new Error (response.status,response.statusText)
      }
     }).then((data) => {
      setApiLinks(data);
      // console.log(data);
     }).catch((err)=>{
      console.error(err);
     })
  }, []);

  // Deleting the saved API links from the server
  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/api/data/apiLinks/${id}`,{withCredentials:true}).then((response)=>{
     if(response.status===200){
      console.log(response)
      setApiLinks(apiLinks.filter((link) => link._id !== id));
     }
     else{
      throw new Error (response.status,response.statusText)
     }
    }).catch((err)=>{
      console.error(err);
    })
    
  };
  const [error,setError]=useState('')
 
  // Saving the API links to the server
  const handleSave = () => {
    if (newLink.title.trim()==='' || newLink.url.trim() === '' || newLink.method.trim() === '') {
      setError('There is an empty field.');
      return;
    }
     axios.post(`${BASE_URL}/api/data/apiLinks`,newLink,{withCredentials: true}).then((response)=>{
      console.log(response.data);
      setApiLinks([...apiLinks, response.data]);
      setNewLink({title:"", url: "", method: "" });
      setError('')
     }).catch((error)=>{
      console.error(error);
     })
    
  };
 
  const [searchTerm,setSearchTerm]=useState('');

   const [filterData,setFilterData]=useState(apiLinks);

  //  filtering the saved api links 
  useEffect(()=>{
    const filteredLinks=apiLinks.filter((link)=>{
      return link.title.toLowerCase().includes(searchTerm.toLowerCase())
    });
    setFilterData(filteredLinks);
    console.log(filteredLinks);
  },[searchTerm,apiLinks])
  return (
    <div className="mx-12 h-auto my-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">
          Welcome, {loggedInUser}!
        </h1>
        <p className="text-lg text-gray-600">
          Explore and manage your saved API links below. Keep building amazing
          things!
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Save New API Link</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form className="flex flex-wrap gap-y-5">
        <input
            type="text"
            required
            className="mr-2 p-2 border focus:border-2 focus:outline-none focus:border-gray-300 rounded"
            placeholder="Enter title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          />
          <input
            type="text"
            required
            className="mr-2 p-2 border focus:border-2 focus:outline-none focus:border-gray-300 rounded"
            placeholder="Enter URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          />
          <select
            required
            className="mr-2 p-2 border text-gray-400 focus:border-2 focus:outline-none focus:border-gray-300 rounded"
            value={newLink.method}
            onChange={(e) => setNewLink({ ...newLink, method: e.target.value })}
          >
            <option value=""  disabled>Select Method</option>
            <option className="text-green-400" value="GET">GET</option>
            <option className="text-orange-400" value="POST">POST</option>
            <option className="text-blue-400" value="PUT">PUT</option>
            <option className="text-red-400" value="DELETE">DELETE</option>
            <option className="text-violet-400" value="PATCH">PATCH</option>

           
          </select>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Search API Links</h2>
        <input
          type="text"
          className="mr-2 p-2 border focus:border-2 focus:outline-none focus:border-gray-300 rounded"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
       
      {filterData.length === 0 ? (
        <p className="text-lg">
          No saved API links yet.
        </p>
      ) : (
        <ul className="overflow-y-auto  drop-shadow-md border p-4 h-96">
          {filterData.map((link) => (
            <li key={link._id} className="mb-4 border drop-shadow-md  p-4 rounded">
              <div className="">
                <span className="font-semibold text-red-300">Title:</span> {link.title}
              </div>
              <div>
                <span className="font-semibold">URL:</span> {link.url}
              </div>
              <div>
                <span className="font-semibold">Method:</span> {link.method}
              </div>
              <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(link._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
