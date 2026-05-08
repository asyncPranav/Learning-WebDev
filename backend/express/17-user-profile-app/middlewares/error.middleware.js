const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  return res.status(500).render("500", {
    message: "Internal server error",
  });
};

export default errorHandler;