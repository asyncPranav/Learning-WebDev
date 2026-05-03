import express from 'express';
import {
  getAllBookmarks,
  renderAddBookmarkPage,
  addBookmark,
  getBookmarkById,
  renderEditBookmarkPage,
  updateBookmark,
  deleteBookmark
} from '../controllers/bookmark.controller.js';

const router = express.Router();

router.get("/", getAllBookmarks);

router.get("/add", renderAddBookmarkPage);

router.post("/add", addBookmark);

router.get("/view/:id", getBookmarkById);

router.get("/edit/:id", renderEditBookmarkPage);

router.post("/edit/:id", updateBookmark);

router.post("/delete/:id", deleteBookmark);

export default router;