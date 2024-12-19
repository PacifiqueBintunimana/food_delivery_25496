/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import backgroundImage from '../assets/assets/image/food-background.jpg';
import axios from 'axios';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await axios.get('http://localhost:8082/api/manager');
        // Update state with dashboard data
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/login');
    };
    
    
    fetchDashboardData();
  },
   []);
   const [foods, setfoods] = useState([]);
const [filteredFoods, setFilterefoods] = useState([]);
const [editingFood, setEditingFood] = useState(null);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [sortOrder, setSortOrder] = useState("asc");
const [filter, setFilter] = useState("");
const [filterType, setFilterType] = useState("title");

const fetchFoods = async () => {
    setLoading(true);
    try {
        const response = await axios.get("http://localhost:8082/manager/food");
        setfoods(response.data);
        setFilterefoods(response.data);
    } catch (error) {
        console.error("Error fetching food:", error);
        setMessage("Failed to load food. Please try again later.");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchFoods();
}, []);

const handlePostFood = async (event) => {
    event.preventDefault();
    const newFood = {
      name: event.target.name.value,
      description: event.target.description.value,
      restaurant: event.target.restaurant.value,
      foodType: event.target.foodType.value,
  };

  try {
    const response = await axios.post("http://localhost:8082/manager/food", newFood);
    if (response.status === 201) {
        setMessage("Food posted successfully!");
        setfoods((prevFoods) => [...prevFoods, response.data]);
        setFilterefoods((prevFoods) => [...prevFoods, response.data]);
        event.target.reset();
    }
} catch (error) {
    console.error("Error posting food:", error.response ? error.response.data : error.message);
    setMessage("Failed to post food. Please try again later.");
}
};

const handleUpdateFood = async (event) => {
    event.preventDefault();
    const updatedFood = {
      name: event.target.name.value,
      description: event.target.description.value,
      restaurant: event.target.restaurant.value,
      foodType: event.target.foodType.value,
    };

    try {
        const response = await axios.put(
            `http://localhost:8082/manager/food/${editingFood.id}`,
            updatedFood
        );
        if (response.status === 200) {
            setMessage("food updated successfully!");
            fetchFoods();
            setEditingFood(null);
        }
    } catch (error) {
        console.error("Error updating food:", error.response ? error.response.data : error.message);
        setMessage("Failed to update food. Please try again later.");
    }
};

const handleDeleteFood = async (id) => {
  try {
      const response = await axios.delete(`http://localhost:8082/manager/food/${id}`);
      if (response.status === 200) {
          setMessage("Food deleted successfully!");
          fetchFoods();
      }
  } catch (error) {
      console.error("Error deleting food:", error.response ? error.response.data : error.message);
      setMessage("Failed to delete food. Please try again later.");
  }
};

const sortFoodsByTitle = () => {
    const sortedfoods = [...filteredFoods].sort((a, b) =>
        sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setFilteredFoods(sortedfoods);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};

const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = foods.filter((food) =>
        food[filterType].toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredFoods(filtered);
};

const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilter("");
    setFilteredFoods(foods);
}
 

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                background: `url(${backgroundImage}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                color: '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                margin: 0
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '2rem',
                    maxWidth: '1000px',
                    width: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center'
                }}
            >
                <header>
                    <h1>Food Management Dashboard</h1>
                    <p>Manage your food items below.</p>
                </header>

                {message && <div className="message">{message}</div>}

                <div className="content">
                    <div className="form-container">
                        <h2>{editingFood ? "Edit Food Item" : "Post a New Food Item"}</h2>
                        <form onSubmit={editingFood ? handleUpdateFood : handlePostFood}>
                        <input
                                type="text"
                                name="name"
                                placeholder="Food Name"
                                defaultValue={editingFood?.name || ""}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                defaultValue={editingFood?.description || ""}
                                required
                            />
                            <input
                                type="text"
                                name="restaurant"
                                placeholder="Restaurant"
                                defaultValue={editingFood?.restaurant || ""}
                                required
                            />
                            <select name="foodType" defaultValue={editingFood?.foodType || ""} required>
                                <option value="">Select Food Type</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                            </select>
                            <button type="submit">{editingFood ? "Update Food" : "Post Food"}</button>
                        
                        </form>
                    </div>

                    <div className="table-container">
                        <div className="filter-bar">
                            <input
                                type="text"
                                placeholder={`Search by ${filterType}`}
                                value={filter}
                                onChange={handleFilterChange}
                            />
                            <select value={filterType} onChange={handleFilterTypeChange}>
                                <option value="name">Name</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="foodType">Food Type</option>
                            </select>
                        </div>

                        <h2>Your Food Items</h2>
                        {loading ? (
                            <p>Loading food items...</p>
                        ) : (
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th onClick={sortFoodsByTitle} style={{ cursor: "pointer" }}>
                                            name <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                        </th>
                                        <th>Description</th>
                                        <th>restaurant</th>
                                        <th>foodType</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFoods.map((food) => (
                                        <tr key={food.id}>
                                            <td>{food.title}</td>
                                            <td>{food.description}</td>
                                            <td>{food.category}</td>
                                            <td>{food.availability}</td>
                                            <td>
                                                <button onClick={() => setEditingFood(food)}>Edit</button>
                                                <button onClick={() => handleDeleteFood(food.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
                    Logout
                </button>
            </div>

            <style>
                {`
                    .form-container, .table-container {
                        padding: 20px;
                        margin-bottom: 20px;
                    }

                    .form-container form input,
                    .form-container form select,
                    .form-container form button {
                        display: block;
                        width: 100%;
                        margin: 8px 0;
                        padding: 10px;
                        font-size: 14px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }

                    .table-container .filter-bar {
                        margin-bottom: 20px;
                        display: flex;
                        gap: 10px;
                    }

                    .table-container .filter-bar input,
                    .table-container .filter-bar select {
                        padding: 10px;
                        font-size: 14px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        width: 150px;
                    }

                    .custom-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    .custom-table th, .custom-table td {
                        padding: 10px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                        font-size: 14px;
                    }

                    .custom-table th {
                        background-color: #00796b;
                        color: white;
                    }

                    .custom-table tr:hover {
                        background-color: #f1f1f1;
                    }

                    button {
                        padding: 8px 16px;
                        background-color: #00796b;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 12px;
                    }

                    button:hover {
                        background-color: #004d40;
                    }

                    @media (max-width: 768px) {
                        .form-container, .table-container {
                            width: 100%;
                        }

                        .custom-table th,
                        .custom-table td {
                            font-size: 12px;
                            padding: 8px;
                        }
                    }
                `}
            </style>
        </div>
        
);

}

export default ManagerDashboard;
