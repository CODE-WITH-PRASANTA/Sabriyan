<<<<<<< HEAD
import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import { Editor } from "@tinymce/tinymce-react";

import "./BlogPost.css";

=======
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './BlogPost.css';
import API, { IMG_URL } from '../../api/axios';
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
import {
  FaEdit,
  FaCloudUploadAlt,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaTrash,
  FaPaperPlane,
  FaSave,
  FaRedo,
} from "react-icons/fa";

<<<<<<< HEAD
import API, { IMG_URL } from "../../api/axios";

const BlogPost = () => {
  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",

=======
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop';

const BlogPost = () => {
  const initialFormState = {
    title: '',
    category: '',
    tags: '',
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
    featuredImage: null,
    featuredImagePreview: "",

    thumbnailImage: null,
    thumbnailPreview: "",

    excerpt: "",
    content: "",

    status: true,
    featured: true,
<<<<<<< HEAD

    publishDate: new Date()
      .toISOString()
      .split("T")[0],

    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  // =========================
  // BLOG STATE
  // =========================

  const [blogs, setBlogs] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  // =========================
  // SEARCH / FILTER
  // =========================

  const [searchQuery, setSearchQuery] =
    useState("");

  const [filterCategory, setFilterCategory] =
    useState("All Categories");

  const [filterStatus, setFilterStatus] =
    useState("All Status");

  const [filterFeatured, setFilterFeatured] =
    useState("All");

  const [showFilterOptions, setShowFilterOptions] =
    useState(true);

  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] =
    useState(false);

  // =========================
  // REFS
  // =========================

  const featuredInputRef =
    useRef(null);

  const thumbnailInputRef =
    useRef(null);

  const editorRef =
    useRef(null);

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    // Already complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Backend relative URL
    return `${IMG_URL}${image}`;
  };

  // =========================================================
  // FETCH ALL BLOGS
  // =========================================================

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response =
        await API.get("/blog");

      console.log(
        "BLOG GET RESPONSE:",
        response.data
      );

      if (response.data.success) {
        setBlogs(response.data.blogs || []);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error(
        "FETCH BLOG ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD BLOGS WHEN COMPONENT LOADS
  // =========================================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  // =========================================================
  // TITLE CHANGE
  // =========================================================
=======
    publishDate: new Date().toISOString().split('T')[0],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterFeatured, setFilterFeatured] = useState('All');
  const [showFilterOptions, setShowFilterOptions] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const featuredInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const editorRef = useRef(null);
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a

  // Precise image resolver for individual blog posts
  const getImageUrl = (imagePath) => {
    if (!imagePath) return FALLBACK_IMAGE;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('blob:')) {
      return imagePath;
    }
    const baseUrl = IMG_URL || 'http://localhost:5000';
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
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

  const handleTitleChange = (e) => {
    const val = e.target.value;

    if (val.length <= 100) {
<<<<<<< HEAD
      setFormData((prev) => ({
        ...prev,
        title: val,
      }));
    }
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageUpload = (
    e,
    type
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
=======
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  // Keep featured and thumbnail uploads isolated
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === 'featured') {
        setFormData((prev) => ({
          ...prev,
          featuredImage: file,
          featuredImagePreview: previewUrl
        }));
      } else if (type === 'thumbnail') {
        setFormData((prev) => ({
          ...prev,
          thumbnailImage: file,
          thumbnailPreview: previewUrl
        }));
      }
    }
  };

  const handleReset = () => {
    setEditingId(null);
    setFormData(initialFormState);
    if (editorRef.current) {
      editorRef.current.setContent('<p>Write full blog content here...</p>');
    }
    if (featuredInputRef.current) featuredInputRef.current.value = '';
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const handleEdit = (blog) => {
    const targetId = blog._id || blog.id;
    setEditingId(targetId);

    setFormData({
      title: blog.title || '',
      category: blog.category || '',
      tags: blog.tags || '',
      featuredImage: null,
      featuredImagePreview: blog.featuredImage ? getImageUrl(blog.featuredImage) : '',
      thumbnailImage: null,
      thumbnailPreview: blog.thumbnailImage ? getImageUrl(blog.thumbnailImage) : '',
      excerpt: blog.excerpt || blog.description || '',
      content: blog.content || '<p>Write full blog content here...</p>',
      status: blog.status === 'Published',
      featured: Boolean(blog.featured),
      publishDate: blog.publishDate || new Date().toISOString().split('T')[0],
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: blog.metaKeywords || ''
    });

    if (editorRef.current) {
      editorRef.current.setContent(blog.content || '<p>Write full blog content here...</p>');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublish = async (statusType = 'Published') => {
    if (!formData.title.trim()) {
      alert('Please enter a Blog Title');
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
      return;
    }
    if (!formData.category.trim()) {
      alert('Please select a Category');
      return;
    }
    if (!formData.excerpt.trim()) {
      alert('Please enter an Excerpt / Short Description');
      return;
    }

<<<<<<< HEAD
    // Validate image
    if (!file.type.startsWith("image/")) {
      alert(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    // 10MB frontend validation
    if (
      file.size >
      10 * 1024 * 1024
    ) {
      alert(
        "Image size must be less than 10MB."
      );

      e.target.value = "";
      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    if (type === "featured") {
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
        featuredImagePreview: imageUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        thumbnailImage: file,
        thumbnailPreview: imageUrl,
      }));
    }
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const handleReset = () => {
    setEditingId(null);

    setFormData({
      title: "",
      category: "",
      tags: "",

      featuredImage: null,
      featuredImagePreview: "",

      thumbnailImage: null,
      thumbnailPreview: "",

      excerpt: "",
      content: "",

      status: true,
      featured: true,

      publishDate: new Date()
        .toISOString()
        .split("T")[0],

      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    });

    if (featuredInputRef.current) {
      featuredInputRef.current.value =
        "";
    }

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value =
        "";
    }

    if (editorRef.current) {
      editorRef.current.setContent(
        "<p>Write full blog content here...</p>"
      );
    }
  };

  // =========================================================
  // EDIT BLOG
  // =========================================================

  const handleEdit = (blog) => {
    setEditingId(
      blog._id || blog.id
    );

    const featuredImage =
      blog.featuredImage ||
      blog.image ||
      "";

    const thumbnailImage =
      blog.thumbnailImage ||
      "";

    setFormData({
      title: blog.title || "",

      category:
        blog.category || "",

      tags: blog.tags || "",

      featuredImage: null,

      featuredImagePreview:
        getImageUrl(featuredImage),

      thumbnailImage: null,

      thumbnailPreview:
        getImageUrl(thumbnailImage),

      excerpt:
        blog.excerpt || "",

      content:
        blog.content || "",

      status:
        blog.status === "Published",

      featured:
        Boolean(blog.featured),

      publishDate:
        blog.publishDate
          ? new Date(blog.publishDate)
              .toISOString()
              .split("T")[0]
          : new Date()
              .toISOString()
              .split("T")[0],

      metaTitle:
        blog.metaTitle || "",

      metaDescription:
        blog.metaDescription || "",

      metaKeywords:
        blog.metaKeywords || "",
    });

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.setContent(
          blog.content ||
            "<p>Write full blog content here...</p>"
        );
      }
    }, 100);
  };

  // =========================================================
  // CREATE / UPDATE BLOG
  // =========================================================

  const handlePublish = async (
    statusType = "Published"
  ) => {
    try {
      // =========================
      // VALIDATION
      // =========================

      if (!formData.title.trim()) {
        alert(
          "Please enter a Blog Title"
        );
        return;
      }

      if (!formData.category) {
        alert(
          "Please select a category"
        );
        return;
      }

      if (!formData.excerpt.trim()) {
        alert(
          "Please enter an excerpt"
        );
        return;
      }

      const editorContent =
        editorRef.current
          ? editorRef.current.getContent()
          : formData.content;

      if (
        !editorContent ||
        editorContent.trim() === "" ||
        editorContent ===
          "<p><br></p>"
      ) {
        alert(
          "Please enter blog content"
        );
        return;
      }

      // =========================
      // FORM DATA
      // =========================

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "tags",
        formData.tags || ""
      );

      data.append(
        "excerpt",
        formData.excerpt.trim()
      );

      data.append(
        "content",
        editorContent
      );

      data.append(
        "status",
        statusType
      );

      data.append(
        "featured",
        String(formData.featured)
      );

      if (formData.publishDate) {
        data.append(
          "publishDate",
          formData.publishDate
        );
      }

      data.append(
        "metaTitle",
        formData.metaTitle || ""
      );

      data.append(
        "metaDescription",
        formData.metaDescription || ""
      );

      data.append(
        "metaKeywords",
        formData.metaKeywords || ""
      );

      // =========================
      // FEATURED IMAGE
      // =========================

      if (formData.featuredImage) {
        data.append(
          "featuredImage",
          formData.featuredImage
        );
      }

      // =========================
      // THUMBNAIL IMAGE
      // =========================

      if (formData.thumbnailImage) {
        data.append(
          "thumbnailImage",
          formData.thumbnailImage
        );
      }

      // =========================
      // DEBUG
      // =========================

      console.log(
        "========== BLOG FORM DATA =========="
      );

      for (const pair of data.entries()) {
        console.log(
          pair[0],
          pair[1]
        );
      }

      // =========================
      // CREATE / UPDATE
      // =========================

      let response;

      if (editingId) {
        response =
          await API.put(
            `/blog/${editingId}`,
            data
          );
      } else {
        response =
          await API.post(
            "/blog",
            data
          );
      }

      console.log(
        "BLOG SAVE RESPONSE:",
        response.data
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "Blog save failed"
        );
      }

      // =========================
      // SUCCESS
      // =========================

      alert(
        editingId
          ? "Blog updated successfully"
          : statusType === "Draft"
          ? "Blog saved as draft successfully"
          : "Blog published successfully"
      );

      // =========================
      // RESET
      // =========================

      handleReset();

      // =========================
      // REFRESH LIST
      // =========================

      await fetchBlogs();
    } catch (error) {
      console.error(
        "BLOG SAVE ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while saving the blog"
      );
    }
  };

  // =========================================================
  // DELETE BLOG
  // =========================================================

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this blog?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await API.delete(
          `/blog/${id}`
        );

      console.log(
        "DELETE RESPONSE:",
        response.data
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "Delete failed"
        );
      }

      alert(
        "Blog deleted successfully"
      );

      if (
        editingId === id
      ) {
        handleReset();
      }

      await fetchBlogs();
    } catch (error) {
      console.error(
        "DELETE BLOG ERROR:",
        error
      );

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
  // FILTER TOGGLE
  // =========================================================

  const handleToggleFilter = () => {
    setShowFilterOptions(
      !showFilterOptions
    );
  };

  // =========================================================
  // FILTER BLOGS
  // =========================================================
=======
    const editorContent = editorRef.current ? editorRef.current.getContent() : formData.content;

    const payload = new FormData();
    payload.append('title', formData.title.trim());
    payload.append('category', formData.category);
    payload.append('tags', formData.tags || '');
    payload.append('excerpt', formData.excerpt.trim());
    payload.append('content', editorContent);
    payload.append('status', statusType);
    payload.append('featured', formData.featured);
    payload.append('publishDate', formData.publishDate);
    payload.append('metaTitle', formData.metaTitle || '');
    payload.append('metaDescription', formData.metaDescription || '');
    payload.append('metaKeywords', formData.metaKeywords || '');

    if (formData.featuredImage instanceof File) {
      payload.append('featuredImage', formData.featuredImage);
    }
    if (formData.thumbnailImage instanceof File) {
      payload.append('thumbnailImage', formData.thumbnailImage);
    }

    try {
      setSubmitting(true);
      if (editingId) {
        const res = await API.put(`/blogs/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data?.success) {
          setBlogs((prev) =>
            prev.map((b) => ((b._id || b.id) === editingId ? res.data.data : b))
          );
          alert('Blog post updated successfully!');
        }
      } else {
        const res = await API.post('/blogs', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data?.success) {
          setBlogs((prev) => [res.data.data, ...prev]);
          alert('Blog post published successfully!');
        }
      }
      handleReset();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert(error.response?.data?.message || 'Error occurred while saving blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await API.delete(`/blogs/${id}`);
      if (res.data?.success) {
        setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== id));
        if (editingId === id) {
          handleReset();
        }
        alert('Blog post deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert(error.response?.data?.message || 'Failed to delete blog post.');
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt || blog.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || blog.category === filterCategory;
    const matchesStatus = filterStatus === 'All Status' || blog.status === filterStatus;
    const matchesFeatured =
      filterFeatured === 'All' ||
      (filterFeatured === 'Yes' && blog.featured) ||
      (filterFeatured === 'No' && !blog.featured);
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a

  const filteredBlogs =
    blogs.filter((blog) => {
      const title =
        blog.title || "";

      const category =
        blog.category || "";

      const status =
        blog.status || "";

      const matchesSearch =
        title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      const matchesCategory =
        filterCategory ===
          "All Categories" ||
        category ===
          filterCategory;

      const matchesStatus =
        filterStatus ===
          "All Status" ||
        status ===
          filterStatus;

      const matchesFeatured =
        filterFeatured ===
          "All" ||
        (filterFeatured ===
          "Yes" &&
          blog.featured) ||
        (filterFeatured ===
          "No" &&
          !blog.featured);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFeatured
      );
    });

  // =========================================================
  // DATE FORMAT
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
  // RENDER
  // =========================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterStatus, filterFeatured]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
<<<<<<< HEAD
    <>
      <div className="BlogPost-container">

        {/* LEFT COLUMN: FORM */}

        <div className="BlogPost-column BlogPost-formColumn">

          <div className="BlogPost-card">

=======
    <div className="BlogPost-container">
      {/* FORM COLUMN */}
      <div className="BlogPost-column BlogPost-formColumn">
        <div className="BlogPost-card BlogPost-scrollableForm">
          <div className="BlogPost-header">
            <div className="BlogPost-headerBadge">
              <FaEdit className="BlogPost-headerIcon" />
            </div>
            <h2>{editingId ? 'Edit Blog Post' : 'Add / Edit Blog Post'}</h2>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="BlogPost-form">
            <div className="BlogPost-field">
              <div className="BlogPost-labelRow">
                <label>
                  Blog Title <span className="BlogPost-required">*</span>
                </label>
                <span className="BlogPost-charCount">{formData.title.length}/100</span>
              </div>
              <input
                type="text"
                placeholder="e.g. The Healing Power of Nature"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="BlogPost-grid2">
              <div className="BlogPost-field">
                <label>
                  Category <span className="BlogPost-required">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Nature">Nature</option>
                  <option value="Honey">Honey</option>
                  <option value="Health">Health</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Recipes">Recipes</option>
                </select>
              </div>
              <div className="BlogPost-field">
                <label>Tags</label>
                <input
                  type="text"
                  placeholder="e.g. Nature, Healing"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>

            {/* FEATURED & THUMBNAIL UPLOAD FIELDS */}
            <div className="BlogPost-grid2">
              <div className="BlogPost-field">
                <label>Featured Image</label>
                <div
                  className="BlogPost-uploadBox"
                  onClick={() => featuredInputRef.current && featuredInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={featuredInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'featured')}
                  />
                  {formData.featuredImagePreview ? (
                    <img
                      src={formData.featuredImagePreview}
                      alt="Featured Preview"
                      className="BlogPost-imgPreview"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="BlogPost-uploadIcon" />
                      <span>Upload Featured</span>
                      <small>Max 5MB</small>
                    </>
                  )}
                </div>
              </div>

              <div className="BlogPost-field">
                <label>Thumbnail Image</label>
                <div
                  className="BlogPost-uploadBox"
                  onClick={() => thumbnailInputRef.current && thumbnailInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'thumbnail')}
                  />
                  {formData.thumbnailPreview ? (
                    <img
                      src={formData.thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="BlogPost-imgPreview"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="BlogPost-uploadIcon" />
                      <span>Upload Thumbnail</span>
                      <small>Max 5MB</small>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="BlogPost-field">
              <div className="BlogPost-labelRow">
                <label>
                  Excerpt / Short Description <span className="BlogPost-required">*</span>
                </label>
                <span className="BlogPost-charCount">{formData.excerpt.length}/160</span>
              </div>
              <textarea
                rows="2"
                maxLength="160"
                placeholder="Write a short description..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              ></textarea>
            </div>

            <div className="BlogPost-field">
              <label>
                Content / Description <span className="BlogPost-required">*</span>
              </label>
              <div className="BlogPost-tinymceWrapper">
                <Editor
                  apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Write full blog content here...</p>"
                  init={{
                    height: 180,
                    menubar: false,
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'code'],
                    toolbar: 'undo redo | blocks | bold italic | bullist numlist | link image code',
                    content_style:
                      'body { font-family:Inter,sans-serif; font-size:13px; color:#e2f1e8; background-color:#09130d; }'
                  }}
                />
              </div>
            </div>

            <div className="BlogPost-grid3">
              <div className="BlogPost-field">
                <label>Status</label>
                <div className="BlogPost-toggleGroup">
                  <label className="BlogPost-switch">
                    <input
                      type="checkbox"
                      checked={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    />
                    <span className="BlogPost-slider"></span>
                  </label>
                  <span className="BlogPost-toggleText">{formData.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <div className="BlogPost-field">
                <label>Featured</label>
                <div className="BlogPost-toggleGroup">
                  <label className="BlogPost-switch">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span className="BlogPost-slider"></span>
                  </label>
                  <span className="BlogPost-toggleText">{formData.featured ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="BlogPost-field">
                <label>
                  Publish Date <span className="BlogPost-required">*</span>
                </label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                />
              </div>
            </div>

            <div className="BlogPost-field">
              <label>Meta Title (SEO)</label>
              <input
                type="text"
                placeholder="Enter meta title"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              />
            </div>

            <div className="BlogPost-grid2">
              <div className="BlogPost-field">
                <label>Meta Description (SEO)</label>
                <input
                  type="text"
                  placeholder="Enter meta description"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                />
              </div>
              <div className="BlogPost-field">
                <label>Meta Keywords (SEO)</label>
                <input
                  type="text"
                  placeholder="Enter meta keywords"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                />
              </div>
            </div>

            <div className="BlogPost-actions">
              <button
                type="button"
                className="BlogPost-btn BlogPost-btnPrimary"
                disabled={submitting}
                onClick={() => handlePublish('Published')}
              >
                <FaPaperPlane /> {submitting ? 'Saving...' : editingId ? 'Update' : 'Publish'}
              </button>
              <button
                type="button"
                className="BlogPost-btn BlogPost-btnOutline"
                disabled={submitting}
                onClick={() => handlePublish('Draft')}
              >
                <FaSave /> Save Draft
              </button>
              <button
                type="button"
                className="BlogPost-btn BlogPost-btnReset"
                onClick={handleReset}
              >
                <FaRedo /> Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TABLE COLUMN */}
      <div className="BlogPost-column BlogPost-listColumn">
        <div className="BlogPost-card BlogPost-listCard">
          <div className="BlogPost-listHeader">
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
            <div className="BlogPost-header">

              <div className="BlogPost-headerBadge">
                <FaEdit className="BlogPost-headerIcon" />
              </div>

              <h2>
                {editingId
                  ? "Edit Blog Post"
                  : "Add / Edit Blog Post"}
              </h2>

            </div>

            <form
              onSubmit={(e) =>
                e.preventDefault()
              }
              className="BlogPost-form"
            >

              {/* TITLE */}

              <div className="BlogPost-field">

                <div className="BlogPost-labelRow">

                  <label>
                    Blog Title{" "}
                    <span className="BlogPost-required">
                      *
                    </span>
                  </label>

                  <span className="BlogPost-charCount">
                    {formData.title.length}/100
                  </span>

                </div>

                <input
                  type="text"
                  placeholder="e.g. The Healing Power of Nature"
                  value={formData.title}
                  onChange={handleTitleChange}
                />

              </div>
<<<<<<< HEAD

              {/* CATEGORY + TAGS */}

              <div className="BlogPost-grid2">

                <div className="BlogPost-field">

                  <label>
                    Category{" "}
                    <span className="BlogPost-required">
                      *
                    </span>
                  </label>

                  <select
                    value={
                      formData.category
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category:
                          e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select Category
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

                </div>

                <div className="BlogPost-field">

                  <label>
                    Tags
                  </label>

                  <input
                    type="text"
                    placeholder="Enter tags"
                    value={
                      formData.tags
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* IMAGES */}

              <div className="BlogPost-grid2">

                {/* FEATURED IMAGE */}

                <div className="BlogPost-field">

                  <label>
                    Featured Image{" "}
                    <span className="BlogPost-required">
                      *
                    </span>
                  </label>

                  <div
                    className="BlogPost-uploadBox"
                    onClick={() =>
                      featuredInputRef.current?.click()
                    }
                  >

                    <input
                      type="file"
                      ref={
                        featuredInputRef
                      }
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(
                          e,
                          "featured"
                        )
                      }
                    />

                    {formData.featuredImagePreview ? (
                      <img
                        src={
                          formData.featuredImagePreview
                        }
                        alt="Preview"
                        className="BlogPost-imgPreview"
                      />
                    ) : (
                      <>
                        <FaCloudUploadAlt className="BlogPost-uploadIcon" />

                        <span>
                          Upload Image
                        </span>

                        <small>
                          Max 2MB
                        </small>
                      </>
                    )}

                  </div>

                </div>

                {/* THUMBNAIL */}

                <div className="BlogPost-field">

                  <label>
                    Thumbnail Image
                  </label>

                  <div
                    className="BlogPost-uploadBox"
                    onClick={() =>
                      thumbnailInputRef.current?.click()
                    }
                  >

                    <input
                      type="file"
                      ref={
                        thumbnailInputRef
                      }
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(
                          e,
                          "thumbnail"
                        )
                      }
                    />

                    {formData.thumbnailPreview ? (
                      <img
                        src={
                          formData.thumbnailPreview
                        }
                        alt="Preview"
                        className="BlogPost-imgPreview"
                      />
                    ) : (
                      <>
                        <FaCloudUploadAlt className="BlogPost-uploadIcon" />

                        <span>
                          Upload Thumbnail
                        </span>

                        <small>
                          Max 2MB
                        </small>
                      </>
                    )}

                  </div>

                </div>

              </div>

              {/* EXCERPT */}

              <div className="BlogPost-field">

                <div className="BlogPost-labelRow">

                  <label>
                    Excerpt / Short Description{" "}
                    <span className="BlogPost-required">
                      *
                    </span>
                  </label>

                  <span className="BlogPost-charCount">
                    {formData.excerpt.length}/160
                  </span>

                </div>

                <textarea
                  rows="2"
                  maxLength="160"
                  placeholder="Write a short description..."
                  value={
                    formData.excerpt
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excerpt:
                        e.target.value,
                    })
                  }
                />

              </div>

              {/* TINYMCE */}

              <div className="BlogPost-field">

                <label>
                  Content / Description{" "}
                  <span className="BlogPost-required">
                    *
                  </span>
                </label>

                <div className="BlogPost-tinymceWrapper">

                  <Editor
                    apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"

                    onInit={(
                      evt,
                      editor
                    ) => {
                      editorRef.current =
                        editor;
                    }}

                    initialValue="<p>Write full blog content here...</p>"

                    init={{
                      height: 180,
                      menubar: false,
                      skin: "oxide-dark",
                      content_css:
                        "dark",

                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "code",
                      ],

                      toolbar:
                        "undo redo | blocks | bold italic | bullist numlist | link image code",

                      content_style:
                        "body { font-family:Inter,sans-serif; font-size:13px; color:#e2f1e8; background-color:#09130d; }",
                    }}
                  />

                </div>

              </div>

              {/* STATUS / FEATURED / DATE */}

              <div className="BlogPost-grid3">

                {/* STATUS */}

                <div className="BlogPost-field">

                  <label>
                    Status
                  </label>

                  <div className="BlogPost-toggleGroup">

                    <label className="BlogPost-switch">

                      <input
                        type="checkbox"
                        checked={
                          formData.status
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status:
                              e.target.checked,
                          })
                        }
                      />

                      <span className="BlogPost-slider"></span>

                    </label>

                    <span className="BlogPost-toggleText">
                      {formData.status
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                </div>

                {/* FEATURED */}

                <div className="BlogPost-field">

                  <label>
                    Featured
                  </label>

                  <div className="BlogPost-toggleGroup">

                    <label className="BlogPost-switch">

                      <input
                        type="checkbox"
                        checked={
                          formData.featured
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featured:
                              e.target.checked,
                          })
                        }
                      />

                      <span className="BlogPost-slider"></span>

                    </label>

                    <span className="BlogPost-toggleText">
                      {formData.featured
                        ? "Yes"
                        : "No"}
                    </span>

                  </div>

                </div>

                {/* DATE */}

                <div className="BlogPost-field">

                  <label>
                    Publish Date{" "}
                    <span className="BlogPost-required">
                      *
                    </span>
                  </label>

                  <input
                    type="date"
                    value={
                      formData.publishDate
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        publishDate:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* META TITLE */}

              <div className="BlogPost-field">

                <label>
                  Meta Title (SEO)
                </label>

                <input
                  type="text"
                  placeholder="Enter meta title"
                  value={
                    formData.metaTitle
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaTitle:
                        e.target.value,
                    })
                  }
                />

              </div>

              {/* META */}

              <div className="BlogPost-grid2">

                <div className="BlogPost-field">

                  <label>
                    Meta Description (SEO)
                  </label>

                  <input
                    type="text"
                    placeholder="Enter meta description"
                    value={
                      formData.metaDescription
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="BlogPost-field">

                  <label>
                    Meta Keywords (SEO)
                  </label>

                  <input
                    type="text"
                    placeholder="Enter meta keywords"
                    value={
                      formData.metaKeywords
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaKeywords:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* BUTTONS */}

              <div className="BlogPost-actions">

                <button
                  type="button"
                  className="BlogPost-btn BlogPost-btnPrimary"
                  onClick={() =>
                    handlePublish(
                      "Published"
                    )
                  }
                  disabled={loading}
                >
                  <FaPaperPlane />

                  {editingId
                    ? "Update"
                    : "Publish"}
                </button>

                <button
                  type="button"
                  className="BlogPost-btn BlogPost-btnOutline"
                  onClick={() =>
                    handlePublish(
                      "Draft"
                    )
                  }
                  disabled={loading}
                >
                  <FaSave />

                  Save Draft
                </button>

                <button
                  type="button"
                  className="BlogPost-btn BlogPost-btnReset"
                  onClick={
                    handleReset
                  }
                >
                  <FaRedo />

                  Reset
                </button>

              </div>

            </form>

=======
              <button
                className={`BlogPost-btnFilter ${showFilterOptions ? 'active' : ''}`}
                onClick={() => setShowFilterOptions(!showFilterOptions)}
                type="button"
              >
                <FaFilter />
              </button>
            </div>
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT COLUMN */}
        {/* ================================================= */}

        <div className="BlogPost-column BlogPost-listColumn">

          <div className="BlogPost-card">

            <div className="BlogPost-listHeader">

              <div className="BlogPost-header">

                <div className="BlogPost-headerBadge">
                  <FaEdit className="BlogPost-headerIcon" />
                </div>

                <h2>
                  Blog Posts List
                </h2>

              </div>

              <div className="BlogPost-searchFilter">

                <div className="BlogPost-searchBox">

                  <input
                    type="text"
                    placeholder="Search..."
                    value={
                      searchQuery
                    }
                    onChange={(e) =>
                      setSearchQuery(
                        e.target.value
                      )
                    }
                  />

                  <FaSearch className="BlogPost-searchIcon" />

                </div>

                <button
                  className={`BlogPost-btnFilter ${
                    showFilterOptions
                      ? "active"
                      : ""
                  }`}
                  onClick={
                    handleToggleFilter
                  }
                >
                  <FaFilter />
                </button>

              </div>

            </div>

<<<<<<< HEAD
            {/* FILTERS */}

            {showFilterOptions && (
              <div className="BlogPost-filterRow">

                <div className="BlogPost-filterGroup">

                  <label>
                    Category
                  </label>

                  <select
                    value={
                      filterCategory
                    }
                    onChange={(e) =>
                      setFilterCategory(
                        e.target.value
                      )
                    }
                  >
                    <option value="All Categories">
                      All
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

                </div>

                <div className="BlogPost-filterGroup">

                  <label>
                    Status
                  </label>

                  <select
                    value={
                      filterStatus
                    }
                    onChange={(e) =>
                      setFilterStatus(
                        e.target.value
                      )
                    }
                  >
                    <option value="All Status">
                      All
                    </option>

                    <option value="Published">
                      Published
                    </option>

                    <option value="Draft">
                      Draft
                    </option>
                  </select>

                </div>

                <div className="BlogPost-filterGroup">

                  <label>
                    Featured
                  </label>

                  <select
                    value={
                      filterFeatured
                    }
                    onChange={(e) =>
                      setFilterFeatured(
                        e.target.value
                      )
                    }
                  >
                    <option value="All">
                      All
                    </option>

                    <option value="Yes">
                      Yes
                    </option>

                    <option value="No">
                      No
                    </option>
                  </select>

                </div>

              </div>
            )}

            {/* TABLE */}

            <div className="BlogPost-tableWrapper BlogPost-horizontalScroll">

              <table className="BlogPost-table">

                <thead>

                  <tr>

                    <th style={{ width: "30px" }}>
                      #
                    </th>

                    <th style={{ width: "50px" }}>
                      Image
                    </th>

                    <th style={{ minWidth: "220px" }}>
                      Title & Details
                    </th>

                    <th style={{ minWidth: "90px" }}>
                      Category
                    </th>

                    <th style={{ minWidth: "110px" }}>
                      Date
                    </th>

                    <th style={{ minWidth: "80px" }}>
                      Status
                    </th>

                    <th style={{ minWidth: "60px" }}>
                      Featured
                    </th>

                    <th style={{ minWidth: "80px" }}>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading &&
                  blogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        style={{
                          textAlign:
                            "center",
                          padding:
                            "24px",
                        }}
                      >
                        Loading blogs...
                      </td>
                    </tr>
                  ) : filteredBlogs.length >
                    0 ? (
                    filteredBlogs.map(
                      (
                        blog,
                        index
                      ) => (
                        <tr
                          key={
                            blog._id ||
                            blog.id
                          }
                          className={
                            editingId ===
                            (blog._id ||
                              blog.id)
                              ? "editingRow"
                              : ""
                          }
                        >

                          <td>
                            {index + 1}
                          </td>

                          <td>

                            <img
                              src={getImageUrl(
                                blog.featuredImage ||
                                  blog.image
                              )}
                              alt={
                                blog.title
                              }
                              className="BlogPost-tableImg"
                            />

                          </td>

                          <td className="BlogPost-titleCell">

                            <div className="BlogPost-titleBlock">

                              <strong className="BlogPost-fullTitle">
                                {
                                  blog.title
                                }
                              </strong>

                              <p className="BlogPost-fullSubtitle">
                                {
                                  blog.excerpt
                                }
                              </p>

                            </div>

                          </td>

                          <td>

                            <span
                              className={`BlogPost-tag BlogPost-tag-${(
                                blog.category ||
                                "general"
                              ).toLowerCase()}`}
                            >
                              {
                                blog.category
                              }
                            </span>

                          </td>

                          <td className="BlogPost-dateCell">

                            <div>
                              <FaCalendarAlt />

                              {" "}

                              {formatDate(
                                blog.publishDate ||
                                  blog.createdAt
                              )}
                            </div>

                            <small>
                              <FaClock />

                              {" "}

                              {blog.readTime ||
                                "4 min read"}
                            </small>

                          </td>

                          <td>

                            <span
                              className={`BlogPost-badge BlogPost-badge-${(
                                blog.status ||
                                "Draft"
                              ).toLowerCase()}`}
                            >
                              {
                                blog.status
                              }
                            </span>

                          </td>

                          <td>

                            {blog.featured ? (
                              <span className="BlogPost-featuredIcon active">
                                <FaCheck />
                              </span>
                            ) : (
                              <span className="BlogPost-featuredIcon">
                                —
                              </span>
                            )}

                          </td>

                          <td>

                            <div className="BlogPost-tableActions">

                              <button
                                className="BlogPost-actionBtn BlogPost-editBtn"
                                title="Edit"
                                onClick={() =>
                                  handleEdit(
                                    blog
                                  )
                                }
                              >
                                <FaEdit />
                              </button>

                              <button
                                className="BlogPost-actionBtn BlogPost-deleteBtn"
                                title="Delete"
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

                          </td>

                        </tr>
                      )
                    )
                  ) : (
                    <tr>

                      <td
                        colSpan="8"
                        style={{
                          textAlign:
                            "center",
                          padding:
                            "24px",
                        }}
                      >
                        No blog posts found.
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            <div className="BlogPost-pagination">

              <span>
                Showing 1 to{" "}
                {filteredBlogs.length}{" "}
                of {blogs.length}
              </span>

              <div className="BlogPost-pageButtons">

                <button
                  className="BlogPost-pageBtn"
                  disabled
                >
                  Prev
                </button>

                <button className="BlogPost-pageBtn active">
                  1
                </button>

                <button className="BlogPost-pageBtn">
                  2
                </button>

                <button className="BlogPost-pageBtn">
                  Next
                </button>

              </div>

            </div>

          </div>

=======
          <div className="BlogPost-tableWrapper BlogPost-horizontalScroll">
            <table className="BlogPost-table">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th style={{ width: '50px' }}>Image</th>
                  <th style={{ minWidth: '220px' }}>Title & Details</th>
                  <th style={{ minWidth: '90px' }}>Category</th>
                  <th style={{ minWidth: '110px' }}>Date</th>
                  <th style={{ minWidth: '80px' }}>Status</th>
                  <th style={{ minWidth: '60px' }}>Featured</th>
                  <th style={{ minWidth: '80px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                      Loading blogs...
                    </td>
                  </tr>
                ) : paginatedBlogs.length > 0 ? (
                  paginatedBlogs.map((blog, index) => {
                    const blogId = blog._id || blog.id;
                    const blogImageSrc = getImageUrl(blog.thumbnailImage || blog.featuredImage || blog.image);

                    return (
                      <tr key={blogId} className={editingId === blogId ? 'editingRow' : ''}>
                        <td>{startIndex + index + 1}</td>
                        <td>
                          <img
                            src={blogImageSrc}
                            alt={blog.title}
                            className="BlogPost-tableImg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = FALLBACK_IMAGE;
                            }}
                          />
                        </td>
                        <td className="BlogPost-titleCell">
                          <div className="BlogPost-titleBlock">
                            <strong className="BlogPost-fullTitle">{blog.title}</strong>
                            <p className="BlogPost-fullSubtitle">{blog.excerpt || blog.description}</p>
                          </div>
                        </td>
                        <td>
                          <span className={`BlogPost-tag BlogPost-tag-${(blog.category || 'default').toLowerCase()}`}>
                            {blog.category}
                          </span>
                        </td>
                        <td className="BlogPost-dateCell">
                          <div>
                            <FaCalendarAlt />{' '}
                            {blog.publishDate
                              ? new Date(blog.publishDate).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : 'N/A'}
                          </div>
                          <small>
                            <FaClock /> {blog.readTime || '5 min read'}
                          </small>
                        </td>
                        <td>
                          <span className={`BlogPost-badge BlogPost-badge-${(blog.status || 'published').toLowerCase()}`}>
                            {blog.status}
                          </span>
                        </td>
                        <td>
                          {blog.featured ? (
                            <span className="BlogPost-featuredIcon active">
                              <FaCheck />
                            </span>
                          ) : (
                            <span className="BlogPost-featuredIcon">—</span>
                          )}
                        </td>
                        <td>
                          <div className="BlogPost-tableActions">
                            <button
                              type="button"
                              className="BlogPost-actionBtn BlogPost-editBtn"
                              title="Edit"
                              onClick={() => handleEdit(blog)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="BlogPost-actionBtn BlogPost-deleteBtn"
                              title="Delete"
                              onClick={() => handleDelete(blogId)}
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
                    <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                      No blog posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="BlogPost-pagination">
            <span>
              Showing {filteredBlogs.length === 0 ? 0 : startIndex + 1} to{' '}
              {Math.min(startIndex + itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} entries
            </span>
            <div className="BlogPost-pageButtons">
              <button
                type="button"
                className="BlogPost-pageBtn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`BlogPost-pageBtn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
              <button
                type="button"
                className="BlogPost-pageBtn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
>>>>>>> e014362e72e0b04ac19a552f5ca84e3a8be1e50a
        </div>

      </div>
    </>
  );
};

export default BlogPost;