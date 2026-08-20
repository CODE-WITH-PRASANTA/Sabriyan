<<<<<<< HEAD
import React, {
  useState,
  useEffect,
} from "react";

=======
import React, { useState, useEffect, useCallback } from 'react';
import API, { IMG_URL } from '../../api/axios';
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
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
<<<<<<< HEAD
  FaChevronDown,
} from "react-icons/fa";

import "./BlogManagement.css";

import API, {
  IMG_URL,
} from "../../api/axios";

const BlogManagement = () => {
  // =========================================================
  // BLOG DATA
  // =========================================================

  const [blogs, setBlogs] = useState([]);

  // =========================================================
  // VIEW MODE
  // =========================================================

  const [viewMode, setViewMode] =
    useState("list");

  // =========================================================
  // FILTER STATES
  // =========================================================

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [selectedAuthor, setSelectedAuthor] =
    useState("All Authors");

  // =========================================================
  // PAGINATION
  // =========================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 3;

  // =========================================================
  // MODALS
  // =========================================================

  const [viewModalData, setViewModalData] =
    useState(null);

  const [editModalData, setEditModalData] =
    useState(null);

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] =
    useState(false);

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    // If backend already gives complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Backend relative image path
    return `${IMG_URL}${image}`;
  };

  // =========================================================
  // CATEGORY CLASS
  // =========================================================

  const getCategoryClass = (
    category
  ) => {
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
  // CONVERT BACKEND BLOG
  // TO MANAGEMENT UI FORMAT
  // =========================================================

  const formatBlog = (blog) => {
    return {
      ...blog,

      // MongoDB ID
      id: blog._id,

      // Image
      image: getImageUrl(
        blog.featuredImage ||
          blog.image
      ),

      // Description
      description:
        blog.excerpt ||
        blog.description ||
        "No description provided.",

      // Category class
      categoryClass:
        blog.categoryClass ||
        getCategoryClass(
          blog.category
        ),

      // Author
      author:
        blog.author ||
        "Admin User",

      // Author avatar
      authorAvatar:
        blog.authorAvatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",

      // Date
      date: formatDate(
        blog.publishDate ||
          blog.createdAt
      ),

      // Read time
      readTime:
        blog.readTime ||
        "4 min read",

      // Status
      status:
        blog.status || "Draft",

      // Featured
      featured:
        Boolean(blog.featured),
    };
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // FETCH BLOGS
  // =========================================================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response =
        await API.get("/blog");

      console.log(
        "BLOG MANAGEMENT RESPONSE:",
        response.data
      );

      if (
        response.data.success
      ) {
        const apiBlogs =
          response.data.blogs ||
          [];

        const formattedBlogs =
          apiBlogs.map(
            formatBlog
          );

        setBlogs(
          formattedBlogs
        );
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error(
        "FETCH BLOGS ERROR:",
        error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to load blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD BLOGS
  // =========================================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  // =========================================================
  // DELETE BLOG
  // =========================================================

  const handleDelete = async (
    id
  ) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this blog?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);

      console.log(
        "DELETE BLOG ID:",
        id
      );

      const response =
        await API.delete(
          `/blog/${id}`
        );

      console.log(
        "DELETE RESPONSE:",
        response.data
      );

      if (
        !response.data.success
      ) {
        throw new Error(
          response.data.message ||
            "Failed to delete blog"
        );
      }

      alert(
        "Blog deleted successfully"
      );

      // Close opened modals
      if (
        viewModalData?.id === id
      ) {
        setViewModalData(null);
      }

      if (
        editModalData?.id === id
      ) {
        setEditModalData(null);
      }

      // Refresh database data
      await fetchBlogs();

      // Reset page
      setCurrentPage(1);
    } catch (error) {
      console.error(
        "DELETE BLOG ERROR:",
        error
      );

      alert(
        error.response?.data
          ?.message ||
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

  const handleEditSave = async (
    e
  ) => {
    e.preventDefault();

    if (!editModalData) {
      return;
    }

    try {
      setLoading(true);

      const blogId =
        editModalData._id ||
        editModalData.id;

      // =====================================================
      // BACKEND UPDATE DATA
      // =====================================================

      const updateData = {
        title:
          editModalData.title || "",

        category:
          editModalData.category ||
          "Nature",

        excerpt:
          editModalData.description ||
          editModalData.excerpt ||
          "",

        status:
          editModalData.status ||
          "Draft",

        featured:
          Boolean(
            editModalData.featured
          ),

        publishDate:
          editModalData.publishDate ||
          null,

        tags:
          editModalData.tags || "",

        content:
          editModalData.content ||
          "",

        metaTitle:
          editModalData.metaTitle ||
          "",

        metaDescription:
          editModalData.metaDescription ||
          "",

        metaKeywords:
          editModalData.metaKeywords ||
          "",
      };

      console.log(
        "UPDATE BLOG DATA:",
        updateData
      );

      const response =
        await API.put(
          `/blog/${blogId}`,
          updateData
        );

      console.log(
        "UPDATE BLOG RESPONSE:",
        response.data
      );

      if (
        !response.data.success
      ) {
        throw new Error(
          response.data.message ||
            "Failed to update blog"
        );
      }

      alert(
        "Blog updated successfully"
      );

      // Close edit modal
      setEditModalData(null);

      // Reload database data
      await fetchBlogs();
    } catch (error) {
      console.error(
        "UPDATE BLOG ERROR:",
        error
      );

      alert(
        error.response?.data
          ?.message ||
          error.message ||
          "Failed to update blog"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FILTER RESET
  // =========================================================

  const handleFilterReset = () => {
    setSelectedCategory(
      "All Categories"
    );

    setSelectedStatus(
      "All Status"
    );

    setSelectedAuthor(
      "All Authors"
    );

    setCurrentPage(1);
  };

  // =========================================================
  // FILTERING LOGIC
  // =========================================================
=======
  FaChevronDown
} from 'react-icons/fa';
import './BlogManagement.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop';

const BlogManagement = ({ onNavigateToEdit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // Dynamic Image Resolver
  const getImageUrl = (item) => {
    const rawImage = item?.featuredImage || item?.thumbnailImage || item?.image;
    if (!rawImage) return FALLBACK_IMAGE;

    if (rawImage.startsWith('http://') || rawImage.startsWith('https://') || rawImage.startsWith('data:')) {
      return rawImage;
    }

    const baseUrl = IMG_URL || 'http://localhost:5000';
    const cleanPath = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
    return `${baseUrl}${cleanPath}`;
  };

  // Fetch blogs from API
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get('/blogs');
      if (res.data?.success) {
        setBlogs(res.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await API.delete(`/blogs/${id}`);
      if (res.data?.success) {
        setBlogs((prev) => prev.filter((blog) => (blog._id || blog.id) !== id));
        alert('Blog deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert(error.response?.data?.message || 'Failed to delete blog.');
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const blogId = editModalData._id || editModalData.id;

    try {
      setSaving(true);
      const res = await API.put(`/blogs/${blogId}`, {
        title: editModalData.title,
        excerpt: editModalData.description || editModalData.excerpt,
        category: editModalData.category,
        status: editModalData.status
      });

      if (res.data?.success) {
        setBlogs((prev) =>
          prev.map((item) => ((item._id || item.id) === blogId ? res.data.data : item))
        );
        setEditModalData(null);
        alert('Blog updated successfully!');
      }
    } catch (error) {
      console.error('Error saving edited blog:', error);
      alert(error.response?.data?.message || 'Failed to update blog.');
    } finally {
      setSaving(false);
    }
  };

  const handleFilterReset = () => {
    setSelectedCategory('All Categories');
    setSelectedStatus('All Status');
    setSelectedAuthor('All Authors');
    setCurrentPage(1);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || blog.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All Status' || blog.status === selectedStatus;
    const matchesAuthor =
      selectedAuthor === 'All Authors' || (blog.author || 'Admin User') === selectedAuthor;
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a

  const filteredBlogs =
    blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory ===
          "All Categories" ||
        blog.category ===
          selectedCategory;

<<<<<<< HEAD
      const matchesStatus =
        selectedStatus ===
          "All Status" ||
        blog.status ===
          selectedStatus;
=======
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a

      const matchesAuthor =
        selectedAuthor ===
          "All Authors" ||
        blog.author ===
          selectedAuthor;

      return (
        matchesCategory &&
        matchesStatus &&
        matchesAuthor
      );
    });

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages =
    Math.ceil(
      filteredBlogs.length /
        itemsPerPage
    ) || 1;

  const indexOfLastBlog =
    currentPage *
    itemsPerPage;

  const indexOfFirstBlog =
    indexOfLastBlog -
    itemsPerPage;

  const currentBlogs =
    filteredBlogs.slice(
      indexOfFirstBlog,
      indexOfLastBlog
    );

  // =========================================================
  // PAGE CHANGE
  // =========================================================

  const handlePageChange = (
    pageNumber
  ) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      setCurrentPage(
        pageNumber
      );
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="BlogManagement dark-forest-theme">
<<<<<<< HEAD

      {/* ================================================= */}
      {/* TOP HEADER CONTROLS */}
      {/* ================================================= */}

=======
      {/* Top Controls */}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
      <div className="BlogManagement-header">

        <div className="BlogManagement-viewToggle">

          <button
<<<<<<< HEAD
            className={`BlogManagement-toggleBtn ${
              viewMode === "list"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setViewMode("list")
            }
=======
            type="button"
            className={`BlogManagement-toggleBtn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          >
            <FaThList className="btn-icon" />

            List View
          </button>

          <button
<<<<<<< HEAD
            className={`BlogManagement-toggleBtn ${
              viewMode === "grid"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setViewMode("grid")
            }
=======
            type="button"
            className={`BlogManagement-toggleBtn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          >
            <FaThLarge className="btn-icon" />

            Grid View
          </button>

        </div>

        <div className="BlogManagement-controls">
<<<<<<< HEAD

          {/* CATEGORY */}

=======
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          <div className="BlogManagement-selectWrapper">

            <select
              value={
                selectedCategory
              }
              onChange={(e) => {
                setSelectedCategory(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            >

              <option value="All Categories">
                All Categories
              </option>

              <option value="Nature">
                Nature
              </option>

              <option value="Honey">
                Honey
              </option>

              <option value="Health">
                Health
              </option>

              <option value="Chocolate">
                Chocolate
              </option>

              <option value="Recipes">
                Recipes
              </option>

            </select>

            <FaChevronDown className="select-arrow" />

          </div>

<<<<<<< HEAD
          {/* STATUS */}

=======
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          <div className="BlogManagement-selectWrapper">

            <select
              value={
                selectedStatus
              }
              onChange={(e) => {
                setSelectedStatus(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            >

              <option value="All Status">
                All Status
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>

            </select>

            <FaChevronDown className="select-arrow" />

          </div>

<<<<<<< HEAD
          {/* AUTHOR */}

=======
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          <div className="BlogManagement-selectWrapper">

            <select
              value={
                selectedAuthor
              }
              onChange={(e) => {
                setSelectedAuthor(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            >

              <option value="All Authors">
                All Authors
              </option>

              <option value="Admin User">
                Admin User
              </option>

            </select>

            <FaChevronDown className="select-arrow" />

          </div>

<<<<<<< HEAD
          {/* RESET */}

=======
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          <button
            type="button"
            className="BlogManagement-filterBtn"
            onClick={
              handleFilterReset
            }
            title="Reset All Filters"
          >
            <FaFilter />

            Reset Filter
          </button>

        </div>

      </div>

<<<<<<< HEAD
      {/* ================================================= */}
      {/* LIST VIEW */}
      {/* ================================================= */}

      {viewMode === "list" ? (

=======
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#e2f1e8' }}>
          Loading blog data...
        </div>
      ) : viewMode === 'list' ? (
        /* LIST VIEW */
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
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
<<<<<<< HEAD

              {loading &&
              blogs.length === 0 ? (

=======
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => {
                  const blogId = blog._id || blog.id;
                  const displayImage = getImageUrl(blog);

                  return (
                    <tr key={blogId}>
                      <td>{indexOfFirstBlog + index + 1}</td>
                      <td>
                        <img
                          src={displayImage}
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
                        <div className="desc-text">{blog.excerpt || blog.description}</div>
                      </td>
                      <td>
                        <span className={`category-badge cat-${(blog.category || 'general').toLowerCase()}`}>
                          {blog.category}
                        </span>
                      </td>
                      <td>
                        <div className="author-cell">
                          <img
                            src={
                              blog.authorAvatar ||
                              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
                            }
                            alt={blog.author || 'Admin'}
                          />
                          <span>{blog.author || 'Admin User'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="meta-item">
                          <FaCalendarAlt />{' '}
                          {blog.publishDate
                            ? new Date(blog.publishDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })
                            : 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="meta-item">
                          <FaClock /> {blog.readTime || '5 min read'}
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
                                image: displayImage,
                                description: blog.excerpt || blog.description,
                                categoryClass: `cat-${(blog.category || 'general').toLowerCase()}`,
                                date: blog.publishDate || 'N/A'
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
                                setEditModalData({
                                  ...blog,
                                  description: blog.excerpt || blog.description
                                });
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
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
                <tr>

                  <td
                    colSpan="10"
                    className="no-data"
                  >
                    Loading blogs...
                  </td>

                </tr>

              ) : currentBlogs.length >
                0 ? (

                currentBlogs.map(
                  (
                    blog,
                    index
                  ) => (

                    <tr
                      key={
                        blog._id ||
                        blog.id
                      }
                    >

                      <td>
                        {
                          indexOfFirstBlog +
                          index +
                          1
                        }
                      </td>

                      {/* IMAGE */}

                      <td>

                        <img
                          src={
                            blog.image
                          }
                          alt={
                            blog.title
                          }
                          className="BlogManagement-thumb"
                        />

                      </td>

                      {/* TITLE */}

                      <td className="title-cell">

                        <div className="title-text">
                          {
                            blog.title
                          }
                        </div>

                        <div className="desc-text">
                          {
                            blog.description
                          }
                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td>

                        <span
                          className={`category-badge ${blog.categoryClass}`}
                        >
                          {
                            blog.category
                          }
                        </span>

                      </td>

                      {/* AUTHOR */}

                      <td>

                        <div className="author-cell">

                          <img
                            src={
                              blog.authorAvatar
                            }
                            alt={
                              blog.author
                            }
                          />

                          <span>
                            {
                              blog.author
                            }
                          </span>

                        </div>

                      </td>

                      {/* DATE */}

                      <td>

                        <div className="meta-item">

                          <FaCalendarAlt />

                          {" "}

                          {
                            blog.date
                          }

                        </div>

                      </td>

                      {/* READ TIME */}

                      <td>

                        <div className="meta-item">

                          <FaClock />

                          {" "}

                          {
                            blog.readTime
                          }

                        </div>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-pill ${(
                            blog.status ||
                            "Draft"
                          ).toLowerCase()}`}
                        >
                          {
                            blog.status
                          }
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

                          {/* VIEW */}

                          <button
                            className="act-btn view"
                            onClick={() =>
                              setViewModalData(
                                blog
                              )
                            }
                            title="View Details"
                          >
                            <FaEye />
                          </button>

                          {/* EDIT */}

                          <button
                            className="act-btn edit"
                            onClick={() =>
                              setEditModalData(
                                {
                                  ...blog,
                                }
                              )
                            }
                            title="Edit Blog"
                          >
                            <FaEdit />
                          </button>

                          {/* DELETE */}

                          <button
                            className="act-btn delete"
                            onClick={() =>
                              handleDelete(
                                blog._id ||
                                  blog.id
                              )
                            }
                            title="Delete Blog"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="10"
                    className="no-data"
                  >
                    No blog posts found matching your criteria.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

<<<<<<< HEAD
          {/* PAGINATION */}

=======
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          <div className="BlogManagement-pagination">

            <span className="pagination-info">
<<<<<<< HEAD

              Showing{" "}

              {filteredBlogs.length >
              0
                ? indexOfFirstBlog +
                  1
                : 0}

              {" "}to{" "}

              {Math.min(
                indexOfLastBlog,
                filteredBlogs.length
              )}

              {" "}of{" "}

              {
                filteredBlogs.length
              }

              {" "}blogs

=======
              Showing {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0} to{' '}
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} blogs
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
            </span>

            <div className="pagination-controls">

              <button
                type="button"
                className="page-btn text"
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
                disabled={
                  currentPage ===
                  1
                }
              >
                Previous
              </button>
<<<<<<< HEAD

              {Array.from(
                {
                  length:
                    totalPages,
                },
                (_, i) =>
                  i + 1
              ).map(
                (num) => (

                  <button
                    key={num}
                    className={`page-btn num ${
                      currentPage ===
                      num
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handlePageChange(
                        num
                      )
                    }
                  >
                    {num}
                  </button>

                )
              )}

=======
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`page-btn num ${currentPage === num ? 'active' : ''}`}
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </button>
              ))}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
              <button
                type="button"
                className="page-btn text"
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
                disabled={
                  currentPage ===
                    totalPages ||
                  totalPages === 0
                }
              >
                Next
              </button>

            </div>

          </div>

        </div>

      ) : (
<<<<<<< HEAD

        /* ================================================= */
        /* GRID VIEW */
        /* ================================================= */

=======
        /* GRID VIEW */
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
        <div className="BlogManagement-gridContainer">

          <div className="BlogManagement-grid">
<<<<<<< HEAD

            {currentBlogs.map(
              (blog) => (

                <div
                  key={
                    blog._id ||
                    blog.id
                  }
                  className="BlogManagement-card"
                >

                  <div className="card-top">

                    <img
                      src={
                        blog.image
                      }
                      alt={
                        blog.title
                      }
                    />

                    <span
                      className={`category-badge ${blog.categoryClass}`}
                    >
                      {
                        blog.category
                      }
                    </span>

                    <button className="card-bookmark">

                      <FaBookmark />

                    </button>

                  </div>

                  <div className="card-content">

                    <div className="card-meta">

                      <span>

                        <FaCalendarAlt />

                        {" "}

                        {
                          blog.date
                        }

                      </span>

                      <span>

                        <FaClock />

                        {" "}

                        {
                          blog.readTime
                        }

                      </span>

                    </div>

                    <h3 className="card-title">
                      {
                        blog.title
                      }
                    </h3>

                    <p className="card-desc">
                      {
                        blog.description
                      }
                    </p>

                  </div>

                  <div className="card-footer">

                    <div className="author-cell">

                      <img
                        src={
                          blog.authorAvatar
                        }
                        alt={
                          blog.author
                        }
                      />

                      <span>
                        {
                          blog.author
                        }
                      </span>

                    </div>

                    <div className="action-buttons">

                      <button
                        className="act-btn view"
                        onClick={() =>
                          setViewModalData(
                            blog
                          )
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        className="act-btn edit"
                        onClick={() =>
                          setEditModalData(
                            {
                              ...blog,
                            }
                          )
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="act-btn delete"
                        onClick={() =>
                          handleDelete(
                            blog._id ||
                              blog.id
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

          <div className="BlogManagement-loadMore">

            <button
              className="load-more-btn"
              onClick={
                fetchBlogs
              }
            >
              Load More Blogs{" "}
              <FaSync />
            </button>

=======
            {currentBlogs.map((blog) => {
              const blogId = blog._id || blog.id;
              const displayImage = getImageUrl(blog);

              return (
                <div key={blogId} className="BlogManagement-card">
                  <div className="card-top">
                    <img
                      src={displayImage}
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
                        <FaCalendarAlt />{' '}
                        {blog.publishDate
                          ? new Date(blog.publishDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })
                          : 'N/A'}
                      </span>
                      <span>
                        <FaClock /> {blog.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 className="card-title">{blog.title}</h3>
                    <p className="card-desc">{blog.excerpt || blog.description}</p>
                  </div>

                  <div className="card-footer">
                    <div className="author-cell">
                      <img
                        src={
                          blog.authorAvatar ||
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
                        }
                        alt={blog.author || 'Admin'}
                      />
                      <span>{blog.author || 'Admin User'}</span>
                    </div>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="act-btn view"
                        onClick={() =>
                          setViewModalData({
                            ...blog,
                            image: displayImage,
                            description: blog.excerpt || blog.description,
                            categoryClass: `cat-${(blog.category || 'general').toLowerCase()}`,
                            date: blog.publishDate || 'N/A'
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
                            setEditModalData({
                              ...blog,
                              description: blog.excerpt || blog.description
                            });
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
            })}
          </div>

          <div className="BlogManagement-pagination">
            <span className="pagination-info">
              Showing {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0} to{' '}
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} blogs
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`page-btn num ${currentPage === num ? 'active' : ''}`}
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          </div>

        </div>

      )}

<<<<<<< HEAD
      {/* ================================================= */}
      {/* VIEW DETAIL MODAL */}
      {/* ================================================= */}

=======
      {/* VIEW DETAIL MODAL */}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
      {viewModalData && (

        <div className="BlogManagement-modalOverlay">

          <div className="BlogManagement-modal detail-modal">

            <button
              type="button"
              className="close-modal-btn"
              onClick={() =>
                setViewModalData(
                  null
                )
              }
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="modal-banner-wrap">
<<<<<<< HEAD

              <img
                src={
                  viewModalData.image
                }
                alt={
                  viewModalData.title
                }
              />

              <span
                className={`category-badge ${viewModalData.categoryClass}`}
              >
                {
                  viewModalData.category
                }
=======
              <img
                src={viewModalData.image}
                alt={viewModalData.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
              <span className={`category-badge ${viewModalData.categoryClass}`}>
                {viewModalData.category}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
              </span>

            </div>

            <div className="modal-body">

              <h2>
                {
                  viewModalData.title
                }
              </h2>

              <div className="modal-meta-row">

                <span>

                  <FaCalendarAlt />

                  {" "}

                  {
                    viewModalData.date
                  }

                </span>

                <span>
<<<<<<< HEAD

                  <FaClock />

                  {" "}

                  {
                    viewModalData.readTime
                  }

                </span>

                <span
                  className={`status-pill ${(
                    viewModalData.status ||
                    "Draft"
                  ).toLowerCase()}`}
                >
                  {
                    viewModalData.status
                  }
=======
                  <FaClock /> {viewModalData.readTime || '5 min read'}
                </span>
                <span className={`status-pill ${(viewModalData.status || 'published').toLowerCase()}`}>
                  {viewModalData.status}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
                </span>

              </div>
<<<<<<< HEAD

              <p className="modal-full-text">
                {
                  viewModalData.description
                }
              </p>

              {/* FULL CONTENT */}

              {viewModalData.content && (

                <div
                  className="modal-full-text"
                  dangerouslySetInnerHTML={{
                    __html:
                      viewModalData.content,
                  }}
                />

              )}

              <div className="modal-author-box">

                <img
                  src={
                    viewModalData.authorAvatar
                  }
                  alt={
                    viewModalData.author
                  }
                />

                <div>

                  <h4>
                    {
                      viewModalData.author
                    }
                  </h4>

                  <span>
                    Author & Content Creator
                  </span>

                </div>

              </div>

=======
              <p className="modal-full-text">{viewModalData.description}</p>
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
            </div>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* EDIT MODAL */}
      {/* ================================================= */}

      {editModalData && (

        <div className="BlogManagement-modalOverlay">

          <div className="BlogManagement-modal edit-modal">

            <button
              type="button"
              className="close-modal-btn"
              onClick={() =>
                setEditModalData(
                  null
                )
              }
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <h3>
              Edit Blog Post
            </h3>

            <form
              onSubmit={
                handleEditSave
              }
              className="edit-form"
            >

              {/* TITLE */}

              <div className="form-group">

                <label>
                  Blog Title
                </label>

                <input
                  type="text"
<<<<<<< HEAD
                  value={
                    editModalData.title ||
                    ""
                  }
                  onChange={(e) =>
                    setEditModalData({
                      ...editModalData,
                      title:
                        e.target.value,
                    })
=======
                  value={editModalData.title || ''}
                  onChange={(e) =>
                    setEditModalData({ ...editModalData, title: e.target.value })
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
                  }
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  rows="4"
<<<<<<< HEAD
                  value={
                    editModalData.description ||
                    editModalData.excerpt ||
                    ""
                  }
                  onChange={(e) =>
                    setEditModalData({
                      ...editModalData,
                      description:
                        e.target.value,
                    })
=======
                  value={editModalData.description || ''}
                  onChange={(e) =>
                    setEditModalData({ ...editModalData, description: e.target.value })
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
                  }
                  required
                />

              </div>

              {/* CATEGORY + STATUS */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Category
                  </label>

                  <select
<<<<<<< HEAD
                    value={
                      editModalData.category ||
                      "Nature"
                    }
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        category:
                          e.target.value,

                        categoryClass:
                          getCategoryClass(
                            e.target.value
                          ),
                      })
=======
                    value={editModalData.category || 'Nature'}
                    onChange={(e) =>
                      setEditModalData({ ...editModalData, category: e.target.value })
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
                    }
                  >

                    <option value="Nature">
                      Nature
                    </option>

                    <option value="Honey">
                      Honey
                    </option>

                    <option value="Health">
                      Health
                    </option>

                    <option value="Chocolate">
                      Chocolate
                    </option>

                    <option value="Recipes">
                      Recipes
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
<<<<<<< HEAD
                    value={
                      editModalData.status ||
                      "Draft"
                    }
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        status:
                          e.target.value,
                      })
=======
                    value={editModalData.status || 'Published'}
                    onChange={(e) =>
                      setEditModalData({ ...editModalData, status: e.target.value })
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
                    }
                  >

                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>

                  </select>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="modal-actions">
<<<<<<< HEAD

                <button
                  type="submit"
                  className="save-btn"
                  disabled={loading}
                >
                  Save Changes
=======
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
                </button>

                <button
                  type="button"
                  className="cancel-btn"
<<<<<<< HEAD
                  onClick={() =>
                    setEditModalData(
                      null
                    )
                  }
=======
                  onClick={() => setEditModalData(null)}
                  disabled={saving}
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
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