import { useEffect, useState, useContext, useCallback } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { ThemeContext } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const CATEGORIES_URL = "https://fakestoreapi.com/products/categories";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1); // Track pagination
  const [hasMore, setHasMore] = useState(true); // To control further API calls
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || '';
    const search = queryParams.get('search') || '';
    
    setSelectedCategory(category);
    setSearchTerm(search);
    fetchCategories();
    fetchProductData(category, search, 1, true); // Start with page 1 and reset the list
  }, [location.search]);

  async function fetchCategories() {
    const res = await fetch(CATEGORIES_URL);
    const data = await res.json();
    setCategories(data);
  }

  const fetchProductData = async (category, search, page, reset = false) => {
    setLoading(true);
    let fetchURL = `${API_URL}?limit=10&page=${page}`;
    
    // If a category is selected, fetch from the category-specific API endpoint
    if (category) {
      fetchURL = `https://fakestoreapi.com/products/category/${category}?limit=10&page=${page}`;
    }

    try {
      const res = await fetch(fetchURL);
      const data = await res.json();

      setPosts(prevPosts => reset ? data : [...prevPosts, ...data]);
      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error occurred");
      setPosts([]);
    }
    setLoading(false);
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); // Increase the page number
    }
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      fetchProductData(selectedCategory, searchTerm, page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    navigate(`?category=${category}&search=${searchTerm}`);
    setPage(1);
    fetchProductData(category, searchTerm, 1, true); // Fetch new category products, reset to page 1
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    navigate(`?category=${selectedCategory}&search=${search}`);
    setPage(1);
    fetchProductData(selectedCategory, search, 1, true); // Fetch new search products, reset to page 1
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-4`}>
      <input 
        type="text" 
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Products"
        className="border rounded p-2 mb-4 w-full"
      />
      <select onChange={handleCategoryChange} className="border rounded p-2 mb-4">
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      {loading && page === 1 ? (
        <Spinner />
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">No Data Found</p>
        </div>
      )}
      {loading && page > 1 && <Spinner />} {/* Show spinner for subsequent page loads */}
    </div>
  );
};

export default Home;
