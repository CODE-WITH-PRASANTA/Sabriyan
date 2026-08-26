import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Editor } from "@tinymce/tinymce-react";

import API, { IMG_URL } from "../../api/axios";

import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaEdit,
  FaEye,
  FaFilter,
  FaPaperPlane,
  FaRedo,
  FaSave,
  FaSearch,
  FaTags,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import "./BlogPost.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop";

const DEFAULT_FORM_DATA = {
  title: "",
  category: "Nature",
  excerpt: "",
  content: "",
  author: "Admin User",
  readTime: "4 min read",
  status: "Draft",
  featured: false,
  tags: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  publishDate: new Date().toISOString().split("T")[0],
};

const BlogPost = ({ editData = null, onBack }) => {
  // =========================================================
  // FORM STATE
  // =========================================================
  const [formData, setFormData] = useState({
    ...DEFAULT_FORM_DATA,
  });

  // =========================================================
  // IMAGE STATE
  // =========================================================
  const [featuredImageFile, setFeaturedImageFile] =
    useState(null);

  const [thumbnailImageFile, setThumbnailImageFile] =
    useState(null);

  const [featuredImagePreview, setFeaturedImagePreview] =
    useState("");

  const [thumbnailImagePreview, setThumbnailImagePreview] =
    useState("");

  // =========================================================
  // UI STATE
  // =========================================================
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // =========================================================
  // FILTER STATE
  // =========================================================
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] =
    useState("All Categories");
  const [filterStatus, setFilterStatus] =
    useState("All Status");
  const [filterFeatured, setFilterFeatured] =
    useState("All");
  const [showFilterOptions, setShowFilterOptions] =
    useState(false);

  // =========================================================
  // PAGINATION
  // =========================================================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // =========================================================
  // REFS
  // =========================================================
  const featuredInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const editorRef = useRef(null);

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================
  const getImageUrl = useCallback((image) => {
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

    const baseUrl =
      IMG_URL || "http://localhost:5000";

    const cleanPath = image.startsWith("/")
      ? image
      : `/${image}`;

    return `${baseUrl}${cleanPath}`;
  }, []);

  // =========================================================
  // RESET FORM
  // =========================================================
  const resetForm = useCallback(() => {
    setFormData({
      ...DEFAULT_FORM_DATA,
      publishDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setFeaturedImageFile(null);
    setThumbnailImageFile(null);

    setFeaturedImagePreview("");
    setThumbnailImagePreview("");

    setMessage({
      type: "",
      text: "",
    });

    if (featuredInputRef.current) {
      featuredInputRef.current.value = "";
    }

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }

    if (editorRef.current) {
      editorRef.current.setContent("");
    }
  }, []);

  // =========================================================
  // POPULATE EDIT DATA
  // =========================================================
  useEffect(() => {
    if (!editData) {
      resetForm();
      return;
    }

    const featuredImage =
      editData.featuredImage ||
      editData.image ||
      editData.thumbnailImage ||
      "";

    const thumbnailImage =
      editData.thumbnailImage ||
      editData.featuredImage ||
      editData.image ||
      "";

    setFormData({
      title: editData.title || "",
      category: editData.category || "Nature",
      excerpt:
        editData.excerpt ||
        editData.description ||
        "",
      content: editData.content || "",
      author:
        editData.author || "Admin User",
      readTime:
        editData.readTime || "4 min read",
      status:
        editData.status || "Draft",
      featured: Boolean(editData.featured),
      tags: Array.isArray(editData.tags)
        ? editData.tags.join(", ")
        : editData.tags || "",
      metaTitle:
        editData.metaTitle || "",
      metaDescription:
        editData.metaDescription || "",
      metaKeywords:
        editData.metaKeywords || "",
      publishDate: editData.publishDate
        ? new Date(editData.publishDate)
            .toISOString()
            .split("T")[0]
        : new Date()
            .toISOString()
            .split("T")[0],
    });

    setFeaturedImageFile(null);
    setThumbnailImageFile(null);

    setFeaturedImagePreview(
      featuredImage
        ? getImageUrl(featuredImage)
        : ""
    );

    setThumbnailImagePreview(
      thumbnailImage
        ? getImageUrl(thumbnailImage)
        : ""
    );

    setMessage({
      type: "",
      text: "",
    });
  }, [editData, getImageUrl, resetForm]);

  // =========================================================
  // FETCH BLOGS
  // =========================================================
  const fetchBlogs = useCallback(async () => {
    try {
      setListLoading(true);

      const response = await API.get("/blog");

      if (response.data?.success) {
        const apiBlogs =
          response.data.blogs ||
          response.data.data ||
          [];

        setBlogs(apiBlogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error(
        "FETCH BLOGS ERROR:",
        error
      );

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to load blog posts.",
      });
    } finally {
      setListLoading(false);
    }
  }, []);

  // =========================================================
  // LOAD BLOGS
  // =========================================================
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================================
  // TITLE CHANGE
  // =========================================================
  const handleTitleChange = (e) => {
    const value = e.target.value;

    if (value.length <= 100) {
      setFormData((prev) => ({
        ...prev,
        title: value,
      }));
    }
  };

  // =========================================================
  // FEATURED IMAGE
  // =========================================================
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please select a valid image file.",
      });
      return;
    }

    setFeaturedImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setFeaturedImagePreview(previewUrl);
  };

  // =========================================================
  // THUMBNAIL IMAGE
  // =========================================================
  const handleThumbnailImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please select a valid image file.",
      });
      return;
    }

    setThumbnailImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setThumbnailImagePreview(previewUrl);
  };

  // =========================================================
  // REMOVE FEATURED IMAGE
  // =========================================================
  const removeFeaturedImage = () => {
    setFeaturedImageFile(null);
    setFeaturedImagePreview("");

    if (featuredInputRef.current) {
      featuredInputRef.current.value = "";
    }
  };

  // =========================================================
  // REMOVE THUMBNAIL
  // =========================================================
  const removeThumbnailImage = () => {
    setThumbnailImageFile(null);
    setThumbnailImagePreview("");

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  // =========================================================
  // EDIT BLOG
  // =========================================================
  const handleEdit = (blog) => {
    const featuredImage =
      blog.featuredImage ||
      blog.image ||
      blog.thumbnailImage ||
      "";

    const thumbnailImage =
      blog.thumbnailImage ||
      blog.featuredImage ||
      blog.image ||
      "";

    setFormData({
      title: blog.title || "",
      category: blog.category || "Nature",
      excerpt:
        blog.excerpt ||
        blog.description ||
        "",
      content: blog.content || "",
      author:
        blog.author || "Admin User",
      readTime:
        blog.readTime || "4 min read",
      status:
        blog.status || "Draft",
      featured: Boolean(blog.featured),
      tags: Array.isArray(blog.tags)
        ? blog.tags.join(", ")
        : blog.tags || "",
      metaTitle:
        blog.metaTitle || "",
      metaDescription:
        blog.metaDescription || "",
      metaKeywords:
        blog.metaKeywords || "",
      publishDate: blog.publishDate
        ? new Date(blog.publishDate)
            .toISOString()
            .split("T")[0]
        : new Date()
            .toISOString()
            .split("T")[0],
    });

    setFeaturedImageFile(null);
    setThumbnailImageFile(null);

    setFeaturedImagePreview(
      featuredImage
        ? getImageUrl(featuredImage)
        : ""
    );

    setThumbnailImagePreview(
      thumbnailImage
        ? getImageUrl(thumbnailImage)
        : ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE BLOG
  // =========================================================
  const handleDelete = async (blog) => {
    const blogId =
      blog?._id || blog?.id;

    if (!blogId) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setListLoading(true);

      const response = await API.delete(
        `/blog/${blogId}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to delete blog."
        );
      }

      setMessage({
        type: "success",
        text: "Blog deleted successfully.",
      });

      await fetchBlogs();

      setCurrentPage(1);
    } catch (error) {
      console.error(
        "DELETE BLOG ERROR:",
        error
      );

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete blog.",
      });
    } finally {
      setListLoading(false);
    }
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setMessage({
        type: "error",
        text: "Blog title is required.",
      });
      return;
    }

    if (!formData.category) {
      setMessage({
        type: "error",
        text: "Please select a category.",
      });
      return;
    }

    if (!formData.excerpt.trim()) {
      setMessage({
        type: "error",
        text: "Short description is required.",
      });
      return;
    }

    try {
      setLoading(true);

      setMessage({
        type: "",
        text: "",
      });

      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "excerpt",
        formData.excerpt
      );

      data.append(
        "content",
        formData.content
      );

      data.append(
        "author",
        formData.author
      );

      data.append(
        "readTime",
        formData.readTime
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "featured",
        String(formData.featured)
      );

      data.append(
        "tags",
        formData.tags
      );

      data.append(
        "metaTitle",
        formData.metaTitle
      );

      data.append(
        "metaDescription",
        formData.metaDescription
      );

      data.append(
        "metaKeywords",
        formData.metaKeywords
      );

      data.append(
        "publishDate",
        formData.publishDate
      );

      if (featuredImageFile) {
        data.append(
          "featuredImage",
          featuredImageFile
        );
      }

      if (thumbnailImageFile) {
        data.append(
          "thumbnailImage",
          thumbnailImageFile
        );
      }

      let response;

      const blogId =
        editData?._id ||
        editData?.id;

      if (blogId) {
        response = await API.put(
          `/blog/${blogId}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      } else {
        response = await API.post(
          "/blog",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Operation failed."
        );
      }

      setMessage({
        type: "success",
        text: blogId
          ? "Blog post updated successfully!"
          : "Blog post created successfully!",
      });

      await fetchBlogs();

      if (!blogId) {
        resetForm();
      }
    } catch (error) {
      console.error(
        "BLOG SAVE ERROR:",
        error
      );

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save blog post.",
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FILTER BLOGS
  // =========================================================
  const filteredBlogs = blogs.filter(
    (blog) => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      const title =
        blog.title
          ?.toLowerCase() || "";

      const excerpt =
        (
          blog.excerpt ||
          blog.description ||
          ""
        ).toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        excerpt.includes(query);

      const matchesCategory =
        filterCategory ===
          "All Categories" ||
        blog.category ===
          filterCategory;

      const matchesStatus =
        filterStatus ===
          "All Status" ||
        blog.status ===
          filterStatus;

      const matchesFeatured =
        filterFeatured === "All" ||
        (filterFeatured ===
          "Yes" &&
          Boolean(blog.featured)) ||
        (filterFeatured ===
          "No" &&
          !Boolean(blog.featured));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFeatured
      );
    }
  );

  // =========================================================
  // PAGINATION
  // =========================================================
  const totalPages =
    Math.ceil(
      filteredBlogs.length /
        itemsPerPage
    ) || 1;

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedBlogs =
    filteredBlogs.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  // =========================================================
  // PAGE CHANGE
  // =========================================================
  const handlePageChange = (
    newPage
  ) => {
    if (
      newPage >= 1 &&
      newPage <= totalPages
    ) {
      setCurrentPage(newPage);
    }
  };

  // =========================================================
  // SEARCH / FILTER RESET
  // =========================================================
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    filterCategory,
    filterStatus,
    filterFeatured,
  ]);

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="BlogPost dark-forest-theme">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="BlogPost-header">

        <div className="header-left">

          {onBack && (
            <button
              type="button"
              className="back-btn"
              onClick={onBack}
            >
              <FaArrowLeft />
              Back
            </button>
          )}

          <h2>
            {editData
              ? "Edit Blog Post"
              : "Create New Blog Post"}
          </h2>

        </div>

      </div>

      {/* =====================================================
          ALERT MESSAGE
      ====================================================== */}
      {message.text && (
        <div
          className={`alert-box ${message.type}`}
        >
          {message.type ===
            "success" && (
            <FaCheckCircle />
          )}

          <span>
            {message.text}
          </span>
        </div>
      )}

      {/* =====================================================
          MAIN FORM
      ====================================================== */}
      <form
        onSubmit={handleSubmit}
        className="BlogPost-form"
      >

        <div className="form-grid">

          {/* =================================================
              MAIN CONTENT
          ================================================== */}
          <div className="form-main">

            {/* TITLE */}
            <div className="form-group">

              <label htmlFor="title">
                Blog Title *
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={
                  handleTitleChange
                }
                placeholder="Enter blog title..."
                maxLength={100}
                required
              />

              <small>
                {formData.title.length}/100
              </small>

            </div>

            {/* EXCERPT */}
            <div className="form-group">

              <label htmlFor="excerpt">
                Short Description / Excerpt *
              </label>

              <textarea
                id="excerpt"
                name="excerpt"
                rows="4"
                maxLength={160}
                value={
                  formData.excerpt
                }
                onChange={handleChange}
                placeholder="Brief summary of the blog post..."
                required
              />

              <small>
                {formData.excerpt.length}/160
              </small>

            </div>

            {/* CONTENT */}
            <div className="form-group">

              <label>
                Blog Content *
              </label>

              <div className="BlogPost-tinymceWrapper">

                <Editor
                  apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
                  value={
                    formData.content
                  }
                  onInit={(
                    _evt,
                    editor
                  ) => {
                    editorRef.current =
                      editor;
                  }}
                  onEditorChange={(
                    content
                  ) => {
                    setFormData(
                      (prev) => ({
                        ...prev,
                        content,
                      })
                    );
                  }}
                  init={{
                    height: 350,
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
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks | bold italic underline | " +
                      "bullist numlist | link image table | code",
                    content_style:
                      "body { font-family: Inter, sans-serif; font-size: 14px; color: #e2f1e8; background-color: #09130d; }",
                  }}
                />

              </div>

            </div>

            {/* SEO */}
            <div className="seo-section">

              <h3>
                <FaBookOpen />
                SEO Metadata
              </h3>

              <div className="form-group">

                <label htmlFor="metaTitle">
                  Meta Title
                </label>

                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={
                    formData.metaTitle
                  }
                  onChange={handleChange}
                  placeholder="SEO Title..."
                />

              </div>

              <div className="form-group">

                <label htmlFor="metaDescription">
                  Meta Description
                </label>

                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows="3"
                  value={
                    formData.metaDescription
                  }
                  onChange={handleChange}
                  placeholder="SEO Description..."
                />

              </div>

              <div className="form-group">

                <label htmlFor="metaKeywords">
                  Meta Keywords
                </label>

                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  value={
                    formData.metaKeywords
                  }
                  onChange={handleChange}
                  placeholder="nature, honey, health..."
                />

              </div>

            </div>

          </div>

          {/* =================================================
              SIDEBAR
          ================================================== */}
          <div className="form-sidebar">

            {/* FEATURED IMAGE */}
            <div className="sidebar-card">

              <label className="card-label">
                Featured Image
              </label>

              <div className="image-upload-wrapper">

                {featuredImagePreview ? (

                  <div className="image-preview-box">

                    <img
                      src={
                        featuredImagePreview
                      }
                      alt="Featured preview"
                      onError={(
                        e
                      ) => {
                        e.currentTarget.onerror =
                          null;
                        e.currentTarget.src =
                          FALLBACK_IMAGE;
                      }}
                    />

                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={
                        removeFeaturedImage
                      }
                      aria-label="Remove featured image"
                    >
                      <FaTimes />
                    </button>

                  </div>

                ) : (

                  <label className="upload-dropzone">

                    <FaCloudUploadAlt className="upload-icon" />

                    <span>
                      Click to upload featured image
                    </span>

                    <small>
                      JPG, PNG, WEBP
                    </small>

                    <input
                      type="file"
                      ref={
                        featuredInputRef
                      }
                      accept="image/*"
                      onChange={
                        handleFeaturedImageChange
                      }
                      hidden
                    />

                  </label>

                )}

              </div>

            </div>

            {/* THUMBNAIL */}
            <div className="sidebar-card">

              <label className="card-label">
                Thumbnail Image
              </label>

              <div className="image-upload-wrapper">

                {thumbnailImagePreview ? (

                  <div className="image-preview-box">

                    <img
                      src={
                        thumbnailImagePreview
                      }
                      alt="Thumbnail preview"
                      onError={(
                        e
                      ) => {
                        e.currentTarget.onerror =
                          null;
                        e.currentTarget.src =
                          FALLBACK_IMAGE;
                      }}
                    />

                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={
                        removeThumbnailImage
                      }
                      aria-label="Remove thumbnail"
                    >
                      <FaTimes />
                    </button>

                  </div>

                ) : (

                  <label className="upload-dropzone">

                    <FaCloudUploadAlt className="upload-icon" />

                    <span>
                      Click to upload thumbnail
                    </span>

                    <small>
                      JPG, PNG, WEBP
                    </small>

                    <input
                      type="file"
                      ref={
                        thumbnailInputRef
                      }
                      accept="image/*"
                      onChange={
                        handleThumbnailImageChange
                      }
                      hidden
                    />

                  </label>

                )}

              </div>

            </div>

            {/* CATEGORY */}
            <div className="sidebar-card">

              <div className="form-group">

                <label htmlFor="category">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={
                    handleChange
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

              {/* STATUS */}
              <div className="form-group">

                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Published">
                    Published
                  </option>
                </select>

              </div>

              {/* PUBLISH DATE */}
              <div className="form-group">

                <label htmlFor="publishDate">
                  Publish Date
                </label>

                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={
                    formData.publishDate
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* READ TIME */}
              <div className="form-group">

                <label htmlFor="readTime">
                  Read Time
                </label>

                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={
                    formData.readTime
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g. 4 min read"
                />

              </div>

              {/* TAGS */}
              <div className="form-group">

                <label htmlFor="tags">
                  <FaTags />
                  Tags
                </label>

                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={
                    formData.tags
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="organic, pure, healthy"
                />

              </div>

              {/* FEATURED */}
              <div className="form-group-checkbox">

                <label className="checkbox-container">

                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      formData.featured
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span>
                    Mark as Featured Post
                  </span>

                </label>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="BlogPost-actions">

              <button
                type="submit"
                className="BlogPost-btn BlogPost-btnPrimary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    {editData
                      ? "Update Blog"
                      : "Publish Blog"}
                  </>
                )}
              </button>

              <button
                type="button"
                className="BlogPost-btn BlogPost-btnOutline"
                onClick={() => {
                  setFormData(
                    (prev) => ({
                      ...prev,
                      status: "Draft",
                    })
                  );
                }}
                disabled={loading}
              >
                <FaSave />
                Save Draft
              </button>

              <button
                type="button"
                className="BlogPost-btn BlogPost-btnReset"
                onClick={
                  resetForm
                }
                disabled={loading}
              >
                <FaRedo />
                Reset
              </button>

            </div>

          </div>

        </div>
      </form>

      {/* =====================================================
          BLOG LIST
      ====================================================== */}
      <div className="BlogPost-column BlogPost-listColumn">

        <div className="BlogPost-card BlogPost-listCard">

          {/* LIST HEADER */}
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
                  placeholder="Search blogs..."
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
                type="button"
                className={`BlogPost-btnFilter ${
                  showFilterOptions
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setShowFilterOptions(
                    (prev) =>
                      !prev
                  )
                }
              >
                <FaFilter />
              </button>

            </div>

          </div>

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
                  <th>#</th>
                  <th>Image</th>
                  <th>Title & Details</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {listLoading ? (

                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "30px",
                      }}
                    >
                      Loading blog posts...
                    </td>
                  </tr>

                ) : paginatedBlogs.length >
                  0 ? (

                  paginatedBlogs.map(
                    (
                      blog,
                      index
                    ) => {

                      const blogId =
                        blog._id ||
                        blog.id;

                      const image =
                        blog.thumbnailImage ||
                        blog.featuredImage ||
                        blog.image;

                      return (
                        <tr
                          key={
                            blogId
                          }
                        >

                          {/* NUMBER */}
                          <td>
                            {startIndex +
                              index +
                              1}
                          </td>

                          {/* IMAGE */}
                          <td>

                            <img
                              src={getImageUrl(
                                image
                              )}
                              alt={
                                blog.title
                              }
                              className="BlogPost-tableImg"
                              onError={(
                                e
                              ) => {
                                e.currentTarget.onerror =
                                  null;
                                e.currentTarget.src =
                                  FALLBACK_IMAGE;
                              }}
                            />

                          </td>

                          {/* TITLE */}
                          <td className="BlogPost-titleCell">

                            <div className="BlogPost-titleBlock">

                              <strong className="BlogPost-fullTitle">
                                {
                                  blog.title
                                }
                              </strong>

                              <p className="BlogPost-fullSubtitle">
                                {blog.excerpt ||
                                  blog.description ||
                                  "No description"}
                              </p>

                            </div>

                          </td>

                          {/* CATEGORY */}
                          <td>

                            <span
                              className={`BlogPost-tag BlogPost-tag-${(
                                blog.category ||
                                "default"
                              ).toLowerCase()}`}
                            >
                              {
                                blog.category
                              }
                            </span>

                          </td>

                          {/* DATE */}
                          <td className="BlogPost-dateCell">

                            <div>
                              <FaCalendarAlt />

                              {blog.publishDate
                                ? new Date(
                                    blog.publishDate
                                  ).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "-"}
                            </div>

                            <small>
                              <FaClock />
                              {
                                blog.readTime ||
                                "4 min read"
                              }
                            </small>

                          </td>

                          {/* STATUS */}
                          <td>

                            <span
                              className={`BlogPost-badge BlogPost-badge-${(
                                blog.status ||
                                "Draft"
                              ).toLowerCase()}`}
                            >
                              {
                                blog.status ||
                                "Draft"
                              }
                            </span>

                          </td>

                          {/* FEATURED */}
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

                          {/* ACTIONS */}
                          <td>

                            <div className="BlogPost-tableActions">

                              <button
                                type="button"
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
                                type="button"
                                className="BlogPost-actionBtn BlogPost-deleteBtn"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(
                                    blog
                                  )
                                }
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "30px",
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

              Showing{" "}

              {filteredBlogs.length ===
              0
                ? 0
                : startIndex + 1}

              {" "}to{" "}

              {Math.min(
                startIndex +
                  itemsPerPage,
                filteredBlogs.length
              )}

              {" "}of{" "}

              {
                filteredBlogs.length
              }

              {" "}entries

            </span>

            <div className="BlogPost-pageButtons">

              <button
                type="button"
                className="BlogPost-pageBtn"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
              >
                Prev
              </button>

              {Array.from(
                {
                  length:
                    totalPages,
                },
                (_, i) =>
                  i + 1
              ).map(
                (pageNum) => (
                  <button
                    key={
                      pageNum
                    }
                    type="button"
                    className={`BlogPost-pageBtn ${
                      currentPage ===
                      pageNum
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handlePageChange(
                        pageNum
                      )
                    }
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                type="button"
                className="BlogPost-pageBtn"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BlogPost;