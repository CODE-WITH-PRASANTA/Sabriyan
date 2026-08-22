import React, { useState } from 'react';
import React, { useState, useEffect, useCallback } from "react";
import API, { IMG_URL } from "../../api/axios";
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
  FaBookmark,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import "./BlogManagement.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop";

const MOCK_BLOGS = [
  {
    _id: '1',
    title: 'The Healing Power of Nature',
    description: 'Explore how spending time in nature improves mental health and overall well-being.',
    category: 'Nature',
    author: 'Admin User',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    publishDate: '2026-06-01',
    readTime: '5 min read',
    status: 'Published',
    featured: true,
    image: FALLBACK_IMAGE
  },
  {
    _id: '2',
    title: 'Benefits of Raw Honey',
    description: 'Discover why raw honey is a powerful superfood loaded with antioxidants.',
    category: 'Honey',
    author: 'Admin User',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    publishDate: '2026-06-05',
    readTime: '4 min read',
    status: 'Draft',
    featured: false,
    image: FALLBACK_IMAGE
  }
];

const BlogManagement = ({ onNavigateToEdit }) => {
  const [blogs] = useState(MOCK_BLOGS);
  const [viewMode, setViewMode] = useState('list');
  // =========================================================
  // BLOG DATA & VIEW STATES
  // =========================================================
  const [blogs, setBlogs] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // =========================================================
  // FILTER STATES
  // =========================================================
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors");

  // =========================================================
  // PAGINATION
  // =========================================================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // =========================================================
  // MODALS
  // =========================================================
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================
  const getImageUrl = (image) => {
    if (!image) {
      return FALLBACK_IMAGE;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    const baseUrl = IMG_URL || "http://localhost:5000";
    const cleanPath = image.startsWith("/") ? image : `/${image}`;
    return `${baseUrl}${cleanPath}`;
  };

  // =========================================================
  // CATEGORY CLASS
  // =========================================================
  const getCategoryClass = (category) => {
    switch (category) {
      case "Nature":
        return "cat-nature";
      case "Honey":
        return "cat-honey";
      case "Health":
        return "cat-health";
      case "Chocolate":
        return "cat-chocolate";
      case "Recipes":
        return "cat-recipes";
      default:
        return "cat-nature";
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // CONVERT BACKEND BLOG TO UI FORMAT
  // =========================================================
  const formatBlog = useCallback((blog) => {
    return {
      ...blog,
      id: blog._id || blog.id,
      image: getImageUrl(
        blog.featuredImage || blog.thumbnailImage || blog.image
      ),
      description:
        blog.excerpt || blog.description || "No description provided.",
      categoryClass:
        blog.categoryClass || getCategoryClass(blog.category),
      author: blog.author || "Admin User",
      authorAvatar:
        blog.authorAvatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      date: formatDate(blog.publishDate || blog.createdAt),
      readTime: blog.readTime || "4 min read",
      status: blog.status || "Draft",
      featured: Boolean(blog.featured),
    };
  }, []);

  // =========================================================
  // FETCH BLOGS
  // =========================================================
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/blog");

      console.log("BLOG MANAGEMENT RESPONSE:", response.data);

      if (response.data?.success) {
        const apiBlogs =
          response.data.blogs || response.data.data || [];
        const formattedBlogs = apiBlogs.map(formatBlog);
        setBlogs(formattedBlogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("FETCH BLOGS ERROR:", error);
      alert(error.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, [formatBlog]);

  // =========================================================
  // LOAD BLOGS
  // =========================================================
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // =========================================================
  // DELETE BLOG
  // =========================================================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      setLoading(true);
      console.log("DELETE BLOG ID:", id);

      const response = await API.delete(`/blog/${id}`);
      console.log("DELETE RESPONSE:", response.data);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to delete blog"
        );
      }

      alert("Blog deleted successfully");

      if (viewModalData?.id === id || viewModalData?._id === id) {
        setViewModalData(null);
      }

      if (editModalData?.id === id || editModalData?._id === id) {
        setEditModalData(null);
      }

      await fetchBlogs();
      setCurrentPage(1);
    } catch (error) {
      console.error("DELETE BLOG ERROR:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete blog"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT BLOG SAVE
  // =========================================================
  const handleEditSave = async (e) => {
    e.preventDefault();

    if (!editModalData) {
      return;
    }

    try {
      setSaving(true);
      const blogId = editModalData._id || editModalData.id;

      const updateData = {
        title: editModalData.title || "",
        category: editModalData.category || "Nature",
        excerpt:
          editModalData.description ||
          editModalData.excerpt ||
          "",
        status: editModalData.status || "Draft",
        featured: Boolean(editModalData.featured),
        publishDate: editModalData.publishDate || null,
        tags: editModalData.tags || "",
        content: editModalData.content || "",
        metaTitle: editModalData.metaTitle || "",
        metaDescription: editModalData.metaDescription || "",
        metaKeywords: editModalData.metaKeywords || "",
      };

      console.log("UPDATE BLOG DATA:", updateData);

      const response = await API.put(`/blog/${blogId}`, updateData);
      console.log("UPDATE BLOG RESPONSE:", response.data);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to update blog"
        );
      }

      alert("Blog updated successfully");
      setEditModalData(null);
      await fetchBlogs();
    } catch (error) {
      console.error("UPDATE BLOG ERROR:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to update blog"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // FILTER RESET
  // =========================================================
  const handleFilterReset = () => {
    setSelectedCategory("All Categories");
    setSelectedStatus("All Status");
    setSelectedAuthor("All Authors");
    setCurrentPage(1);
  };

  // =========================================================
  // FILTERING LOGIC
  // =========================================================
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      blog.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All Status" ||
      blog.status === selectedStatus;

    const matchesAuthor =
      selectedAuthor === 'All Authors' || blog.author === selectedAuthor;
      selectedAuthor === "All Authors" ||
      blog.author === selectedAuthor;

    return matchesCategory && matchesStatus && matchesAuthor;
  });

  // =========================================================
  // PAGINATION
  // =========================================================
  const totalPages =
    Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  // =========================================================
  // PAGE CHANGE
  // =========================================================
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="BlogManagement dark-forest-theme">
      {/* TOP HEADER CONTROLS */}
      <div className="BlogManagement-header">
        <div className="BlogManagement-viewToggle">
          <button
            type="button"
            className={`BlogManagement-toggleBtn ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaThList className="btn-icon" />
            List View
          </button>

          <button
            type="button"
            className={`BlogManagement-toggleBtn ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <FaThLarge className="btn-icon" />
            Grid View
          </button>
        </div>

        <div className="BlogManagement-controls">
          {/* CATEGORY */}
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

          {/* STATUS */}
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

          {/* AUTHOR */}
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

          {/* RESET */}
          <button
            type="button"
            className="BlogManagement-filterBtn"
            onClick={handleFilterReset}
            title="Reset All Filters"
          >
            <FaFilter />
            Reset Filter
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
      {/* CONTENT AREA */}
      {loading && blogs.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#e2f1e8",
          }}
        >
          Loading blog data...
        </div>
      ) : viewMode === "list" ? (
        /* LIST VIEW */
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
                  <tr key={blog._id}>
                    <td>{indexOfFirstBlog + index + 1}</td>
                    <td>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="BlogManagement-thumb"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = FALLBACK_IMAGE;
                        }}
                      />
                    </td>
                    <td className="title-cell">
                      <div className="title-text">{blog.title}</div>
                      <div className="desc-text">{blog.description}</div>
                    </td>
                    <td>
                      <span className={`category-badge cat-${(blog.category || 'general').toLowerCase()}`}>
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
                        <FaCalendarAlt /> {blog.publishDate}
                      </div>
                    </td>
                    <td>
                      <div className="meta-item">
                        <FaClock /> {blog.readTime}
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill ${(blog.status || 'published').toLowerCase()}`}>
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
                          type="button"
                          className="act-btn view"
                          onClick={() =>
                            setViewModalData({
                              ...blog,
                              categoryClass: `cat-${(blog.category || 'general').toLowerCase()}`,
                              date: blog.publishDate
                            })
                          }
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          type="button"
                          className="act-btn edit"
                          onClick={() => {
                            if (onNavigateToEdit) {
                              onNavigateToEdit(blog);
                            } else {
                              setEditModalData(blog);
                            }
                          }}
                          title="Edit Blog"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="act-btn delete"
                          title="Delete Blog"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                currentBlogs.map((blog, index) => {
                  const blogId = blog._id || blog.id;

                  return (
                    <tr key={blogId}>
                      <td>{indexOfFirstBlog + index + 1}</td>

                      {/* IMAGE */}
                      <td>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="BlogManagement-thumb"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_IMAGE;
                          }}
                        />
                      </td>

                      {/* TITLE */}
                      <td className="title-cell">
                        <div className="title-text">{blog.title}</div>
                        <div className="desc-text">{blog.description}</div>
                      </td>

                      {/* CATEGORY */}
                      <td>
                        <span
                          className={`category-badge ${blog.categoryClass}`}
                        >
                          {blog.category}
                        </span>
                      </td>

                      {/* AUTHOR */}
                      <td>
                        <div className="author-cell">
                          <img src={blog.authorAvatar} alt={blog.author} />
                          <span>{blog.author}</span>
                        </div>
                      </td>

                      {/* DATE */}
                      <td>
                        <div className="meta-item">
                          <FaCalendarAlt /> {blog.date}
                        </div>
                      </td>

                      {/* READ TIME */}
                      <td>
                        <div className="meta-item">
                          <FaClock /> {blog.readTime}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`status-pill ${(
                            blog.status || "Draft"
                          ).toLowerCase()}`}
                        >
                          {blog.status}
                        </span>
                      </td>

                      {/* FEATURED */}
                      <td>
                        {blog.featured ? (
                          <FaCheckCircle className="feat-icon active" />
                        ) : (
                          <FaTimesCircle className="feat-icon inactive" />
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="act-btn view"
                            onClick={() => setViewModalData(blog)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                            className="act-btn edit"
                            onClick={() => {
                              if (onNavigateToEdit) {
                                onNavigateToEdit(blog);
                              } else {
                                setEditModalData({ ...blog });
                              }
                            }}
                            title="Edit Blog"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            className="act-btn delete"
                            onClick={() => handleDelete(blogId)}
                            title="Delete Blog"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No blog posts found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* LIST PAGINATION */}
          <div className="BlogManagement-pagination">
            <span className="pagination-info">
              Showing{" "}
              {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0} to{" "}
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
              {filteredBlogs.length} blogs
            </span>

            <div className="pagination-controls">
              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    type="button"
                    className={`page-btn num ${
                      currentPage === num ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                type="button"
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
        /* GRID VIEW */
        <div className="BlogManagement-gridContainer">
          <div className="BlogManagement-grid">
            {currentBlogs.map((blog) => (
              <div key={blog._id} className="BlogManagement-card">
                <div className="card-top">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                  <span className={`category-badge cat-${(blog.category || 'general').toLowerCase()}`}>
                    {blog.category}
                  </span>
                  <button type="button" className="card-bookmark">
                    <FaBookmark />
                  </button>
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span>
                      <FaCalendarAlt /> {blog.publishDate}
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
                      type="button"
                      className="act-btn view"
                      onClick={() =>
                        setViewModalData({
                          ...blog,
                          categoryClass: `cat-${(blog.category || 'general').toLowerCase()}`,
                          date: blog.publishDate
                        })
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      type="button"
                      className="act-btn edit"
                      onClick={() => {
                        if (onNavigateToEdit) {
                          onNavigateToEdit(blog);
                        } else {
                          setEditModalData(blog);
                        }
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button type="button" className="act-btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => {
                const blogId = blog._id || blog.id;

                return (
                  <div key={blogId} className="BlogManagement-card">
                    <div className="card-top">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = FALLBACK_IMAGE;
                        }}
                      />

                      <span
                        className={`category-badge ${blog.categoryClass}`}
                      >
                        {blog.category}
                      </span>

                      <button type="button" className="card-bookmark">
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
                        <img
                          src={blog.authorAvatar}
                          alt={blog.author}
                        />
                        <span>{blog.author}</span>
                      </div>

                      <div className="action-buttons">
                        <button
                          type="button"
                          className="act-btn view"
                          onClick={() => setViewModalData(blog)}
                        >
                          <FaEye />
                        </button>

                        <button
                          type="button"
                          className="act-btn edit"
                          onClick={() => {
                            if (onNavigateToEdit) {
                              onNavigateToEdit(blog);
                            } else {
                              setEditModalData({ ...blog });
                            }
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          className="act-btn delete"
                          onClick={() => handleDelete(blogId)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className="no-data"
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No blog posts found matching your criteria.
              </div>
            )}
          </div>

          {/* GRID PAGINATION */}
          <div className="BlogManagement-pagination">
            <span className="pagination-info">
              Showing{" "}
              {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0} to{" "}
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
              {filteredBlogs.length} blogs
            </span>

            <div className="pagination-controls">
              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    type="button"
                    className={`page-btn num ${
                      currentPage === num ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAIL MODAL */}
      {viewModalData && (
        <div
          className="BlogManagement-modalOverlay"
          onClick={() => setViewModalData(null)}
        >
          <div
            className="BlogManagement-modal detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setViewModalData(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="modal-banner-wrap">
              <img
                src={viewModalData.image}
                alt={viewModalData.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />

              <span
                className={`category-badge ${viewModalData.categoryClass}`}
              >
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
                  className={`status-pill ${(
                    viewModalData.status || "Draft"
                  ).toLowerCase()}`}
                >
                  {viewModalData.status}
                </span>
              </div>

              <p className="modal-full-text">
                {viewModalData.description}
              </p>

              {/* FULL CONTENT */}
              {viewModalData.content && (
                <div
                  className="modal-full-text"
                  dangerouslySetInnerHTML={{
                    __html: viewModalData.content,
                  }}
                />
              )}

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
        <div
          className="BlogManagement-modalOverlay"
          onClick={() => setEditModalData(null)}
        >
          <div
            className="BlogManagement-modal edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setEditModalData(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <h3>Edit Blog Post</h3>
            <form onSubmit={(e) => e.preventDefault()} className="edit-form">

            <form onSubmit={handleEditSave} className="edit-form">
              {/* TITLE */}
              <div className="form-group">
                <label>Blog Title</label>
                <input
                  type="text"
                  value={editModalData.title || ""}
                  onChange={(e) =>
                    setEditModalData({
                      ...editModalData,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={
                    editModalData.description ||
                    editModalData.excerpt ||
                    ""
                  }
                  onChange={(e) =>
                    setEditModalData({
                      ...editModalData,
                      description: e.target.value,
                      excerpt: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* CATEGORY + STATUS */}
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editModalData.category || "Nature"}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        category: e.target.value,
                        categoryClass: getCategoryClass(
                          e.target.value
                        ),
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
                    value={editModalData.status || "Draft"}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="modal-actions">
                <button type="button" className="save-btn" onClick={() => setEditModalData(null)}>
                  Save Changes
                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
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