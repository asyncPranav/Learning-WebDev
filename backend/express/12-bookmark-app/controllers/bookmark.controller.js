import Bookmark from "../models/bookmark.model.js";
import mongoose from "mongoose";

// Get all bookmarks
export const getAllBookmarks = async (req, res) => {
  try {
    const selectedCategory = req.query.category || "all";
    const search = req.query.search || "";

    // build filter
    let filter = {};

    // 1. category filter
    if (selectedCategory !== "all") {
      filter.category = selectedCategory;
    }

    // 2. search filter
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i"
      };
    }

    // fetch data
    const bookmarks = await Bookmark.find(filter);

    // send to EJS
    res.render("home", {
      bookmarks,
      selectedCategory,
      searchQuery: search
    });

  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// View a bookmark by id
export const getBookmarkById = async (req, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValid) {
      return res.status(400).render("400", {
        message: "Invalid bookmark id",
      });
    }

    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).render("404", {
        message: "Bookmark not found",
      });
    }

    res.render("view", { bookmark });

  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// Render add bookmark page
export const renderAddBookmarkPage = (req, res) => {
  res.render("add");
};

// Add bookmark
export const addBookmark = async (req, res) => {
  try {
    const { title, url, category } = req.body;

    await Bookmark.create({ title, url, category });

    res.redirect("/");

  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// Render edit bookmark page
export const renderEditBookmarkPage = async (req, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValid) {
      return res.status(400).render("400", {
        message: "Invalid bookmark id",
      });
    }

    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).render("404", {
        message: "Bookmark not found",
      });
    }

    res.render("edit", { bookmark });

  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// Update bookmark
export const updateBookmark = async (req, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValid) {
      return res.status(400).render("400", {
        message: "Invalid bookmark id",
      });
    }

    const { title, url, category } = req.body;

    const updated = await Bookmark.findByIdAndUpdate(
      req.params.id,
      { title, url, category }
    );

    if (!updated) {
      return res.status(404).render("404", {
        message: "Bookmark not found",
      });
    }

    res.redirect("/");

  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};

// Delete bookmark
export const deleteBookmark = async (req, res) => {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValid) {
      return res.status(400).render("400", {
        message: "Invalid bookmark id",
      });
    }

    const deleted = await Bookmark.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).render("404", {
        message: "Bookmark not found",
      });
    }

    res.redirect("/");

  } catch (error) {
    console.log(error);
    res.status(500).render("500", {
      message: "Internal server error",
    });
  }
};