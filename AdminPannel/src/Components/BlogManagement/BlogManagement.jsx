import React, { useState } from "react";
import {
  FaThList,
  FaThLarge,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaSync,
  FaBookmark,
  FaTimes,
  FaChevronDown
} from "react-icons/fa";
import "./BlogManagement.css";

// Initial blog data
const initialBlogs = [
  {
    id: 1,
    title: "The Healing Power of Nature",
    description:
      "Discover how spending time in deep forests can improve mood, reduce stress, and bring total balance to your mind.",
    category: "Nature",
    categoryClass: "cat-nature",
    author: "Admin User",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    date: "23 May 2025",
    readTime: "5 min read",
    status: "Published",
    featured: true,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500"
  },
  {
    id: 2,
    title: "Benefits of Pure Forest Honey",
    description:
      "Unfiltered raw honey contains powerful antioxidants and enzymes. Here is how organic honey boosts your immunity.",
    category: "Honey",
    categoryClass: "cat-honey",
    author: "Admin User",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    date: "23 May 2025",
    readTime: "3 min read",
    status: "Published",
    featured: true,
    image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=500"
  },
  {
    id: 3,
    title: "Daily Habits for a Better You",
    description:
      "Simple morning rituals, proper hydration, and herbal nutrition habits to elevate physical vitality and peace.",
    category: "Health",
    categoryClass: "cat-health",
    author: "Admin User",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    date: "22 May 2025",
    readTime: "5 min read",
    status: "Published",
    featured: true,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500"
  },
  {
    id: 4,
    title: "The Art of Chocolate Making",
    description:
      "From bean to bar - the journey of craft chocolate making and what makes it so special.",
    category: "Chocolate",
    categoryClass: "cat-chocolate",
    author: "Admin User",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    date: "21 May 2025",
    readTime: "7 min read",
    status: "Draft",
    featured: false,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500"
  },
  {
    id: 5,
    title: "Healthy Recipes with Honey",
    description:
      "Easy and delicious recipes made with natural honey that are perfect for your daily diet.",
    category: "Recipes",
    categoryClass: "cat-recipes",
    author: "Admin User",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    date: "20 May 2025",
    readTime: "4 min read",
    status: "Published",
    featured: true,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500"
  },
  {
    id: 6,
    title: "Understanding Green Tea Benefits",
    description:
      "A deep dive into antioxidant properties of high-grade organic green tea leaves.",
    category: "Health",
    categoryClass: "cat-health",
    author: "Admin User",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    date: "19 May 2025",
    readTime: "6 min read",
    status: "Published",
    featured: false,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500"
  },
  {
    id: 7,
    title: "Organic Farm Life Essentials",
    description:
      "Exploring traditional sustainable farming methods and natural crop harvesting.",
    category: "Nature",
    categoryClass: "cat-nature",
    author: "Admin User",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    date: "18 May 2025",
    readTime: "4 min read",
    status: "Draft",
    featured: false,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500"
  }
];

const BlogManagement = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [viewMode, setViewMode] = useState("list");

  // Dropdown Filter States (Search Input removed)
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Modals state
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setCurrentPage(1);
    }
  };

  // Edit Action Save
  const handleEditSave = (e) => {
    e.preventDefault();
    setBlogs((prev) =>
      prev.map((item) => (item.id === editModalData.id ? editModalData : item))
    );
    setEditModalData(null);
  };

  // Filter Reset
  const handleFilterReset = () => {
    setSelectedCategory("All Categories");
    setSelectedStatus("All Status");
    setSelectedAuthor("All Authors");
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All Categories" || blog.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All Status" || blog.status === selectedStatus;
    const matchesAuthor =
      selectedAuthor === "All Authors" || blog.author === selectedAuthor;

    return matchesCategory && matchesStatus && matchesAuthor;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="BlogManagement dark-forest-theme">
      {/* Top Header Controls */}
      <div className="BlogManagement-header">
        <div className="BlogManagement-viewToggle">
          <button
            className={`BlogManagement-toggleBtn ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaThList className="btn-icon" /> List View
          </button>
          <button
            className={`BlogManagement-toggleBtn ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <FaThLarge className="btn-icon" /> Grid View
          </button>
        </div>

        <div className="BlogManagement-controls">
          {/* Category Dropdown */}
          <div className="BlogManagement-selectWrapper">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Categories">All Categories</option>
              <option value="Nature">Nature</option>
              <option value="Honey">Honey</option>
              <option value="Health">Health</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Recipes">Recipes</option>
            </select>
            <FaChevronDown className="select-arrow" />
          </div>

          {/* Status Dropdown */}
          <div className="BlogManagement-selectWrapper">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Status">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <FaChevronDown className="select-arrow" />
          </div>

          {/* Author Dropdown */}
          <div className="BlogManagement-selectWrapper">
            <select
              value={selectedAuthor}
              onChange={(e) => {
                setSelectedAuthor(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Authors">All Authors</option>
              <option value="Admin User">Admin User</option>
            </select>
            <FaChevronDown className="select-arrow" />
          </div>

          {/* Reset Filter Button */}
          <button
            className="BlogManagement-filterBtn"
            onClick={handleFilterReset}
            title="Reset All Filters"
          >
            <FaFilter /> Reset Filter
          </button>
        </div>
      </div>

      {/* VIEW 1: List View */}
      {viewMode === "list" ? (
        <div className="BlogManagement-tableContainer">
          <table className="BlogManagement-table">
            <thead>
              <tr>
                <th>#</th>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>AUTHOR</th>
                <th>DATE</th>
                <th>READ TIME</th>
                <th>STATUS</th>
                <th>FEATURED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{indexOfFirstBlog + index + 1}</td>
                    <td>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="BlogManagement-thumb"
                      />
                    </td>
                    <td className="title-cell">
                      <div className="title-text">{blog.title}</div>
                      <div className="desc-text">{blog.description}</div>
                    </td>
                    <td>
                      <span className={`category-badge ${blog.categoryClass}`}>
                        {blog.category}
                      </span>
                    </td>
                    <td>
                      <div className="author-cell">
                        <img src={blog.authorAvatar} alt={blog.author} />
                        <span>{blog.author}</span>
                      </div>
                    </td>
                    <td>
                      <div className="meta-item">
                        <FaCalendarAlt /> {blog.date}
                      </div>
                    </td>
                    <td>
                      <div className="meta-item">
                        <FaClock /> {blog.readTime}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${blog.status.toLowerCase()}`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td>
                      {blog.featured ? (
                        <FaCheckCircle className="feat-icon active" />
                      ) : (
                        <FaTimesCircle className="feat-icon inactive" />
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="act-btn view"
                          onClick={() => setViewModalData(blog)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="act-btn edit"
                          onClick={() => setEditModalData(blog)}
                          title="Edit Blog"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="act-btn delete"
                          onClick={() => handleDelete(blog.id)}
                          title="Delete Blog"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No blog posts found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="BlogManagement-pagination">
            <span className="pagination-info">
              Showing {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0} to{" "}
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
              {filteredBlogs.length} blogs
            </span>
            <div className="pagination-controls">
              <button
                className="page-btn text"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={`page-btn num ${currentPage === num ? "active" : ""}`}
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className="page-btn text"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: Grid View */
        <div className="BlogManagement-gridContainer">
          <div className="BlogManagement-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="BlogManagement-card">
                <div className="card-top">
                  <img src={blog.image} alt={blog.title} />
                  <span className={`category-badge ${blog.categoryClass}`}>
                    {blog.category}
                  </span>
                  <button className="card-bookmark">
                    <FaBookmark />
                  </button>
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span>
                      <FaCalendarAlt /> {blog.date}
                    </span>
                    <span>
                      <FaClock /> {blog.readTime}
                    </span>
                  </div>
                  <h3 className="card-title">{blog.title}</h3>
                  <p className="card-desc">{blog.description}</p>
                </div>

                <div className="card-footer">
                  <div className="author-cell">
                    <img src={blog.authorAvatar} alt={blog.author} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="act-btn view"
                      onClick={() => setViewModalData(blog)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="act-btn edit"
                      onClick={() => setEditModalData(blog)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="act-btn delete"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="BlogManagement-loadMore">
            <button className="load-more-btn">
              Load More Blogs <FaSync />
            </button>
          </div>
        </div>
      )}

      {/* EYE ICON VIEW DETAIL MODAL */}
      {viewModalData && (
        <div className="BlogManagement-modalOverlay">
          <div className="BlogManagement-modal detail-modal">
            <button
              className="close-modal-btn"
              onClick={() => setViewModalData(null)}
              aria-label="Close modal"
              title="Close"
            >
              <FaTimes />
            </button>
            <div className="modal-banner-wrap">
              <img src={viewModalData.image} alt={viewModalData.title} />
              <span className={`category-badge ${viewModalData.categoryClass}`}>
                {viewModalData.category}
              </span>
            </div>
            <div className="modal-body">
              <h2>{viewModalData.title}</h2>
              <div className="modal-meta-row">
                <span>
                  <FaCalendarAlt /> {viewModalData.date}
                </span>
                <span>
                  <FaClock /> {viewModalData.readTime}
                </span>
                <span
                  className={`status-pill ${viewModalData.status.toLowerCase()}`}
                >
                  {viewModalData.status}
                </span>
              </div>
              <p className="modal-full-text">{viewModalData.description}</p>

              <div className="modal-author-box">
                <img
                  src={viewModalData.authorAvatar}
                  alt={viewModalData.author}
                />
                <div>
                  <h4>{viewModalData.author}</h4>
                  <span>Author & Content Creator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalData && (
        <div className="BlogManagement-modalOverlay">
          <div className="BlogManagement-modal edit-modal">
            <button
              className="close-modal-btn"
              onClick={() => setEditModalData(null)}
              aria-label="Close modal"
              title="Close"
            >
              <FaTimes />
            </button>
            <h3>Edit Blog Post</h3>
            <form onSubmit={handleEditSave} className="edit-form">
              <div className="form-group">
                <label>Blog Title</label>
                <input
                  type="text"
                  value={editModalData.title}
                  onChange={(e) =>
                    setEditModalData({
                      ...editModalData,
                      title: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={editModalData.description}
                  onChange={(e) =>
                    setEditModalData({
                      ...editModalData,
                      description: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editModalData.category}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        category: e.target.value
                      })
                    }
                  >
                    <option value="Nature">Nature</option>
                    <option value="Honey">Honey</option>
                    <option value="Health">Health</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Recipes">Recipes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editModalData.status}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        status: e.target.value
                      })
                    }
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditModalData(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;